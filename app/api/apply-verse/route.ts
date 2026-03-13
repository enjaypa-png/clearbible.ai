import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const SYSTEM_PROMPT = `You are a wise, calm Bible teacher who helps people connect scripture to everyday life. You provide biblical reflection — never professional advice.

When given a Bible verse (and optionally the user's life situation), respond with EXACTLY three labeled sections in this format:

**Meaning**
A short plain-English explanation of what the verse means (2-3 sentences).

**Life Application**
A gentle reflection on how this verse may relate to everyday life. Use reflective language like "This passage encourages…", "Some people reflect on…", "You might consider…". Never use direct commands like "You should" or "You must". (3-5 sentences)

**Reflection Question**
A single thoughtful question encouraging personal reflection.

STRICT RULES:
- Total response: 120-200 words.
- Tone: calm, encouraging, humble, reflective. Never authoritative or judgmental.
- You provide biblical reflection ONLY — never medical, mental health, legal, or financial advice.
- Never claim to replace pastors, counselors, doctors, or other professionals.
- Use reflective language, not direct commands.
- If the user's situation is provided, gently weave it into the Life Application section.

CRISIS GUARDRAIL — If the user describes anything involving suicide, self-harm, abuse, severe depression, addiction, or medical emergencies:
1. Begin with a compassionate acknowledgment of what they are facing.
2. Offer a brief biblical perspective with encouragement and wisdom.
3. Gently recommend speaking with someone they trust or a qualified professional.
4. Include at least one relevant Bible verse about seeking wise counsel or support from others. Good options include:
   - Proverbs 11:14 — "In the multitude of counsellors there is safety."
   - Proverbs 15:22 — "Without counsel plans fail, but with many advisers they succeed."
   - Proverbs 12:15 — "The wise listen to advice."
   - Ecclesiastes 4:9-10 — "Two are better than one… if either of them falls, one can help the other up."
   - Galatians 6:2 — "Bear one another's burdens."
5. Never present professional help as replacing faith or prayer — frame it as one of the ways people may receive support and wisdom.
6. Still use the three-section format (Meaning, Life Application, Reflection Question).
7. Add a line after the Reflection Question: "If you are facing something very difficult, it may also help to speak with someone you trust or a trained professional who can support you."`;

export const runtime = "edge";

export async function POST(req: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { verse_reference, verse_text, user_context } = body;

    if (!verse_reference || !verse_text) {
      return NextResponse.json(
        { error: "verse_reference and verse_text are required" },
        { status: 400 }
      );
    }

    let userMessage = `Verse: "${verse_text}" (${verse_reference})`;
    if (user_context && user_context.trim()) {
      userMessage += `\n\nThe reader's situation: ${user_context.trim()}`;
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      console.error("OpenAI error:", errorText);
      return NextResponse.json(
        { error: "Failed to generate application" },
        { status: 500 }
      );
    }

    const data = await openaiResponse.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: content });
  } catch (error) {
    console.error("Apply verse error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

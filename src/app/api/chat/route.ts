import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const token = process.env.PUTER_AUTH_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.puter.com/drivers/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Origin: "https://puter.com",
        Referer: "https://puter.com/",
      },
      body: JSON.stringify({
        interface: "puter-chat-completion",
        driver: "ai-chat",
        test_mode: false,
        method: "complete",
        args: {
          messages,
          model: "gpt-4o-mini",
          stream: false,
          temperature: 0.6,
        },
        auth_token: token,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Puter API error:", response.status, errorText);
      return NextResponse.json(
        { error: "AI service returned an error" },
        { status: 502 }
      );
    }

    const result = await response.json();

    if (!result.success) {
      console.error("Puter API failure:", result.error);
      return NextResponse.json(
        { error: result.error || "AI request failed" },
        { status: 502 }
      );
    }

    // Extract content from the response
    const innerResult = result.result || {};
    let content = "";

    if (typeof innerResult === "object" && innerResult.message) {
      content = innerResult.message.content || "";
    } else if (result.message) {
      content = result.message.content || "";
    } else {
      content = String(innerResult);
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

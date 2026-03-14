import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Collect all available tokens
    const tokens = [
      process.env.PUTER_AUTH_TOKEN,
      process.env.PUTER_AUTH_TOKEN_1,
      process.env.PUTER_AUTH_TOKEN_2,
      process.env.PUTER_AUTH_TOKEN_3,
    ].filter(Boolean) as string[];

    if (tokens.length === 0) {
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    let lastError = "AI request failed";
    let lastStatus = 502;

    // Loop through tokens until one succeeds
    for (const token of tokens) {
      try {
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
          console.warn("Puter API token failed (HTTP status):", response.status, errorText);
          lastError = "AI service returned an error";
          lastStatus = response.status;
          continue; // Try the next token
        }

        const result = await response.json();

        if (!result.success) {
          console.warn("Puter API token failed (Success=false):", result.error);
          lastError = result.error || "AI request failed";
          continue; // Try the next token
        }

        // Successfully got a response, extract content and return immediately
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

      } catch (fetchError) {
        console.warn("Fetch exception for token:", fetchError);
        lastError = "Failed to connect to AI service";
        continue; // Try the next token
      }
    }

    // If we reach here, ALL tokens failed
    console.error("All AI tokens exhausted and failed.");
    return NextResponse.json(
      { error: lastError },
      { status: lastStatus }
    );

  } catch (error) {
    console.error("Chat API unhandled error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}


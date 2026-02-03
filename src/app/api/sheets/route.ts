import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
    return NextResponse.json(
      { error: "Google Script URL not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.text();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to sync with Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to sync" },
      { status: 500 }
    );
  }
}

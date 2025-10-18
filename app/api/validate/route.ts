import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, solution } = await req.json();

    if (typeof code !== "string" || typeof solution !== "string") {
      return NextResponse.json(
        { message: "❌ Invalid data format" },
        { status: 400 }
      );
    }

    try {
      new Function(code);
    } catch (err) {
      if (err instanceof Error) {
        return NextResponse.json({
          message: `❌ Syntax error: ${err.message}`,
        });
      }
      return NextResponse.json({ message: "❌ Unknown syntax error" });
    }

    const normalize = (str: string) =>
      str.replace(/\s+/g, "").replace(/['"]/g, '"');

    if (normalize(code) === normalize(solution)) {
      return NextResponse.json({ message: "✅ Correct solution!" });
    }

    return NextResponse.json({
      message: "❌ Incorrect solution. Try again.",
    });
  } catch (_err) {
    return NextResponse.json({ message: "❌ Server error" });
  }
}

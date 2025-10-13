import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, solution } = await req.json();

    if (typeof code !== "string" || typeof solution !== "string") {
      return NextResponse.json(
        { message: "❌ Invalid data format" },
        { status: 400 }
      );
    }

    // Simple syntax check
    try {
      new Function(code);
    } catch (err: any) {
      return NextResponse.json({ message: `❌ Syntax error: ${err.message}` });
    }

    // Normalize code: remove spaces/newlines and unify quotes
    const normalize = (str: string) =>
      str.replace(/\s+/g, "").replace(/['"]/g, '"');

    if (normalize(code) === normalize(solution)) {
      return NextResponse.json({ message: "✅ Correct solution!" });
    } else {
      return NextResponse.json({
        message: "❌ Incorrect solution. Try again.",
      });
    }
  } catch (err) {
    return NextResponse.json({ message: "❌ Server error" });
  }
}

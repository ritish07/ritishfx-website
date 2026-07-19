import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  try {
    const body = await request.json();
    const { name, email, strategy } = body;

    if (!name || !email || !strategy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        name,
        email,
        strategy,
      },
    });

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch (error) {
    console.error("Failed to save submission:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

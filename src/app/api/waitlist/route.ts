import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.name || !data.email || !data.country || !data.discordId || !data.capital || !data.propFirm || !data.struggle || !data.hesitation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email: data.email }
    });

    if (existing) {
      return NextResponse.json({ error: "This email is already on the waitlist." }, { status: 400 });
    }

    // Insert to DB
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        country: data.country,
        discordId: data.discordId,
        capital: data.capital,
        propFirm: data.propFirm,
        struggle: data.struggle,
        hesitation: data.hesitation,
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Successfully added to waitlist",
      earlyBirdCode: waitlistEntry.earlyBirdCode 
    });

  } catch (error: any) {
    console.error("Waitlist API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

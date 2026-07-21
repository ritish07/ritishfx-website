import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    if (type === "VISIT") {
      await prisma.analytics.upsert({
        where: { id: "global" },
        update: { visits: { increment: 1 } },
        create: { id: "global", visits: 1, waitlistClicks: 0 },
      });
    } else if (type === "WAITLIST_CLICK") {
      await prisma.analytics.upsert({
        where: { id: "global" },
        update: { waitlistClicks: { increment: 1 } },
        create: { id: "global", visits: 0, waitlistClicks: 1 },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error:", error);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}

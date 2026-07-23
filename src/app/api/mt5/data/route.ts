import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await prisma.mT5ForwardTest.findUnique({
      where: { id: "live_account" }
    });

    const trades = await prisma.mT5Trade.findMany({
      orderBy: { closeTime: "desc" },
      take: 10
    });

    return NextResponse.json({
      stats: stats || {
        balance: 10000,
        equity: 10000,
        profit: 0,
        winRate: 0,
        drawdown: 0,
        equityCurve: "[]"
      },
      trades: trades
    });
  } catch (error: any) {
    console.error("Failed to fetch MT5 data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

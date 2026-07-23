import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simple authentication to ensure only your MT5 terminal can push data
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.MT5_WEBHOOK_SECRET || "default_secret"}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update overall account stats
    if (data.type === "account_update") {
      await prisma.mT5ForwardTest.upsert({
        where: { id: "live_account" },
        update: {
          balance: data.balance,
          equity: data.equity,
          profit: data.profit,
          winRate: data.winRate,
          drawdown: data.drawdown,
          equityCurve: JSON.stringify(data.equityCurve) // Expecting array of { date, value }
        },
        create: {
          id: "live_account",
          balance: data.balance,
          equity: data.equity,
          profit: data.profit,
          winRate: data.winRate,
          drawdown: data.drawdown,
          equityCurve: JSON.stringify(data.equityCurve)
        }
      });
      return NextResponse.json({ success: true, message: "Account updated" });
    }

    // Insert new closed trade
    if (data.type === "trade_closed") {
      await prisma.mT5Trade.upsert({
        where: { id: data.ticket },
        update: {
          profit: data.profit,
          closeTime: new Date(data.closeTime.replace(/\./g, "-"))
        },
        create: {
          id: String(data.ticket),
          pair: data.pair,
          type: data.orderType,
          profit: data.profit,
          openTime: new Date(data.openTime.replace(/\./g, "-")),
          closeTime: new Date(data.closeTime.replace(/\./g, "-")),
          durationMin: data.durationMin,
          requestedPrice: data.requestedPrice,
          openPrice: data.openPrice,
          slippagePts: data.slippagePts,
          spreadPts: data.spreadPts,
          brokerHour: data.brokerHour,
          brokerMinute: data.brokerMinute,
          profitPts: data.profitPts
        }
      });
      return NextResponse.json({ success: true, message: "Trade recorded" });
    }

    return NextResponse.json({ error: "Invalid event type" }, { status: 400 });

  } catch (error: any) {
    console.error("MT5 Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

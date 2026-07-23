import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await prisma.mT5ForwardTest.findUnique({
      where: { id: "live_account" }
    });

    const allTrades = await prisma.mT5Trade.findMany({
      orderBy: { closeTime: "asc" } // chronological order for equity curve
    });

    let totalProfit = 0;
    let winCount = 0;
    let peakProfit = 0;
    let maxDrawdown = 0;
    
    // Calculate initial deposit assuming current balance - total profit
    const currentBalance = stats?.balance || 1000;
    
    for (const trade of allTrades) {
      totalProfit += trade.profit;
    }
    
    const initialDeposit = currentBalance - totalProfit;
    let runningBalance = initialDeposit;
    let equityCurve = [];

    // Reset totalProfit to 0 to calculate running metrics
    totalProfit = 0;
    
    for (const trade of allTrades) {
      if (trade.profit > 0) winCount++;
      totalProfit += trade.profit;
      runningBalance = initialDeposit + totalProfit;
      
      if (runningBalance > peakProfit) peakProfit = runningBalance;
      
      // Drawdown % = (Peak - Current) / Peak * 100
      if (peakProfit > 0) {
        const dd = ((peakProfit - runningBalance) / peakProfit) * 100;
        if (dd > maxDrawdown) maxDrawdown = dd;
      }
      
      // Format date nicely (e.g. "Jul 23")
      const dateStr = trade.closeTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      equityCurve.push({
        date: dateStr,
        value: Number(runningBalance.toFixed(2))
      });
    }

    const winRate = allTrades.length > 0 ? (winCount / allTrades.length) * 100 : 0;

    // Latest 10 trades for the table
    const recentTrades = [...allTrades].sort((a, b) => b.closeTime.getTime() - a.closeTime.getTime()).slice(0, 15);

    return NextResponse.json({
      stats: {
        balance: currentBalance,
        equity: stats?.equity || currentBalance,
        profit: totalProfit,
        winRate: Number(winRate.toFixed(1)),
        drawdown: Number(maxDrawdown.toFixed(2)),
        equityCurve: equityCurve.length > 0 ? equityCurve : [{ date: "Start", value: initialDeposit }]
      },
      trades: recentTrades
    });
  } catch (error: any) {
    console.error("Failed to fetch MT5 data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

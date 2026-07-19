const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'bypass@test.com' } });
  
  if (!user) {
    console.log("User not found! Please log in with the bypass button first so the user is created.");
    return;
  }

  console.log("Seeding strategies for user:", user.email);

  // Strategy 1
  await prisma.strategy.create({
    data: {
      userId: user.id,
      prompt: "Buy when RSI is below 30 and price touches the lower Bollinger Band on the 15m timeframe.",
      status: "COMPLETED",
      sourceCode: `// Mock Source Code\n//@version=5\nstrategy("RSI BB Reversion")\n// ... logic`,
      platform: "TradingView",
      results: {
        create: {
          winRate: 72.4,
          profitFactor: 2.1,
          maxDrawdown: 8.5,
          totalTrades: 156,
          equityCurve: JSON.stringify(Array.from({length: 30}, (_, i) => ({ day: i, value: 5000 + (i * 150) + Math.random() * 500 })))
        }
      }
    }
  });

  // Strategy 2
  await prisma.strategy.create({
    data: {
      userId: user.id,
      prompt: "Breakout strategy: Enter long when price breaks above the Asian session high with strong volume.",
      status: "COMPLETED",
      sourceCode: `// Mock Source Code\n// Breakout Strategy MT5\n// ... logic`,
      platform: "MT5",
      results: {
        create: {
          winRate: 54.2,
          profitFactor: 1.4,
          maxDrawdown: 15.2,
          totalTrades: 432,
          equityCurve: JSON.stringify(Array.from({length: 30}, (_, i) => ({ day: i, value: 10000 + (i * 50) + Math.random() * 800 })))
        }
      }
    }
  });

  // Strategy 3
  await prisma.strategy.create({
    data: {
      userId: user.id,
      prompt: "MACD zero-cross with 200 SMA trend filter.",
      status: "BACKTESTING",
      platform: "TradingView",
    }
  });

  console.log("Sample strategies successfully seeded!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

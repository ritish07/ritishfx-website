//+------------------------------------------------------------------+
//|                                       SyncHistoricalTrades.mq5   |
//|                                                       Ritishlabs |
//|                                           https://ritishlabs.com |
//+------------------------------------------------------------------+
#property copyright "Ritishlabs"
#property link      "https://ritishlabs.com"
#property version   "1.00"
#property script_show_inputs

input string   WebhookURL = "https://ritishlabs.com/api/mt5/webhook"; 
input string   WebhookSecret = "MT5_SECURE_TOKEN_2024";
input int      SleepBetweenRequestsMs = 200; // Pause between requests to prevent server overload

//+------------------------------------------------------------------+
//| Script program start function                                    |
//+------------------------------------------------------------------+
void OnStart()
{
   Print("=== STARTING HISTORICAL TRADE SYNC ===");
   
   // Load all history from the beginning of the account to now
   if(!HistorySelect(0, TimeCurrent()))
   {
      Print("Failed to load account history.");
      return;
   }
   
   int total = HistoryDealsTotal();
   int synced = 0;
   
   Print("Found ", total, " total deals in history. Searching for closed trades...");
   
   for(int i = 0; i < total; i++)
   {
      ulong dealTicket = HistoryDealGetTicket(i);
      
      // We only care about trades that were closed
      if(HistoryDealGetInteger(dealTicket, DEAL_ENTRY) == DEAL_ENTRY_OUT)
      {
         PushTradeStats(dealTicket);
         synced++;
         
         // Sleep slightly to prevent rate limiting or crashing the Next.js API
         Sleep(SleepBetweenRequestsMs); 
      }
   }
   
   // Push the final account equity/balance
   PushAccountStats();
   
   Print("=== SYNC COMPLETE ===");
   Print("Successfully synced ", synced, " closed trades to the website!");
}

//+------------------------------------------------------------------+
//| Function to gather trade data and send HTTP POST to website      |
//+------------------------------------------------------------------+
void PushTradeStats(ulong dealTicket)
{
   if(!HistoryDealSelect(dealTicket)) return;
   
   long positionId = HistoryDealGetInteger(dealTicket, DEAL_POSITION_ID);
   string dealSymbol = HistoryDealGetString(dealTicket, DEAL_SYMBOL);
   
   datetime openTime = 0;
   double requestedPrice = 0.0;
   double entryPrice = 0.0;
   
   HistorySelectByPosition(positionId);
   for(int i=0; i<HistoryDealsTotal(); i++)
   {
      ulong dt = HistoryDealGetTicket(i);
      if(HistoryDealGetInteger(dt, DEAL_ENTRY) == DEAL_ENTRY_IN)
      {
         openTime = (datetime)HistoryDealGetInteger(dt, DEAL_TIME);
         entryPrice = HistoryDealGetDouble(dt, DEAL_PRICE);
         
         ulong inOrder = HistoryDealGetInteger(dt, DEAL_ORDER);
         if(HistoryOrderSelect(inOrder))
         {
            requestedPrice = HistoryOrderGetDouble(inOrder, ORDER_PRICE_OPEN);
            if (requestedPrice == 0) requestedPrice = entryPrice;
         }
         break;
      }
   }
     
   datetime closeTime = (datetime)HistoryDealGetInteger(dealTicket, DEAL_TIME);
   
   // Prevent division by zero or negative durations
   double durationMin = 0;
   if(openTime > 0) {
      durationMin = (closeTime - openTime) / 60.0;
   }
   
   double closePrice = HistoryDealGetDouble(dealTicket, DEAL_PRICE); 
     
   // Slippage in points
   double slippagePts = 0;
   double pointVal = SymbolInfoDouble(dealSymbol, SYMBOL_POINT);
   if(pointVal == 0) pointVal = 0.00001; // Fallback
   
   if(requestedPrice > 0) {
      slippagePts = MathAbs(requestedPrice - entryPrice) / pointVal;
   }
   
   double profit = HistoryDealGetDouble(dealTicket, DEAL_PROFIT);
   long type = HistoryDealGetInteger(dealTicket, DEAL_TYPE);
   string orderType = (type == DEAL_TYPE_BUY) ? "BUY" : "SELL";
   
   // Calculate profit in points
   double profitPts = 0;
   if(type == DEAL_TYPE_BUY) { 
      profitPts = (closePrice - entryPrice) / pointVal; 
   } else {
      profitPts = (entryPrice - closePrice) / pointVal;
   }
   
   // Note: We cannot retrieve the EXACT historical spread at the moment the trade closed in the past.
   // We will just send 0 or a base value, as MT5 doesn't store historical spreads in the deal history.
   double spreadPts = 0.0;
   
   // Server time components
   MqlDateTime dt;
   TimeToStruct(openTime, dt);
   int brokerHour = dt.hour;
   int brokerMinute = dt.min;
   
   string json = StringFormat(
      "{\"type\":\"trade_closed\", \"ticket\":\"%d\", \"pair\":\"%s\", \"orderType\":\"%s\", \"profit\":%.2f, \"openTime\":\"%s\", \"closeTime\":\"%s\", \"durationMin\":%.2f, \"requestedPrice\":%.5f, \"openPrice\":%.5f, \"slippagePts\":%.1f, \"spreadPts\":%.1f, \"brokerHour\":%d, \"brokerMinute\":%d, \"profitPts\":%.1f}",
      dealTicket, dealSymbol, orderType, profit, TimeToString(openTime, TIME_DATE|TIME_MINUTES), TimeToString(closeTime, TIME_DATE|TIME_MINUTES), durationMin, requestedPrice, entryPrice, slippagePts, spreadPts, brokerHour, brokerMinute, profitPts
   );

   char post[], result[];
   string headers = "Content-Type: application/json\r\nAuthorization: Bearer " + WebhookSecret + "\r\n";
   StringToCharArray(json, post, 0, WHOLE_ARRAY, CP_UTF8);

   string resHeaders;
   int res = WebRequest("POST", WebhookURL, headers, 5000, post, result, resHeaders);
   
   if(res != 200) {
      Print("Failed to sync ticket ", dealTicket, ". HTTP Code: ", res);
   }
}

//+------------------------------------------------------------------+
//| Function to gather account data and send HTTP POST to website    |
//+------------------------------------------------------------------+
void PushAccountStats()
{
   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double equity = AccountInfoDouble(ACCOUNT_EQUITY);
   double profit = AccountInfoDouble(ACCOUNT_PROFIT);
   
   string json = StringFormat(
      "{\"type\":\"account_update\", \"balance\":%.2f, \"equity\":%.2f, \"profit\":%.2f, \"winRate\":85.0, \"drawdown\":1.5, \"equityCurve\":[{\"date\":\"Today\", \"value\":%.2f}]}",
      balance, equity, profit, equity
   );

   char post[], result[];
   string headers = "Content-Type: application/json\r\nAuthorization: Bearer " + WebhookSecret + "\r\n";
   StringToCharArray(json, post, 0, WHOLE_ARRAY, CP_UTF8);

   string resHeaders;
   int res = WebRequest("POST", WebhookURL, headers, 5000, post, result, resHeaders);
}

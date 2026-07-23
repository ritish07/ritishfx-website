# Technical Specification: MT5 EA Licensing & Subscription System

## 1. Overview
This document outlines the technical architecture for protecting the Momentum Pro EA. The system ties the EA to a user's MT5 Account Number and charges them via Stripe using a trial-to-annual subscription model. 

The primary goal is to prevent EA piracy (unauthorized sharing of `.ex5` files) without using cumbersome license keys.

---

## 2. Pricing & Subscription Model
- **Platform**: Stripe
- **Initial Phase (Trial)**: $5 flat fee for the first month.
- **Recurring Phase**: $348/year (equivalent to $29/month, billed annually).
- **Implementation Strategy**: This will be configured in Stripe using a **Subscription Schedule** or by setting up a product with a discounted first-month pricing phase.

---

## 3. Database Architecture (Prisma/SQLite)
We will introduce three new tables to handle users, their subscriptions, and their authorized MT5 accounts.

```prisma
model Customer {
  id               String         @id @default(uuid())
  email            String         @unique
  stripeCustomerId String         @unique
  subscriptions    Subscription[]
  createdAt        DateTime       @default(now())
}

model Subscription {
  id                   String     @id @default(uuid())
  stripeSubscriptionId String     @unique
  customerId           String
  customer             Customer   @relation(fields: [customerId], references: [id])
  status               String     // "active", "past_due", "canceled", "incomplete"
  currentPeriodEnd     DateTime   // The date the current billing period expires
  licenses             License[]
  createdAt            DateTime   @default(now())
  updatedAt            DateTime   @updatedAt
}

model License {
  id               String       @id @default(uuid())
  mt5AccountNumber String       @unique
  subscriptionId   String
  subscription     Subscription @relation(fields: [subscriptionId], references: [id])
  createdAt        DateTime     @default(now())
}
```

---

## 4. API Endpoints

### A. Stripe Checkout Session (`POST /api/checkout`)
- **Triggered when:** The user clicks "Start Trial" on the pricing page.
- **Action:** Creates a Stripe Checkout Session for the specific price ID.
- **Success URL:** Redirects the user to `/dashboard?success=true`.
- **Cancel URL:** Redirects back to the pricing page.

### B. Stripe Webhooks (`POST /api/webhooks/stripe`)
- **Purpose:** Keeps the local database perfectly synced with Stripe's recurring billing engine.
- **Events Listened To:**
  - `checkout.session.completed`: Creates the `Customer` and `Subscription` in the database.
  - `invoice.payment_succeeded`: Updates the `currentPeriodEnd` date in the database (extending their access).
  - `invoice.payment_failed` / `customer.subscription.deleted`: Changes the subscription `status` to "past_due" or "canceled", immediately revoking EA access.

### C. MQL5 Licensing API (`GET /api/license/verify`)
- **Purpose:** The endpoint pinged by the EA's `WebRequest()` function in MT5.
- **Query Params:** `?account=5432198` (The user's MT5 Account Number).
- **Logic Flow:**
  1. Find `License` where `mt5AccountNumber` == `5432198`.
  2. If not found, return `EXPIRED`.
  3. If found, check the linked `Subscription`.
  4. If `Subscription.status` == "active" AND `Subscription.currentPeriodEnd` > `now()`, return `OK`.
  5. Otherwise, return `EXPIRED`.
- **Response Format:** Plain text (`OK` or `EXPIRED`) for easy parsing in MQL5.

---

## 5. Frontend User Dashboard (`/dashboard`)
A secure portal for paying customers.

- **Authentication:** NextAuth (Magic Link / Google) OR simple Customer Portal gating.
- **Features:**
  1. **Status Indicator:** Shows if their subscription is Active, Trial, or Expired.
  2. **MT5 Account Registration:** An input field where they can bind their MT5 Account Number to their subscription.
     - *Business Logic Rule:* A user can only bind ONE MT5 account per subscription. We must decide if they are allowed to change it freely, or if it requires admin intervention to prevent abuse.
  3. **Billing Portal:** A button that securely redirects them to the Stripe Customer Portal so they can update their credit card or cancel their subscription directly via Stripe.

---

## 6. MQL5 EA Integration Requirements
The MQL5 code must be updated to integrate with this system:

1. In `OnInit()`, fetch the account number using `AccountInfoInteger(ACCOUNT_LOGIN)`.
2. Use `WebRequest()` to send a GET request to `https://ritishlabs.com/api/license/verify?account=[ACCOUNT_NUMBER]`.
3. Check the response text:
   - If `OK`: Proceed with initialization.
   - If `EXPIRED`: Call `ExpertRemove()` and `Alert("License Expired or Invalid")`.
4. Catch `ERR_FUNCTION_NOT_ALLOWED` (Error 4060):
   - If `WebRequest` fails, immediately call `ExpertRemove()` and alert the user to whitelist the API URL in MT5 Options. (Failing Closed).

---
sidebar_position: 1
title: Payment Flow
description: Complete end-to-end payment flow guide. How USDC payments work from intent creation to settlement on Solana.
---

# Payment Flow

This guide explains the complete payment flow from intent creation to settlement.

## Step-by-Step

### 1. Create Intent

Your backend creates a payment intent via the SDK or API, specifying the amount and order ID.

### 2. Display Payment Info

Your frontend displays the merchant destination address, exact amount, and payment reference (optionally as a QR code).

### 3. Customer Sends USDC

The customer sends the exact USDC amount to the merchant destination address with the payment reference.

### 4. Confirmation

Solana confirms the transaction. Stendly detects the payment on-chain.

### 5. Webhook Notification

Stendly sends a `payment_intent.succeeded` webhook to your endpoint.

### 6. Fulfill Order

Your backend receives the webhook, verifies the signature, and fulfills the order.

## Settlement

Funds are transferred directly to your configured payout wallet. Stendly monitors the referenced on-chain transfer and
updates the payment intent; there is no Stendly balance to withdraw.

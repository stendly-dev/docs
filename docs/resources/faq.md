---
sidebar_position: 1
title: Frequently Asked Questions
description: Frequently asked questions about Stendly — payments, SDKs, webhooks, billing, and support.
---

# Frequently Asked Questions

## General

**What is Stendly?**

Stendly is a non-custodial payment gateway on Solana that enables merchants to accept USDC payments directly from
customers.

**What does "non-custodial" mean?**

We never hold your funds. Stendly tracks the on-chain USDC transfer using a payment intent and Solana reference address,
then confirms the payment after the network finalizes it.

**Which blockchain does Stendly use?**

Solana mainnet for production, Solana devnet for testing.

**What currency can I accept?**

USDC (Solana) — the leading USD-pegged stablecoin.

## Payments

**How long do intents live?**

30 minutes by default. After that, they expire and cannot be paid.

**Can I cancel an intent?**

Not via API yet. Contact support or let it expire.

**Do webhooks guarantee delivery?**

No. Stendly makes up to three delivery attempts for network failures, timeouts, HTTP 408, HTTP 429, and 5xx responses,
with short backoff between attempts. Ensure idempotent handler logic because the same event can be delivered more than
once.

**What are the fees?**

Zero merchant fees. A flat $0.02 USDC convenience fee is applied to the customer per transaction to cover network costs
and infrastructure.

## SDKs

**Which SDKs are available?**

Python (`stendly`), Node.js (`@stendly/sdk`), and .NET (`Stendly`).

**Is the SDK thread-safe?**

Yes. All SDKs are thread-safe for their respective paradigms.

**Can I use the SDK in serverless functions?**

Yes. Reuse the client across invocations (global scope) for connection pooling.

## Rate Limits

**What's the rate limit?**

Default varies by endpoint. Contact support for increases.

**What happens when I exceed the limit?**

The API returns HTTP 429 with a `Retry-After` header. SDKs handle this automatically with exponential backoff.

## Support

**How do I get help?**

Email support@stendly.com or open a GitHub issue.

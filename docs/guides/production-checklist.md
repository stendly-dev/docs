---
sidebar_position: 5
title: Production Checklist
description: Security, reliability, and operational checks before launching a Stendly payment integration.
---

# Production Checklist

- Use a mainnet API key only from your backend.
- Store API keys and webhook secrets in a secret manager.
- Create payment intents with an idempotency key.
- Verify webhook signatures over the raw request body.
- Enforce timestamp tolerance and deduplicate webhook deliveries.
- Fulfill orders only from verified server-side payment state.
- Store the intent ID, order ID, amount, status, and transaction signature together.
- Handle expired, underpaid, duplicate, and delayed payments explicitly.
- Test retries, timeouts, and webhook endpoint outages before launch.
- Monitor API errors without logging credentials or webhook secrets.

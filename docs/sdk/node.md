---
title: Node.js SDK Reference
description: Complete reference for the Stendly Node.js SDK (@stendly/sdk) — installation, client, namespaces, types, error handling, and examples.
sidebar_position: 2
---

# Node.js SDK Reference

The official Stendly Node.js SDK provides a type-safe, Promise-based interface for interacting with the Stendly API. It
uses native `fetch` (Node.js 18+), Zod runtime validation, and automatic retry with exponential backoff.

## Installation

```bash
npm install @stendly/sdk
```

## Requirements

- Node.js 18.0+ (native `fetch` API)
- TypeScript 5.0+ (optional, for type safety)

## Quick Start

```typescript
import { StendlyClient } from '@stendly/sdk';

const client = new StendlyClient({
  apiKey: 'st_live_your_key_here'
});

const intent = await client.intents.create(4999, 'order_001');

console.log(`Pay to: ${intent.referenceAddress}`);
```

## Client Options

| Option        | Type                    | Default     | Description                     |
|---------------|-------------------------|-------------|---------------------------------|
| `apiKey`      | `string`                | required    | Secret API key                  |
| `environment` | `'mainnet' \| 'devnet'` | `'mainnet'` | API environment                 |
| `timeout`     | `number`                | `10`        | Timeout in **seconds** (not ms) |
| `maxRetries`  | `number`                | `2`         | Maximum retry attempts          |

## Namespaces

### Intents

All methods take **positional arguments** (not objects).

```typescript
// create(amountCents, orderId, terminalId?, idempotencyKey?)
const intent = await client.intents.create(4999, 'order_001');
const retrieved = await client.intents.retrieve(intentId);
```

### Terminals

```typescript
// create(name)
const terminal = await client.terminals.create('Main Counter');
// list()
const terminals = await client.terminals.list();
```

### Webhooks

```typescript
// update(url)
await client.webhooks.update('https://myshop.com/webhooks/stendly');

// constructEvent(payload, signatureHeader, webhookSecret, toleranceSeconds?)
// This is a SYNCHRONOUS method
const event = client.webhooks.constructEvent(
  JSON.stringify(req.body),
  req.headers['x-stendly-signature'],
  WEBHOOK_SECRET
);

// event.event contains the event type (e.g., "payment_intent.succeeded")
if (event.event === 'payment_intent.succeeded') {
  fulfill(event.data.orderId);
}
```

### Merchant

```typescript
const profile = await client.merchant.getProfile();
const stats = await client.merchant.getStats();
```

## Error Handling

Error classes exported from `@stendly/sdk`:

```
StendlyError (base)
├── AuthenticationError (401/403)
├── ValidationError (400)
├── RateLimitError (429)
├── ApiConnectionError (network)
└── SignatureVerificationError (webhook)
```

```typescript
import { StendlyError, AuthenticationError } from '@stendly/sdk';

try {
  await client.intents.create(1000, 'test');
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error(`Auth failed: ${err.message}`);
  }
}
```

## Retry Behavior

- Retryable status codes: 500, 502, 503, 504
- Backoff: exponential with jitter (1s → 2s → 4s, max 60s)
- Configure via `maxRetries` option

## API Endpoints

The SDK communicates with these endpoints:

| Operation       | Method | Path                           |
|-----------------|--------|--------------------------------|
| Create Intent   | POST   | `/api/merchants/intents`       |
| Retrieve Intent | GET    | `/api/merchants/intents/{id}`  |
| Create Terminal | POST   | `/api/b2b/merchants/terminals` |
| List Terminals  | GET    | `/api/b2b/merchants/terminals` |
| Update Webhook  | PATCH  | `/api/b2b/merchants/webhook`   |
| Get Profile     | GET    | `/api/b2b/merchants/me`        |
| Get Stats       | GET    | `/api/b2b/merchants/stats`     |
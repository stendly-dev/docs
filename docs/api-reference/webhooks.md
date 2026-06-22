---
sidebar_position: 3
title: Webhooks API
description: Complete reference for the Webhooks API. Configure webhook URLs and verify webhook signatures.
---

# Webhooks API

## Update Webhook URL

`PATCH /api/b2b/merchants/webhook`

### Request Body

| Parameter    | Type     | Required | Description                |
|--------------|----------|----------|----------------------------|
| `webhookUrl` | `string` | Yes      | HTTPS webhook endpoint URL |

Note: The JSON key is `webhookUrl` (not `url`).

### Response (200 OK)

```json
{
  "success": true
}
```

### Examples

```bash
curl -X PATCH "https://api.stendly.com/api/b2b/merchants/webhook" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl": "https://myshop.com/webhooks/stendly"}'
```

## Webhook Signature Verification

Stendly signs all webhook requests using HMAC-SHA256.

### Signature Header

```
X-Stendly-Signature: t=1715000000,v1=abc123...
```

Where:

- `t` = Unix timestamp
- `v1` = HMAC-SHA256(secret, timestamp + payload)

### Webhook Payload

```json
{
  "event": "payment_intent.succeeded",
  "data": {
    "paymentIntentId": "123e4567-e89b-12d3-a456-426614174000",
    "orderId": "order_001",
    "amountCents": 4999,
    "expectedAmountCents": 4999,
    "txSignature": "5KtPn1..."
  }
}
```

Note: The top-level key is `event` (not `eventType`).

### Event Types

| Event                      | Description                                        |
|----------------------------|----------------------------------------------------|
| `payment_intent.succeeded` | Payment received successfully                      |
| `payment_intent.underpaid` | Payment received but amount was less than expected |
| `payment_intent.failed`    | Payment failed                                     |
| `payment_intent.expired`   | Payment intent expired                             |
| `payment_intent.updated`   | Payment intent status changed                      |

### SDK Usage

```python
event = client.webhooks.construct_event(payload, signature, WEBHOOK_SECRET)
# event.event_type contains the event type
```

```typescript
const event = client.webhooks.constructEvent(payload, signature, WEBHOOK_SECRET);
// event.event contains the event type
```

```csharp
var webhookEvent = await client.Webhooks.ConstructEventAsync(payload, signature, WEBHOOK_SECRET);
// webhookEvent.Event contains the event type
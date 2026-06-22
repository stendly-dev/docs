---
sidebar_position: 1
title: Payment Intents API
description: Complete reference for the Payment Intents API. Create and retrieve payment intents.
---

# Payment Intents API

## Create Payment Intent

`POST /api/merchants/intents`

### Request Body

| Parameter     | Type     | Required | Description                                        |
|---------------|----------|----------|----------------------------------------------------|
| `amountCents` | `number` | Yes      | Amount in cents (e.g., 5000 = $50.00). Must be > 0 |
| `orderId`     | `string` | Yes      | Unique order reference (max 100 chars)             |
| `terminalId`  | `string` | No       | Terminal UUID for POS integration                  |

### Response (201 Created)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "orderId": "order_001",
  "expectedAmountCents": 4999,
  "referenceAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "destinationAddress": "E7g2wdh9Z7a5vZkpQmdRZaVJ5z9pK2P38a6GKxeJ2Hc8",
  "status": "pending",
  "expiresAt": "2026-05-12T11:00:00Z"
}
```

### Examples

```python
intent = client.intents.create(amount_cents=4999, order_id="order_001")
```

```typescript
const intent = await client.intents.create(4999, "order_001");
```

```csharp
var intent = await client.Intents.CreateIntentAsync(4999, "order_001");
```

```bash
curl -X POST "https://api.stendly.com/api/merchants/intents" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amountCents": 4999, "orderId": "order_001"}'
```

## Retrieve Payment Intent

`GET /api/merchants/intents/{id}`

```bash
curl "https://api.stendly.com/api/merchants/intents/123e4567-e89b-12d3-a456-426614174000" \
  -H "Authorization: Bearer $API_KEY"
```

## Status Transitions

```
PENDING → PAID
PENDING → UNDERPAID → PAID
PENDING → EXPIRED (30 min timeout)
PENDING → CANCELLED (manual)
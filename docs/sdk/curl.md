---
title: cURL API Examples
description: Raw HTTP API examples for all Stendly endpoints using cURL. Test the Stendly API directly from your terminal.
sidebar_position: 4
---

# cURL API Examples

Raw HTTP API examples using cURL for all Stendly endpoints.

## Authentication

All requests require an `Authorization: Bearer` header with your secret API key:

```bash
API_KEY="st_live_your_key_here"
```

## Intents

### Create Payment Intent

```bash
curl -X POST "https://api.stendly.com/api/merchants/intents" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amountCents": 4999,
    "orderId": "order_001"
  }'
```

### Retrieve Payment Intent

```bash
curl "https://api.stendly.com/api/merchants/intents/INTENT_ID" \
  -H "Authorization: Bearer $API_KEY"
```

## Terminals

### Create Terminal

```bash
curl -X POST "https://api.stendly.com/api/b2b/merchants/terminals" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Main Counter"}'
```

### List Terminals

```bash
curl "https://api.stendly.com/api/b2b/merchants/terminals" \
  -H "Authorization: Bearer $API_KEY"
```

## Webhooks

### Update Webhook URL

```bash
curl -X PATCH "https://api.stendly.com/api/b2b/merchants/webhook" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"webhookUrl": "https://myshop.com/webhooks/stendly"}'
```

## Merchant

### Get Profile

```bash
curl "https://api.stendly.com/api/b2b/merchants/me" \
  -H "Authorization: Bearer $API_KEY"
```

### Get Stats

```bash
curl "https://api.stendly.com/api/b2b/merchants/stats" \
  -H "Authorization: Bearer $API_KEY"
---
sidebar_position: 4
title: Merchant API
description: Complete reference for the Merchant API. Retrieve profile and stats.
---

# Merchant API

## Get Profile

`GET /api/b2b/merchants/me`

### Response (200 OK)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Acme Corp",
  "payoutAddress": "E7g2wdh9Z7a5vZkpQmdRZaVJ5z9pK2P38a6GKxeJ2Hc8",
  "webhookUrl": "https://myshop.com/webhooks/stendly",
  "webhookSecret": "whsec_xxx",
  "verificationStatus": "verified"
}
```

**⚠️ Important:** `rawApiKey` is ONLY returned once by `POST /api/b2b/merchants/generate-key`. Save it immediately!

## Get Stats

`GET /api/b2b/merchants/stats`

### Response (200 OK)

```json
{
  "totalVolumeCents": 150000,
  "totalTransactions": 45,
  "successfulTransactions": 42,
  "chartData": [
    {
      "date": "2026-04-11T00:00:00Z",
      "volumeCents": 5000,
      "transactions": 2
    }
  ]
}
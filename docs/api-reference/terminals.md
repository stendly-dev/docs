---
sidebar_position: 2
title: Terminals API
description: Complete reference for the Terminals API. Create and list POS terminals.
---

# Terminals API

## Create Terminal

`POST /api/b2b/merchants/terminals`

### Request Body

| Parameter | Type     | Required | Description                  |
|-----------|----------|----------|------------------------------|
| `name`    | `string` | Yes      | Display name (max 100 chars) |

### Response (201 Created)

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Main Counter",
  "isActive": true,
  "createdAt": "2026-05-11T12:00:00Z"
}
```

### Examples

```bash
curl -X POST "https://api.stendly.com/api/b2b/merchants/terminals" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "Main Counter"}'
```

## List Terminals

`GET /api/b2b/merchants/terminals`

```bash
curl "https://api.stendly.com/api/b2b/merchants/terminals" \
  -H "Authorization: Bearer $API_KEY"
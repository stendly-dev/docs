---
sidebar_position: 5
title: API Errors
description: Complete reference for Stendly API error codes, HTTP status codes, error response format, and troubleshooting.
---

# API Errors

## Error Response Format

```json
{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key",
    "code": "invalid_api_key",
    "requestId": "req_abc123"
  }
}
```

## HTTP Status Codes

| Status | Code                   | Description                     |
|--------|------------------------|---------------------------------|
| 400    | `validation_error`     | Invalid request parameters      |
| 401    | `authentication_error` | Missing or invalid API key      |
| 403    | `authentication_error` | Insufficient permissions        |
| 404    | `not_found`            | Resource not found              |
| 429    | `rate_limit_error`     | Too many requests               |
| 500    | `api_error`            | Internal server error           |
| 502    | `api_error`            | Upstream error                  |
| 503    | `api_error`            | Service temporarily unavailable |
| 504    | `api_error`            | Gateway timeout                 |

## Error Type Reference

| Type                   | Description         | Common Causes                               |
|------------------------|---------------------|---------------------------------------------|
| `authentication_error` | API key issues      | Invalid key, expired key, wrong environment |
| `validation_error`     | Invalid request     | Missing field, wrong type, out of range     |
| `rate_limit_error`     | Rate limit exceeded | Too many requests per second                |
| `api_error`            | Server error        | Temporary outage, network issue             |
| `connection_error`     | Network failure     | DNS resolution, timeout, SSL error          |

## Rate Limiting

- Default rate limit: varies by endpoint
- Exceeded: returns 429 with `Retry-After` header
- Solution: implement exponential backoff

## SDK Error Handling

All SDKs provide typed exceptions for each error type. See the [Error Handling Guide](../guides/error-handling.md) for
details.
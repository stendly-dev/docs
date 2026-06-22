---
sidebar_position: 2
title: Webhook Security
description: How Stendly secures webhooks with HMAC-SHA256 signatures. Signature verification, replay attack prevention, and best practices.
---

# Webhook Security

## Signature Algorithm

Stendly signs every webhook using HMAC-SHA256:

```
payload = timestamp + raw_body
signature = HMAC-SHA256(webhook_secret, payload)
header = "t=" + timestamp + ",v1=" + signature
```

## Verification Process

1. Extract the `X-Stendly-Signature` header
2. Parse timestamp and signature from the header
3. Recompute HMAC-SHA256 using your webhook secret
4. Compare computed signature with the header using constant-time comparison
5. Verify timestamp is within 5 minutes (prevents replay attacks)

## SDK Verification

All SDKs handle this automatically:

```python
event = client.webhooks.construct_event(
    payload=request.get_data(),
    signature_header=request.headers["X-Stendly-Signature"],
    webhook_secret=WEBHOOK_SECRET
)
```

## Best Practices

- **Always verify** signatures - never skip verification
- **Use raw body** - verify against the raw request body, not parsed JSON
- **HTTPS only** - never use webhooks over HTTP
- **Rotate secrets** - change webhook secret periodically
- **Idempotent handlers** - handle duplicate webhook deliveries safely
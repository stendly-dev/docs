---
sidebar_position: 4
title: Rate Limiting
description: Stendly API rate limits, Retry-After headers, and exponential backoff strategies.
---

# Rate Limiting

## Limits

Stendly applies rate limits per API key to ensure fair usage. Limits vary by endpoint.

## Exceeding Limits

When a rate limit is exceeded, the API returns:

- **HTTP Status**: 429 Too Many Requests
- **Header**: `Retry-After` (seconds to wait)

## Handling Rate Limits

### Automatic Retry

All SDKs automatically retry on 429 with exponential backoff:

```python
client = Client(api_key="...", max_retries=5)
```

### Manual Handling

```python
from stendly import RateLimitError
import time

try:
    intent = client.intents.create(...)
except RateLimitError as e:
    wait = int(e.retry_after)
    print(f"Rate limited. Waiting {wait}s...")
    time.sleep(wait)
    # Retry
```

## Best Practices

- Implement exponential backoff with jitter
- Cache idempotent responses when possible
- Batch requests instead of sending many at once
- Monitor your usage in the dashboard
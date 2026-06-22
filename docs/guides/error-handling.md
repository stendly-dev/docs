---
sidebar_position: 3
title: Error Handling
description: Complete guide to handling Stendly API errors. Typed exceptions, retry strategies, and logging best practices.
---

# Error Handling

## Exception Hierarchy

All SDKs provide a typed exception hierarchy:

```
StendlyError (base)
├── AuthenticationError (401/403)
├── ValidationError (400)
├── RateLimitError (429)
├── APIConnectionError (network failures)
└── SignatureVerificationError (webhook)
```

## Python Example

```python
from stendly import StendlyError, AuthenticationError

try:
    intent = client.intents.create(amount_cents=1000, order_id="test")
except AuthenticationError as e:
    print(f"Auth failed: {e.message}")
except ValidationError as e:
    print(f"Invalid: {e.message}")
except RateLimitError as e:
    print(f"Rate limited, retry in {e.retry_after}s")
except APIConnectionError as e:
    print(f"Network error: {e.message}")
except StendlyError as e:
    print(f"API error: {e.status_code} - {e.message}")
```

## Node.js Example

```typescript
import { StendlyError, AuthenticationError, ValidationError, RateLimitError, ApiConnectionError } from '@stendly/sdk';

try {
  const intent = await client.intents.create(1000, "test");
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error(`Auth failed: ${err.message}`);
  } else if (err instanceof ValidationError) {
    console.error(`Invalid input: ${err.message} (field: ${err.field})`);
  } else if (err instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${err.retryAfter} seconds`);
  } else if (err instanceof ApiConnectionError) {
    console.error(`Network error: ${err.message}`);
  } else if (err instanceof StendlyError) {
    console.error(`API error: ${err.message}`);
  }
}
```

## .NET Example

```csharp
using Stendly;
using Stendly.Exceptions;

try
{
    var intent = await client.Intents.CreateIntentAsync(1000, "test");
}
catch (StendlyAuthenticationException ex)
{
    _logger.LogError(ex, "Auth failed");
}
catch (StendlyValidationException ex)
{
    _logger.LogWarning(ex, "Invalid input");
}
catch (StendlyRateLimitException ex)
{
    _logger.LogInformation("Rate limited");
}
catch (StendlyApiConnectionException ex)
{
    _logger.LogError(ex, "Network error");
}
catch (StendlyException ex)
{
    _logger.LogError(ex, "API error");
}
```

## Logging

Include the `requestId` from errors when contacting support:

```python
except StendlyError as e:
    print(f"Request ID: {e.request_id}")
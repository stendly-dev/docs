---
title: Python SDK Reference
description: Complete reference for the Stendly Python SDK — installation, sync/async clients, namespaces, models, error handling, retry behavior, and examples.
sidebar_position: 1
---

# Python SDK Reference

The official Stendly Python SDK provides a type-safe, idiomatic interface for interacting with the Stendly API. It
supports both synchronous and asynchronous workflows, automatic retry with exponential backoff, and full type hint
coverage.

## Installation

```bash
pip install stendly
```

Or with poetry:

```bash
poetry add stendly
```

## Requirements

- Python 3.9+
- httpx >= 0.27.0
- pydantic >= 2.7.0

## Quick Start

```python
from stendly import Client

client = Client(api_key="st_live_your_key_here")

intent = client.intents.create(
    amount_cents=4999,
    order_id="order_001"
)

print(f"Pay to: {intent.reference_address}")
```

## Client Initialization

### Constructor Parameters

| Parameter     | Type    | Default     | Description                                |
|---------------|---------|-------------|--------------------------------------------|
| `api_key`     | `str`   | required    | Secret API key (`st_live_*`)               |
| `environment` | `str`   | `"mainnet"` | API environment: `"mainnet"` or `"devnet"` |
| `timeout`     | `float` | `10.0`      | Request timeout in seconds                 |
| `max_retries` | `int`   | `2`         | Maximum retry attempts                     |
| `http2`       | `bool`  | `True`      | Enable HTTP/2 support                      |

## Namespaces

### Intents

```python
# Create
intent = client.intents.create(amount_cents=4999, order_id="order_001")

# Retrieve
intent = client.intents.retrieve(intent_id)

# Async
intent = await client.intents.create(amount_cents=4999, order_id="order_001")
```

### Terminals

```python
# Create
terminal = client.terminals.create(name="Main Counter")

# List
terminals = client.terminals.list()
```

### Webhooks

```python
# Update URL
client.webhooks.update(url="https://myshop.com/webhooks/stendly")

# Verify signature
event = client.webhooks.construct_event(
    payload=request.get_data(),
    signature_header=request.headers["X-Stendly-Signature"],
    webhook_secret=WEBHOOK_SECRET
)
```

### Merchant

```python
# Get profile
profile = client.merchant.get_profile()

# Get stats
stats = client.merchant.get_stats()
```

## Error Handling

All exceptions inherit from `StendlyError`:

```
StendlyError
├── AuthenticationError (401/403)
├── ValidationError (400)
├── RateLimitError (429)
├── APIConnectionError (network)
└── SignatureVerificationError (webhook)
```

## Retry Behavior

- Retryable status codes: 500, 502, 503, 504
- Backoff: exponential with jitter (1s → 2s → 4s, max 60s)
- Configure via `max_retries` parameter
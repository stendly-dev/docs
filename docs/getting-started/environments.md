---
sidebar_position: 5
title: Environments
description: Stendly environment guide — Mainnet for production, Devnet for development.
---

# Environments

Stendly provides two API environments:

## Mainnet

- **URL**: `https://api.stendly.com`
- **Key prefix**: `st_live_`
- **Purpose**: Production payments
- **Settlement**: Real USDC on Solana mainnet

## Devnet (Sandbox)

- **URL**: `https://api-devnet.stendly.com`
- **Key prefix**: `st_live_`
- **Purpose**: Development and testing
- **Settlement**: Test USDC on Solana devnet

## API Keys

All API keys use the `st_live_` prefix regardless of environment. Select the environment explicitly when initializing
the SDK:

| Key prefix  | Environment | Base URL                         |
|-------------|-------------|----------------------------------|
| `st_live_*` | mainnet     | `https://api.stendly.com`        |
| `st_live_*` | devnet      | `https://api-devnet.stendly.com` |

## Explicit Configuration

```python
# Production
client = Client(api_key="st_live_xxx", environment="mainnet")

# Development sandbox (same key prefix)
client = Client(api_key="st_live_xxx", environment="devnet")
```

**Important:** The same `st_live_` key prefix is used for both environments. Set the `environment` parameter to switch
between mainnet and devnet.

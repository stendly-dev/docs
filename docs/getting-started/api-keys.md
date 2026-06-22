---
sidebar_position: 4
title: Generate API Keys
description: How to generate and manage Stendly API keys. Security best practices and key rotation.
---

# Generate API Keys

## Locate API Keys

1. Log into [dashboard.stendly.com](https://dashboard.stendly.com)
2. Navigate to **API Keys** in the sidebar
3. Click **Generate New Key**

## Key Format

All API keys use the `st_live_` prefix. Select the target environment when initializing the SDK:

| Prefix     | Environment | Usage               |
|------------|-------------|---------------------|
| `st_live_` | mainnet     | Production payments |
| `st_live_` | devnet      | Development/testing |

## Security Best Practices

- **Never commit** API keys to version control
- **Use environment variables** or a secret manager
- **Rotate keys** regularly (every 90 days recommended)
- **Use separate keys** for development and production
- **Revoke compromised keys** immediately from the dashboard

### Good

```python
import os
client = Client(api_key=os.environ["STENDLY_API_KEY"])
```

### Bad

```python
client = Client(api_key="st_live_xxxxxxxxx")  # ❌ Never hardcode

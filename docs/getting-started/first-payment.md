---
sidebar_position: 6
title: Your First Payment
description: End-to-end guide to creating your first USDC payment with Stendly. Install SDK, create intent, customer sends payment, verify via webhook.
---

# Your First Payment

This guide walks through creating your first USDC payment from start to finish.

## Prerequisites

- [Stendly account](./create-account.md) with approved KYB
- [API key](./api-keys.md) (`st_live_xxx`, set `environment="devnet"` for devnet)
- [Stendly Wallet](./create-wallet.md) with devnet USDC

## Step 1: Install the SDK

```bash
pip install stendly
```

## Step 2: Create a Payment Intent

```python
from stendly import Client
import os

client = Client(api_key=os.environ["STENDLY_API_KEY"])

intent = client.intents.create(
    amount_cents=4999,   # $49.99
    order_id="order_001" # Your order reference
)

print(f"Intent ID: {intent.id}")
print(f"Send USDC to: {intent.reference_address}")
print(f"Expected amount: ${intent.expected_amount_cents / 100:.2f}")
print(f"Expires at: {intent.expires_at}")
```

## Step 3: Customer Sends USDC

Display the merchant destination address and payment reference to your customer. They send the exact USDC amount using any Solana wallet (
Phantom, Solflare, etc.).

## Step 4: Verify Payment (Webhook)

Set up a webhook endpoint to receive payment notifications:

```python
from flask import Flask, request
from stendly import Client

app = Flask(__name__)
client = Client(api_key=os.environ["STENDLY_API_KEY"])
WEBHOOK_SECRET = os.environ["STENDLY_WEBHOOK_SECRET"]

@app.route("/webhooks/stendly", methods=["POST"])
def webhook():
    event = client.webhooks.construct_event(
        payload=request.get_data(),
        signature_header=request.headers["X-Stendly-Signature"],
        webhook_secret=WEBHOOK_SECRET
    )

    if event.event_type == "payment_intent.succeeded":
        order_id = event.data.order_id
        amount = event.data.amount_cents / 100
        print(f"Payment received: {order_id}, ${amount:.2f}")
        # Fulfill order here

    return "", 200
```

## Complete Example

See the [Python SDK Reference](../sdk/python.md) for complete examples.

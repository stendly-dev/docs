---
sidebar_position: 1
slug: /getting-started
id: overview
title: Getting Started Overview
description: Learn how Stendly works, what you need to start accepting non-custodial USDC payments on Solana, and the complete integration path.
---

# Getting Started with Stendly

Stendly is a non-custodial payment gateway built on the Solana blockchain. It enables merchants to accept USDC payments
directly from customers without ever holding or controlling user funds.

## How It Works

```
Your Customer                Stendly                   Your App
     │                          │                         │
     │ Sends USDC to merchant   │                         │
     ├─────────────────────────▶│                         │
     │                          │  Notifies via webhook   │
     │                          ├────────────────────────▶│
     │                          │                         │  Fulfill
     │                          │                         │  order
     │                          │                         ◀──┘
     │ Transfer includes a      │                         │
     │ payment reference        │                         │
     ◀──────────────────────────┤                         │
```

## What You Need

1. **A Stendly Wallet** — Created automatically when you set your PIN code
2. **A Stendly Account** — Register at [dashboard.stendly.com](https://dashboard.stendly.com)
3. **USDC on Solana** — To test payments in devnet or mainnet
4. **API Keys** — Generate from the dashboard

## Next Steps

- [Create an Account](create-account.md)
- [Create a Wallet](create-wallet.md)
- [Generate API Keys](api-keys.md)
- [Make Your First Payment](first-payment.md)

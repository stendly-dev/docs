---
sidebar_position: 3
title: Create Your Stendly Wallet
description: Step-by-step guide to creating your Stendly Wallet. No seed phrases — just a PIN code. Your wallet is protected by advanced PIN encryption.
---

# Create Your Stendly Wallet

Stendly provides a built-in wallet system designed for merchants — no seed phrases, no browser extensions needed. Just
set a PIN code and your wallet is ready.

## How It Works

Stendly Wallet is a non-custodial wallet generated directly in your browser using Web Cryptography API:

1. You set a **PIN code** (6+ digits)
2. A **Web Worker** derives your wallet keypair from the PIN and a server-authenticated secret
3. The encrypted wallet blob is stored in your browser's **IndexedDB**
4. The generated wallet address becomes your **payout address** automatically

You never need to install Phantom, Solflare, or any browser extension.

## Step 1: Create Your Stendly Wallet

1. Log into [dashboard.stendly.com](https://dashboard.stendly.com)
2. During initial setup, you'll be prompted to create a **PIN code**
3. Enter a secure PIN (6+ digits) — this is your wallet password
4. Confirm the PIN
5. Your Stendly Wallet is now generated and linked to your account

## Step 2: Verify Your Wallet

1. Navigate to **Settings → Wallet** in the dashboard
2. You'll see your **Payout Address** (your Stendly Wallet address)
3. This address is automatically used for all payment settlements

## Step 3: Get Devnet USDC (for Testing)

For testing on devnet:

1. Your Stendly Wallet is pre-configured for devnet when using test API keys
2. No additional steps needed — the wallet address is ready to receive test USDC

## Security Notes

- **Your PIN is never sent to our servers** — key derivation happens entirely in your browser
- **Your seed phrase never exists** — keys are derived deterministically from your PIN and server secret
- **Loss of PIN means loss of access** — there is no password reset for Stendly Wallet
- **The encrypted wallet blob** (stored in IndexedDB) can be backed up from the dashboard

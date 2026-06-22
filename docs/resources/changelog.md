---
sidebar_position: 2
title: Changelog
description: Version history and release notes for all Stendly SDKs.
---

# Changelog

## Python SDK (`stendly`)

### 0.2.1 (2026-05-18)

- Updated README positioning and SEO copy.

### 0.2.0 (2026-05-17)

- Added `invoice_url()`.
- Added merchant verification status labels.
- Added HTTP/2 support and `422` validation-error handling.
- Added request field aliases and improved error logging.

### 0.1.1 (2026-05-17)

- Packaging and version fixes.

### 0.1.0 (2026-05-11)

- Initial release
- Sync (`Client`) and async (`AsyncClient`) support
- Payment Intents: `create`, `retrieve`
- Terminals: `create`, `list`
- Webhooks: `update`, `construct_event`
- Merchant: `get_profile`, `get_stats`
- Pydantic v2 models
- Automatic retry with exponential backoff
- Idempotency key support

## Node.js SDK (`@stendly/sdk`)

### 0.2.1 (2026-05-18)

- Updated README positioning and SEO copy.

### 0.2.0 (2026-05-17)

- Added `invoiceUrl()`.
- Added `verificationStatusLabel`.
- Changed `verificationStatus` to the numeric API enum.
- Fixed the SDK User-Agent.

### 0.1.1 (2026-05-17)

- Packaging and version fixes.

### 0.1.0 (2026-05-11)

- Initial release
- `StendlyClient` with configurable options
- Payment Intents: `create`, `retrieve`
- Terminals: `create`, `list`
- Webhooks: `update`, `constructEvent`
- Merchant: `getProfile`, `getStats`
- Zod runtime validation
- Full TypeScript declarations
- ESM-native with CommonJS support

## .NET SDK (`Stendly`)

### 0.2.1 (2026-05-18)

- Updated README positioning and SEO copy.

### 0.2.0 (2026-05-17)

- Added `InvoiceUrl()`.
- Added `VerificationStatus` and `VerificationStatusLabel`.
- Added `Environment`.
- Fixed the SDK User-Agent.

### 0.1.1 (2026-05-17)

- Packaging and version fixes.

### 0.1.0 (2026-05-11)

- Initial release
- `StendlyClient` implementing `IStendlyClient`
- Payment Intents: `CreateAsync`, `RetrieveAsync`
- Terminals: `CreateAsync`, `ListAsync`
- Webhooks: `UpdateAsync`, `ConstructEvent`
- Merchant: `GetProfileAsync`, `GetStatsAsync`
- Typed exception hierarchy
- XML documentation
- DI container support (singleton registration)

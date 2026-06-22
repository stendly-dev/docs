---
title: .NET SDK Reference
description: Complete reference for the Stendly .NET SDK (Stendly NuGet package) — installation, client, namespaces, models, error handling, DI registration, and examples.
sidebar_position: 3
---

# .NET SDK Reference

The official Stendly .NET SDK provides a type-safe, async-first interface for interacting with the Stendly API. It uses
`HttpClient` with connection pooling, automatic retry, and full nullable annotations.

## Installation

```bash
dotnet add package Stendly
```

## Requirements

- .NET 8.0+ (.NET 10.0 recommended)

## Quick Start

```csharp
using Stendly;

var client = new StendlyClient(new HttpClient(), "st_live_your_key_here");

var intent = await client.Intents.CreateIntentAsync(4999, "order_001");
Console.WriteLine($"Pay to: {intent.ReferenceAddress}");
```

## Client Initialization

Constructor requires `HttpClient` first:

```csharp
public StendlyClient(HttpClient httpClient, string apiKey, string environment = "mainnet", int maxRetries = 2)
```

## Namespaces

### Intents (`IIntentsClient`)

```csharp
// CreateIntentAsync(amountCents, orderId, terminalId?, idempotencyKey?, cancellationToken?)
var intent = await client.Intents.CreateIntentAsync(4999, "order_001");

// RetrieveIntentAsync(intentId, cancellationToken?)
var retrieved = await client.Intents.RetrieveIntentAsync(intentId);
```

### Terminals (`ITerminalsClient`)

```csharp
// CreateTerminalAsync(name, cancellationToken?)
var terminal = await client.Terminals.CreateTerminalAsync("Main Counter");

// ListTerminalsAsync(cancellationToken?)
var terminals = await client.Terminals.ListTerminalsAsync();
```

### Webhooks (`IWebhooksClient`)

```csharp
// UpdateWebhookUrlAsync(url, cancellationToken?)
await client.Webhooks.UpdateWebhookUrlAsync("https://myshop.com/webhooks/stendly");

// ConstructEventAsync(byte[] payload, string signatureHeader, string webhookSecret, ...)
// NOTE: payload is byte[], method is ASYNC
var webhookEvent = await client.Webhooks.ConstructEventAsync(
    rawBodyBytes, signature, webhookSecret
);
// webhookEvent.Event contains the event type (e.g., "payment_intent.succeeded")
```

### Merchant (`IMerchantClient`)

```csharp
var profile = await client.Merchant.GetProfileAsync();  // GET /api/b2b/merchants/me
var stats = await client.Merchant.GetStatsAsync();       // GET /api/b2b/merchants/stats
```

## Error Handling

All exceptions inherit from `StendlyException`:

```
StendlyException
├── StendlyAuthenticationException (401/403)
├── StendlyValidationException (400)
├── StendlyRateLimitException (429)
├── StendlyApiConnectionException (network)
└── StendlySignatureVerificationException (webhook)
```

## API Endpoints

| Operation       | Method | Path                           |
|-----------------|--------|--------------------------------|
| Create Intent   | POST   | `/api/merchants/intents`       |
| Retrieve Intent | GET    | `/api/merchants/intents/{id}`  |
| Create Terminal | POST   | `/api/b2b/merchants/terminals` |
| List Terminals  | GET    | `/api/b2b/merchants/terminals` |
| Update Webhook  | PATCH  | `/api/b2b/merchants/webhook`   |
| Get Profile     | GET    | `/api/b2b/merchants/me`        |
| Get Stats       | GET    | `/api/b2b/merchants/stats`     |
# Architecture and Design Patterns

Architecture is the set of consequential boundaries and decisions that make a system easier or harder to change. Start from user needs and operational constraints; choose a named pattern only when it clarifies those forces.

## System-level patterns

- **Layered architecture** separates presentation, application, domain, and infrastructure responsibilities.
- **Hexagonal architecture** keeps domain behavior behind ports implemented by adapters.
- **Clean architecture** points dependencies toward stable business rules.
- **Event-driven architecture** communicates state changes through events and requires deliberate delivery, ordering, and idempotency policies.
- **CQRS** separates command and query models when their behavior, scaling, or data shapes genuinely differ; it does not require separate databases.
- **Event sourcing** derives current state by replaying an immutable event history. It is often paired with CQRS, but introduces event evolution, replay, projection, and operational complexity.
- **Microservices** deploy bounded capabilities independently at the cost of distributed operations and coordination.
- **Service-oriented architecture** organizes reusable services, often with more centralized integration.
- **Serverless architecture** delegates infrastructure management to platform services but still requires observability, limits, and cost control.
- **Reactive architecture** designs around streams, responsiveness, resilience, and asynchronous boundaries.
- **Domain-driven design** aligns models and language with business capabilities and bounded contexts.

Most frontend products do not need all of these. A modular monolith is often the best starting point because boundaries can be tested before they become deployment boundaries.

## Frontend architecture

React's one-way data flow can be described with several patterns:

- In **MVVM**, components are views, hooks or stores act as view models, and APIs or domain objects form the model.
- In **MVI**, events are intents, reducers produce state, and components render that state.
- Frameworks that combine server and client rendering add routing, data loading, caching, and server-component boundaries; they do not automatically choose an application architecture.

Micro-frontends divide ownership or deployment at feature boundaries. A build-time monorepo keeps one release unit; runtime composition such as module federation allows independent delivery but increases compatibility, performance, and operational work. Use either only when team and release boundaries justify it.

Optimistic UI updates the interface before server confirmation. Every optimistic action needs an identity, a reconciliation strategy, an error state, and a way to undo or retry.

MACH describes systems built around microservices, API-first contracts, cloud-native delivery, and headless capabilities. It is a set of principles, not a required vendor stack.

## Object and collaboration patterns

- **Facade:** provide a simpler interface to a complex subsystem.
- **Singleton:** expose one shared instance; use carefully because global state complicates tests.
- **Factory:** centralize object creation behind a contract.
- **Adapter:** translate one interface into another.
- **Observer:** notify subscribers when a subject changes.
- **Strategy:** select among interchangeable algorithms.
- **Decorator:** add behavior without changing the wrapped object's contract.
- **Command:** represent an action as data, supporting queues or undo.
- **Template Method:** fix an algorithm's outline while allowing selected steps to vary.
- **Builder:** construct a complex value incrementally.
- **Dependency injection:** provide dependencies from outside a component or service so policies depend on explicit contracts and tests can substitute controlled implementations.

Patterns should reduce shared vocabulary and risk. If a direct function or component composition is clearer, use it.

## APIs and data flow

REST is an architectural style built around resources and HTTP semantics. SOAP is a protocol with XML-based envelopes and established enterprise standards. GraphQL exposes a typed query model. The choice should follow client needs, caching, governance, observability, and organizational capabilities.

Headless systems separate a content or commerce capability from presentation. Avoid designing a universal response or “single GET” endpoint without evidence; explicit use-case-oriented contracts are easier to evolve.

If one screen needs dozens of client requests, inspect the boundary rather than accepting the fan-out. An aggregation endpoint, backend for frontend, GraphQL query, or explicit batch operation may fit, depending on ownership, caching, failure isolation, and whether the data must be consistent together. Instrument clients and SDKs too: an observability integration that generates an N+1 request pattern can become the performance problem it was meant to diagnose.

## Data stores and backend reliability

Choose a database from access patterns, consistency, transactions, query flexibility, scale, operational skills, and offline requirements—not from a generic ranking.

| Store      | Pagination and queries                                                                                                                                         | Offline behavior                                                                                                                  | Typical fit and tradeoff                                                                                                                                                 |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Firestore  | Cursor-based pagination and indexed query shapes; collection-group queries span collections with the same ID, but there is no general union or relational join | Client SDKs can cache reads and queue writes; persistent web caching must be enabled and conflict resolution is last-write-wins   | Strong for realtime client applications; less natural for joins, reporting, and flexible ad hoc queries                                                                  |
| MongoDB    | `skip`/`limit`, range-based pagination, and aggregation pipelines; multi-document transactions are available when required                                     | MongoDB itself does not provide a current first-party device-to-cloud sync service; Atlas Device Sync reached end of life in 2025 | Flexible document models and aggregation; schema, consistency requirements, and index discipline still matter                                                            |
| DynamoDB   | Pages use `LastEvaluatedKey`; queries are designed around partition and sort keys                                                                              | Offline-first behavior requires an additional client synchronization architecture                                                 | Predictable key-based access at high scale; poor fit for unplanned relational or faceted queries                                                                         |
| PostgreSQL | Offset and keyset pagination, joins, transactions, indexes, and rich filtering                                                                                 | No built-in client offline synchronization                                                                                        | A strong default for transactional domains, inventory, orders, payments, and reporting; large workloads may require replicas, partitioning, or other operational scaling |
| Supabase   | PostgreSQL query capabilities with managed APIs                                                                                                                | Realtime subscriptions are not an offline cache or conflict-resolution system                                                     | PostgreSQL with hosted auth, storage, and realtime features; offline-first behavior remains an application concern                                                       |

For e-commerce, PostgreSQL is often a sensible starting point because orders, inventory, and payments benefit from transactions and constraints. That is a default hypothesis, not a rule: measured access patterns and operational constraints decide.

When Firestore data lives in unrelated collections, a client-side merge or denormalized read model may be necessary; account for extra reads, partial failures, ordering, and consistency. DynamoDB similarly rewards designing tables and secondary indexes from known access patterns rather than adding arbitrary filters later.

Use an idempotency key for retryable commands whose effect must happen at most once from the caller's perspective, such as creating a payment. The server stores or recognizes the key within a defined scope and retention period and returns the prior outcome for a matching retry. Define how the system handles the same key with a different payload.

UUID v4 is random. UUID v7 includes an approximately time-ordered prefix plus randomness, which improves chronological locality for many database indexes; it does not by itself define business ordering, authorization, or idempotency.

Further reading: [web architecture fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview), [Martin Fowler's architecture guide](https://martinfowler.com/architecture/), [Firestore offline data](https://firebase.google.com/docs/firestore/manage-data/enable-offline), [MongoDB Device Sync end of life](https://www.mongodb.com/company/blog/innovation/future-proof-your-apps-with-mongodb-wekan), [DynamoDB pagination](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html), [PostgreSQL queries](https://www.postgresql.org/docs/current/queries.html), and [Supabase Realtime](https://supabase.com/docs/guides/realtime).

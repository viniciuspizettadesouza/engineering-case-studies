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

### HTTP semantics and contracts

Choose methods by semantics rather than endpoint naming. `GET` and `HEAD` are safe and idempotent; `PUT` and `DELETE` are idempotent but can change state; `POST` and `PATCH` are not inherently idempotent. A successful retry is safe only when the operation's semantics or an application idempotency key make it safe.

Use status codes consistently: `2xx` for success, `3xx` for redirection or cache validation, `4xx` when the request cannot be fulfilled as sent, and `5xx` for server-side failure. Common API distinctions include `400` malformed input, `401` missing or invalid authentication, `403` authenticated but forbidden, `404` absent resource, `409` state conflict, `422` semantically invalid content, `429` rate limiting, and `503` temporary unavailability. Return a stable machine-readable error code, a safe human message, field-level details when useful, and a correlation identifier; do not leak stack traces or secrets.

Representations need an explicit media type. Use content negotiation only when the product supports multiple representations deliberately. For caching, define freshness with `Cache-Control`, validate stale representations with `ETag`/`If-None-Match` or modification dates, and mark personalized responses `private` when they may be cached by the browser but not shared caches. `no-cache` requires validation before reuse; it does not mean “do not store.”

CORS is a browser-enforced rule for which origins may read cross-origin responses; it is not authentication or authorization. Credentialed requests require an explicit allowed origin rather than `*`, and origin-varying responses should include `Vary: Origin`.

### Pagination, retries, and evolution

Offset pagination is simple and supports jumping to a position, but large offsets can become expensive and concurrent writes can shift results. Cursor or keyset pagination uses a stable, indexed ordering and scales better, but the cursor must encode all fields needed to continue deterministically. Always define tie-breaking, direction, page-size limits, and what consistency clients can expect.

Set client and server timeouts from a real latency budget. Retry only transient failures, use bounded exponential backoff with jitter, honor `Retry-After`, and avoid multiplying retries across service layers. Rate limits should communicate scope and recovery behavior; load shedding should protect critical work rather than letting every request fail slowly.

Prefer backward-compatible API evolution: add optional fields, tolerate unknown response fields, and use deprecation periods with usage evidence. Version only when a breaking semantic change cannot be introduced compatibly. Contract tests can protect consumers, but they do not replace production observability or a migration plan.

## Scaling from observed bottlenecks

Start with the simplest architecture that satisfies current requirements, measure it, and add one capability when a demonstrated failure mode justifies its cost. The progression below follows the teaching sequence in video `EaXHfuHRWwg`: one application and one database, followed by application scaling, shared state, database scaling, caching, background work, and finally sharding. It is a diagnostic sequence, not a checklist every system must complete.

### Start simple and scale the application

A single application instance and relational database are often enough. When the application instance becomes the measured constraint, vertical scaling is usually the simplest first response: give the same deployment more CPU or memory without introducing distributed coordination.

When one machine is no longer sufficient or availability requirements demand multiple instances, run identical application instances behind a load balancer. The load balancer routes requests, but it also becomes critical infrastructure that needs a redundant failure plan. Horizontal scaling removes one application-machine ceiling but does not remove downstream limits.

### Make horizontally scaled servers stateless

Process-local session state breaks when consecutive requests reach different instances. Keep the application instances interchangeable by placing session or coordination state in a shared store, or by using another authentication design whose verification does not depend on one instance's memory.

Redis is the video's shared-session example, not a universal requirement. The important property is that any healthy instance can validate the request. The shared state service adds latency, capacity limits, security requirements, and another dependency whose failure may prevent authenticated work.

### Scale database access

More application instances can exhaust a database's connection limit before query execution is the bottleneck. A connection pool reuses a bounded set of database connections; PgBouncer is one PostgreSQL example.

If the database is busy after connection pressure is controlled, inspect query plans and indexes before adding infrastructure. For a genuinely read-heavy workload, read replicas can move eligible reads away from the primary while writes continue to use the primary.

Asynchronous replication introduces lag. A read sent to a replica immediately after a write may return an older value, so consistency-sensitive paths may need primary routing or an explicit read-after-write strategy. Define that choice per use case.

### Cache repeated expensive reads

Cache-aside avoids repeating an expensive read: check the application cache, read the source of truth on a miss, store the derived result, and return it. This is application/data caching, distinct from the HTTP representation caching described earlier.

A cached value can become stale. Define how it expires or is invalidated and how much staleness the product accepts. Consistency-sensitive decisions should use an authoritative value even when a cached projection is acceptable for display.

### Move deferrable work to a queue

Do not keep a request open for work that only needs to happen soon. After committing the synchronous result, enqueue a job and let a worker perform email delivery, media processing, analytics, or another slow external call. The user-facing contract must distinguish “accepted for processing” from “completed.”

A queue complements the broker semantics discussed in GraphQL and Messaging: this section explains why work leaves the request path, while that topic compares delivery models. Queue-backed work still needs visible failure states so a job is not silently abandoned.

### Shard only after simpler options are exhausted

Sharding partitions data across databases when one database can no longer satisfy storage or throughput needs. The video's teaching example hashes a user ID when necessary and uses a modulo rule to route the same user to the same shard. This demonstrates deterministic routing.

Choose a shard key from data distribution and dominant access patterns. Single-key operations can remain local, while global counts, searches, joins, and transactions may become cross-shard work. Sharding is difficult to reverse and migrate, so use it after query tuning, vertical scaling, pooling, replicas, caching, and workload changes are insufficient.

| Observed failure                               | Typical response                                              | New trade-off to manage                           |
| ---------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| One application instance is saturated          | Scale vertically, then add instances and a load balancer      | Load-balancer availability and distributed state  |
| Requests depend on one instance's memory       | Use shared or independently verifiable session state          | Extra latency and dependency availability         |
| Database connections are exhausted             | Bound and reuse connections with a pool                       | Pool sizing, wait time, and backpressure          |
| Read capacity is exhausted                     | Fix query/index issues, then route eligible reads to replicas | Replication lag and consistency-aware routing     |
| Expensive reads repeat                         | Use application caching for derived results                   | Staleness, invalidation, and cache failure        |
| Non-critical work delays a response            | Use a queue and workers                                       | Deferred completion and failed-job visibility     |
| One database cannot hold or serve the workload | Partition by a deliberate shard key                           | Hotspots, rebalancing, and cross-shard operations |

### Production refinements beyond the video

The following operational practices extend the video's conceptual progression:

- Size pools from database capacity and workload, choose PgBouncer's session or transaction semantics deliberately, and shed or queue load instead of allowing unbounded waits.
- Monitor replica replay lag and route reads by their consistency requirement rather than sending every read to a replica.
- Give cached values explicit TTL and invalidation policies, prevent cache stampedes for popular keys, and decide whether each path can fall back safely to the source of truth.
- Bound job retries, apply backoff with jitter, make retryable effects idempotent, retain terminal failures for inspection, and alert on stalled workers or growing queues.
- Choose shard keys that distribute both data and traffic, detect hot partitions, preserve locality for common queries, and plan rebalancing before adding capacity. Naïvely changing the divisor in modulo routing remaps many keys.
- Separate or independently protect Redis workloads when sessions, cached data, and background jobs have different availability, eviction, security, or capacity requirements.

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

### Modeling and indexes

Normalize data when duplicated facts would create update anomalies; denormalize deliberately when a measured read path justifies extra write and consistency work. Model ownership, nullability, uniqueness, referential integrity, retention, and deletion behavior explicitly. Document databases still need schema evolution and validation even when the database does not require one fixed shape.

Indexes exchange storage and write cost for faster reads. Build them around real filters, joins, and sort orders; column order matters in composite indexes. Inspect query plans and production-shaped data before adding an index, and remove redundant indexes cautiously. Avoid unbounded scans and application-side filtering when the database can apply a selective predicate.

### Transactions and concurrency

A transaction groups changes into one commit or rollback boundary. Isolation determines which concurrent effects a transaction can observe; stronger isolation can reduce anomalies while increasing retries, blocking, or coordination. Define how the application handles optimistic version conflicts, deadlocks, lock timeouts, and serialization failures. Never hold a database transaction open while waiting for a user or a slow external network call.

Cross-service workflows rarely share one database transaction. Use idempotent steps, durable state, outbox/inbox patterns, compensating actions, and reconciliation where appropriate. “Eventually consistent” still needs a bounded user experience, observable lag, and a repair path.

### Migrations, replication, and recovery

Make schema changes compatible with old and new application versions during rolling deployment. An expand-and-contract migration adds the compatible shape first, moves reads and writes, backfills with checkpoints, verifies the result, and removes the old shape only after rollback is no longer required.

Replication improves availability and read capacity but can reproduce accidental deletion or corruption, so it is not a backup. Define recovery point and recovery time objectives, automate backups, protect them separately, and test restoration. A backup that has never been restored is only an assumption.

Further reading: [video `EaXHfuHRWwg`: How Senior Engineers Actually Think About System Design & Architecture](https://www.youtube.com/watch?v=EaXHfuHRWwg), [PgBouncer](https://www.pgbouncer.org/usage), [PostgreSQL replication](https://www.postgresql.org/docs/17/warm-standby.html), [Redis cache-aside](https://redis.io/docs/latest/develop/use-cases/cache-aside/), [BullMQ retries](https://docs.bullmq.io/guide/retrying-failing-jobs), [BullMQ idempotent jobs](https://docs.bullmq.io/patterns/idempotent-jobs), [Notion's sharding account](https://www.notion.com/blog/sharding-postgres-at-notion), [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), [web architecture fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview), [Martin Fowler's architecture guide](https://martinfowler.com/architecture/), [Firestore offline data](https://firebase.google.com/docs/firestore/manage-data/enable-offline), [MongoDB Device Sync end of life](https://www.mongodb.com/company/blog/innovation/future-proof-your-apps-with-mongodb-wekan), [DynamoDB pagination](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html), [PostgreSQL queries](https://www.postgresql.org/docs/current/queries.html), and [Supabase Realtime](https://supabase.com/docs/guides/realtime).

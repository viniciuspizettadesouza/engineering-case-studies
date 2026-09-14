# GraphQL and Messaging

## Operating GraphQL safely

GraphQL clients can request nested data, so production services need controls based on authenticated callers and real cost—not only request counts.

- Apply rate limits at an API boundary.
- Use depth, breadth, alias, and complexity limits.
- Set resolver timeouts and downstream budgets.
- Prefer trusted or persisted documents where the product permits them.
- Batch compatible requests deliberately and avoid resolver-level N+1 queries.
- Cache at layers whose identity, authorization, and invalidation rules are understood.
- Monitor operation names, duration, errors, and estimated cost without recording sensitive variables.

Client caches such as normalized in-memory caches reduce repeat work but do not replace server authorization. Batching changes transport efficiency; it does not reduce the computational cost of each operation.

## Kafka and RabbitMQ

Kafka is a distributed event-log platform optimized for durable ordered partitions, replay, and high-throughput stream processing. Modern Kafka can use its built-in consensus mode and does not require ZooKeeper.

RabbitMQ is a message broker supporting protocols and routing models suited to work queues, request/reply, pub/sub, and reliable delivery. Exchanges route messages to queues; acknowledgements and dead-letter policies help manage processing failures.

Choose based on semantics rather than popularity:

| Concern                   | Event log                         | Message broker                      |
| ------------------------- | --------------------------------- | ----------------------------------- |
| Replay and long retention | Strong fit                        | Possible but not the central model  |
| Per-message routing       | Limited by topic/partition design | Rich exchange and routing options   |
| Consumer progress         | Offsets                           | Queue acknowledgements              |
| Typical use               | Event streams and data pipelines  | Commands, jobs, and routed messages |

Both require decisions about idempotency, retries, poison messages, schemas, ordering, backpressure, observability, and data retention. “Exactly once” is always scoped; design consumers so repeated delivery is safe.

## Pub/sub exercise

A useful TypeScript exercise is a small publish/subscribe API with `subscribe`, `unsubscribe`, and typed callbacks. Define what happens when a subscriber throws, subscribes during delivery, or unsubscribes twice. Tests should make those semantics explicit.

Further reading: [GraphQL security](https://graphql.org/learn/security/), [Kafka documentation](https://kafka.apache.org/documentation/), and [RabbitMQ tutorials](https://www.rabbitmq.com/tutorials).

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

## Server-Sent Events and WebSockets

Server-Sent Events (SSE) and WebSockets both support real-time updates, but they solve different communication problems.

| Concern      | SSE                                                       | WebSockets                                                                           |
| ------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Direction    | Server to client                                          | Client and server in both directions                                                 |
| Transport    | Long-lived HTTP response                                  | WebSocket connection after an HTTP handshake                                         |
| Browser API  | `EventSource`                                             | `WebSocket`                                                                          |
| Reconnection | Built into `EventSource`                                  | Implemented by the application                                                       |
| Complexity   | Lower                                                     | Higher                                                                               |
| Typical uses | Notifications, progress, dashboards, and output streaming | Chat, multiplayer games, collaborative editing, live cursors, and trading interfaces |

### SSE

The browser opens an HTTP connection with `EventSource`:

```js
const events = new EventSource('/api/events')

events.onmessage = (event) => {
  console.log(event.data)
}
```

The server keeps the response open and sends events over time:

```text
Browser ──open connection──► Server
Browser ◄──── event ──────── Server
        ◄──── event ────────
        ◄──── event ────────
```

Communication on that connection is one-way. The browser can still send commands through ordinary HTTP requests, while the server publishes their results as SSE events:

```text
Browser ── POST /message ──► Server
Browser ◄──── SSE event ──── Server
```

This pattern fits notifications, job progress, live dashboards, and one-way streaming such as incremental AI output. `EventSource` also reconnects automatically if the connection drops. When a stream must begin with a request body, custom headers, or richer request control, a streaming `fetch` response may be a better HTTP-based choice than `EventSource`.

### WebSockets

WebSockets establish a persistent, bidirectional connection:

```js
const socket = new WebSocket('wss://example.com/ws')

socket.onmessage = (event) => {
  console.log(event.data)
}

socket.send('hello')
```

After the connection is established, either side can send messages independently:

```text
Browser ◄──────── WebSocket ────────► Server
        ◄───────────────────────────►
```

This is useful when both sides communicate frequently or with low latency, as in chat, multiplayer games, collaborative documents, live cursor positions, and trading applications. The application must define reconnection, liveness checks, message schemas, authorization, backpressure, and behavior when clients fall behind.

### Selection rule

Use normal request/response HTTP when the client asks for a result, SSE when updates primarily flow from server to client, and WebSockets when both sides need continuous communication:

```text
HTTP        Client ── request ──► Server
            Client ◄─ response ── Server

SSE         Client ── connect ──► Server
            Client ◄── update ─── Server
                   ◄── update ───

WebSocket   Client ◄────────────► Server
                   ◄────────────►
```

For a typical React and Node.js application, start with SSE when communication is predominantly one-way. Choose WebSockets when the product actually requires frequent two-way messages; their flexibility also introduces more connection-management work.

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

Further reading: [GraphQL security](https://graphql.org/learn/security/), [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), [The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [Kafka documentation](https://kafka.apache.org/documentation/), and [RabbitMQ tutorials](https://www.rabbitmq.com/tutorials).

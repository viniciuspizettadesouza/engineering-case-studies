# Web Performance and SEO

Performance work begins with user journeys and measurements, not a list of optimizations. Test representative devices and networks, then connect technical metrics to whether users can see, understand, and operate the page.

## Core Web Vitals

- **Largest Contentful Paint (LCP)** measures loading performance.
- **Interaction to Next Paint (INP)** measures interaction responsiveness.
- **Cumulative Layout Shift (CLS)** measures visual stability.

First Contentful Paint and Total Blocking Time remain useful diagnostic metrics. Time to Interactive is no longer a Core Web Vital, and First Input Delay was replaced by INP.

## Common improvements

- Split code at meaningful route or feature boundaries.
- Lazy-load non-critical modules and media.
- Remove unused code through tree shaking and dependency review.
- Serve appropriately sized, compressed images in modern formats.
- Cache immutable assets and use a content delivery network where geography warrants it.
- Reduce long main-thread tasks and unnecessary component rendering.
- Virtualize genuinely large lists.
- Use server rendering or static generation when it improves the product's discovery or loading needs.
- Prevent layout shifts by reserving space for media and dynamic content.
- Measure bundles with build visualizers and runtime behavior with browser developer tools.

Compression such as Brotli or gzip reduces transfer size, but not parse or execution cost. HTTP/2 and newer protocols improve multiplexing and connection behavior; they do not make oversized payloads free.

Browsers typically limit parallel HTTP/1.1 connections per origin, so many dependent requests can queue and each connection processes responses in order. HTTP/2 multiplexes streams over one connection and removes HTTP/1.1 application-layer head-of-line blocking, although packet loss can still delay streams sharing the same TCP connection. HTTP/3 changes the transport to reduce that cross-stream effect. Protocol upgrades help request concurrency, but should follow measurement and do not replace aggregation when the client/server boundary is wrong.

## Rendering and discovery

SEO depends on useful content, stable links, metadata, crawlability, and performance. Provide unique page titles and descriptions, semantic heading structure, canonical URLs where relevant, and meaningful link text. Ensure server-rendered or statically emitted content is available when crawlers or link previews cannot execute the application fully.

The critical rendering path covers the work needed to turn HTML, CSS, and JavaScript into pixels. Use browser traces and field data to locate real bottlenecks before selecting an optimization.

Further reading: [Web Vitals](https://web.dev/articles/vitals), [critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path), and [Google Search essentials](https://developers.google.com/search/docs/essentials).

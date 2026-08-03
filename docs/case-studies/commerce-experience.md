# Commerce Experience — MVP Brief

Status: complete.

## Fictional premise

An invented vehicle marketplace helps buyers discover a vehicle and submit a reservation request. Public vehicle-commerce sites inform only the broad catalogue-to-reservation sequence. Vehicles, specifications, locations, prices, availability, copy and branding are original fictional fixtures.

## Primary user goal

A buyer can find a suitable fictional vehicle, understand its key details, choose reservation parameters and submit a reviewed reservation request.

```text
Search catalogue
        ↓
Choose a vehicle
        ↓
Enter reservation details
        ↓
Review request
        ↓
Simulated confirmation
```

## MVP scope

- a small responsive vehicle catalogue;
- limited filters for location, sleeping capacity and price range;
- vehicle detail with fictional specifications and availability;
- reservation dates, pickup location and buyer contact fields;
- inline validation and an accessible error summary;
- review and edit before submission;
- deterministic success, availability-conflict and service-error outcomes;
- local analytics event contracts with no external transmission;
- image and bundle-size performance budgets.

## Acceptance criteria

- filters are reflected in a shareable local route or query state;
- empty results explain how to recover;
- selecting a vehicle carries its identifier into the reservation form;
- unavailable dates prevent submission and preserve the buyer's other entries;
- the review clearly separates vehicle, schedule and contact information;
- confirmation uses a fictional reference and states that no payment or real reservation occurred;
- the critical catalogue-to-confirmation journey is covered by Playwright.

## Out of scope

- real vehicle inventory, dealership feeds or availability;
- maps, finance offers, insurance, payments or checkout;
- production accounts, messaging or analytics;
- copied vehicle descriptions, photography or commercial data;
- a claim that the demo is affiliated with a real marketplace.

## Later increments

Candidate additions after all five MVPs exist include comparison, saved searches, localisation, image-CDN experiments and a payment boundary with a test-only adapter.

## Delivered architecture

The executable study lives under `apps/portfolio/src/case-studies/commerce-experience` and follows the repository's route, component, domain, fixture and service boundaries. Six fictional vehicles are readonly TypeScript fixtures. Filtering and reservation rules are framework-independent, while browser storage is accessed only through a local repository adapter.

Catalogue filters use URL query parameters so a filtered view can be shared and revisited. Reservation drafts and confirmations remain in the current browser. The UI exposes loading, empty, service-error, availability-conflict, submission-error and success states without imitating a production API.

The typed analytics contract currently permits only these events:

- `catalogue_filter_applied`, with the three non-sensitive filter values;
- `vehicle_viewed` and `reservation_started`, with a fictional vehicle identifier;
- `reservation_submitted`, with fictional vehicle and reservation identifiers.

The recorder is deliberately memory-only. It has no network transport, persistence, cookies, user identifier or contact fields.

## Performance budget

The catalogue and detail experience has the following lab budgets:

- no individual vehicle image over 20 KB and no more than 60 KB of unique vehicle imagery for the catalogue;
- explicit image dimensions, async decoding and lazy loading below the first image;
- production JavaScript below 180 KB gzip and CSS below 20 KB gzip for the current static application;
- target Largest Contentful Paint below 2.5 seconds on a desktop broadband profile and below 3.5 seconds on a representative mid-range mobile profile.

The original SVG illustrations are intentionally small and local. Production build output is checked during repository validation; Web Vitals targets should also be checked in a repeatable throttled browser lab before future imagery or dependencies are accepted.

## Test evidence

Vitest covers combined catalogue filters, empty results, reservation validation, date overlap boundaries, price calculation, analytics contracts and browser-local draft/confirmation persistence. Playwright covers the critical catalogue-to-confirmation journey in desktop Chromium and the Pixel 7 project, including URL filters, an availability conflict, preserved contact data, a recoverable submission failure and the simulated confirmation.

## Privacy and threat boundary

This is a static demonstration, not a secure reservation system. It has no authentication, server enforcement, dealer connection, inventory lock, payment processor or trusted audit record. A visitor could inspect or alter fixtures and local storage, forge a confirmation reference, replay submission, or enter real contact information despite the warning. None of those browser-local records should be treated as authoritative.

The form requests only name, email and phone because those fields make the contact step demonstrable. Users are explicitly asked to enter fictional values. A production implementation would require server-side validation, retention rules, consent and privacy review, abuse controls, idempotency, authoritative availability, secure payment boundaries and protection against concurrency conflicts.

## Limitations

- dates and availability are fixed fictional fixtures rather than a live calendar;
- estimates use whole-day arithmetic and one daily price with no tax, deposit or extras;
- the confirmation is stored only in the submitting browser and is not fulfilment;
- the analytics contract proves event shape, not production governance or delivery;
- illustrations and performance budgets provide a controlled baseline rather than a photographic production catalogue;
- automated accessibility checks do not replace assistive-technology testing.

## What I would do differently today

For a production marketplace, I would start with an authoritative server-side availability and reservation-hold model rather than browser state. I would make submission idempotent, model time zones and collection cut-offs explicitly, keep contact data behind a short retention policy, and validate the analytics schema in a privacy-reviewed collection gateway. I would also measure real-user performance by route and image variant before introducing a CDN or richer media.

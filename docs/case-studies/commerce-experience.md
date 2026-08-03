# Commerce Experience — MVP Brief

Status: planned.

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

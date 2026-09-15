# Specification: Signpost

**Version:** 0.1 - initial design, September 15, 2026. Superseded by [the revised specification](specification.md).

**App description:** Signpost helps engineers at fictional Alder Systems find who owns an internal service, understand its purpose, and reach the runbook and on-call destination. It is a small, read-only catalog supporting the [business case](business-case.md).

## Style and Theme

Calm and professional. Use the existing Bootstrap base, a light background, dark text, blue actions, and simple service cards. Keep names and teams more prominent than optional architecture images.

## User Scenarios

1. An engineer responding to a Payments API alert browses Services, opens its detail page, identifies the Commerce team, and follows operational links.
2. A new engineer filters the catalog by team and service tier to understand their part of the system.
3. An engineer pins frequently visited services and opens them again from Home.

## Requirements

### Functional Requirements

1. Keep Home (`#/`), Services (`#/items`), Service detail (`#/items/:id`), and About (`#/about`).
2. Home offers one-click access to all services and pinned services.
3. Load the catalog from `items-template.csv`; show one card per service with name, description, tier, owner, optional image, and a detail link.
4. Support case-insensitive text search, team and tier filters, and a pinned-only view.
5. Detail shows service purpose, owner, tier, repository, runbook, and on-call destination.
6. Pin and unpin services without changing shared catalog data; save preferences in the browser.
7. Explain loading, empty results, load errors, and unknown service IDs.
8. Catalog corrections happen through repository review, outside the application.

### Key Data

Retain `id`, `name`, `description`, `category`, `image_url`, and `location`. Use category for service tier and location for the owning team. Add `repository_url`, `runbook_url`, and `on_call_url`.

## Success Criteria

1. Reach Services from Home in one click and a service detail in one further click.
2. Identify the owner and runbook for a named service without help, targeting 30 seconds.
3. Combine team and tier filters successfully and recover from no results.
4. Pinned services remain available after a normal refresh.
5. Data failures show a useful message instead of a blank page.

## Assumptions

The company, service records, and business-case estimates are fictional. The public prototype uses sample data only. The eventual internal catalog serves approximately 55 engineers and 70 services. Keep the existing Vue, Vue Router, Bootstrap, and Papa Parse starter, with no server-side application or database. Links lead to existing tools. A catalog entry does not establish whether a production change is safe.

## Questions for research and evaluation

- Do people need the current on-call person's name, or a reliable link to the schedule?
- How will someone judge whether ownership information is current?
- Should searching and filtering survive a visit to a detail page?
- How do we keep internal service information private while demonstrating the project publicly?

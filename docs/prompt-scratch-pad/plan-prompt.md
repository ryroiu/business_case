# Plan drafting brief — Signpost

Use `docs/design/specification.md` v0.2 as the source of current requirements, with the business case for context. Fill `docs/design/plan.md` using the headings and table structure in `docs/design/reference/plan-template.md` and the guidance in `plan-guide.md`.

Before drafting, read the current application, CSV, README, and historical browser checks. This is a continuation of the Signpost prototype, not an untouched starter. Keep no-build Vue 3, Vue Router 4, Bootstrap, Papa Parse, the four routes, and CSV data. Keep the catalog read-only; pins stay in the browser. Do not import the Week 4 example app's login, database, Python server, or LLM features.

Explain the approach in two to four plain-language sentences. List the actual stack separately. Give every meaningful decision a stable ADR ID, requirement references, a real alternative, and a specific tradeoff. List components by purpose. Separate external dependencies from unverified assumptions; give each risk likelihood, impact, mitigation, and an owner.

Sequence work from the existing baseline, checking data quality and information trust before normal flows and presentation. Distinguish the eight-service fictional public demo from the possible 70-service internal release. Preserve the specification's corrections to the business case about protected hosting, schedule links, and service safety.

Keep real-user lookup/comprehension outcomes unverified. Include an honest Review & Approval section with human approval pending. Prepare a complete draft for review; do not sign on anyone's behalf or execute a new implementation phase.

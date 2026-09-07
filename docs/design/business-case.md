# Business Case — Signpost (Internal Service Catalog)

**Submitted to:** Engineering Systems Review Committee, Alder Systems
**Submitted by:** IT / Developer Experience
**Date:** September 7, 2026
**Request type:** New system — discretionary

> *Alder Systems is an illustrative mid-market B2B SaaS company (180 employees; 55 engineers across 9 teams; ~70 internal services) used to ground this business case in concrete numbers.*

## 1. Problem / Opportunity

Engineers at Alder Systems cannot reliably answer three questions about our ~70 internal services — who owns this, is it safe to change, and who do I page at 2am — because the answers live in tribal knowledge, a stale wiki, and Slack archaeology rather than in any single system of record. That gap costs an estimated 3,000 engineering hours a year in avoidable lookup and interruption, slows incident response, and concentrates dangerous key-person risk in the two engineers who happen to remember everything.

## 2. Proposed Solution

Build **Signpost**, a lightweight internal catalog of every service Alder Systems runs. An engineer opens it, browses the full list of services, filters to the tier or team they care about, and clicks one to see who owns it, what it does, where its runbook lives, and who is on call. It is deliberately read-only and deliberately small: it answers questions, it does not manage deployments, provision infrastructure, or replace any existing tool. Engineers can pin their own team's services so their day-to-day set is one click away. The catalog's contents live alongside our code and change through the same review process everything else does, so the people who own a service are the people who correct its entry.

## 3. Options Considered

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **Option A** — Status quo | Keep relying on the wiki, Slack, and asking around. | No cost, no project, no change management. | Problem compounds as we add 14 engineers and more services next year; key-person risk unaddressed; the ~$71K/yr of lost time keeps accruing. |
| **Option B** — Self-host Backstage | Deploy the open-source Spotify developer portal. | Mature, extensible, large community; far more capable than we need today. | Requires PostgreSQL, a Node/React/TypeScript plugin skillset we do not have in depth, and a standing owner (commonly 0.5–1 FTE) to keep upgraded. Heavy machinery for 70 services. Still requires the same catalog data-collection work — the genuinely hard part — before it returns any value. |
| **Option C** — Buy a commercial developer portal | License a hosted internal developer platform. | Vendor-supported; fastest feature depth; no maintenance burden. | ~$16,500/yr recurring at 55 seats, growing with headcount. Adds a 3–4 month procurement, security review, and data-processing agreement to the schedule. Buys many features we have no near-term need for. Same data-collection prerequisite as Option B. |
| **Option D (recommended)** — Build a lightweight catalog | A small read-only single-page web app, served as static files from existing internal hosting, reading a version-controlled data file. | Uses skills and infrastructure we already have; no license cost, no procurement, no vendor security review; ships in ~10 weeks; the data file is reviewed like code, so ownership data stays accurate by the mechanism engineers already follow. | Purpose-built and narrow — no plugin ecosystem. Value depends entirely on the catalog staying current; a stale catalog is worse than none. Would need reassessment if we grow past a few hundred services. |

**Note on Options B and C:** the recurring license avoided under Option D is *not* counted as a benefit in §5. It would only be "saved" relative to Option C, not relative to the status quo baseline, and counting it as a benefit against Option A would inflate the return.

## 4. Feasibility

| Type | Assessment |
|------|------------|
| **Operational** — will people actually use/support this? | **Favorable, with one real risk.** These questions are already asked daily, so we are formalizing existing demand rather than creating new behavior. Because Signpost is read-only, no one changes how they work and no training is required beyond a link in the onboarding guide. The genuine risk is not rejection — it is decay: a catalog that drifts out of date becomes distrusted and then abandoned. Mitigation is structural rather than motivational: each service carries a named owner of record, the data file sits in a repository whose changes require owning-team review, and a single named steward runs a quarterly ownership attestation. Budget for that stewardship is in §5 rather than assumed as goodwill. |
| **Technical** — can we build it with what we have/can get? | **Low risk.** The application is a static single-page app — no server, no database, no authentication, no build pipeline — deployed to internal static hosting we already operate. It uses libraries our front-end engineers already work in daily. The data model requires no schema design: the six fields the starter template already carries (`id`, `name`, `description`, `category`, `image_url`, `location`) map directly onto service slug, service name, purpose, tier, architecture thumbnail, and owning team, with two or three additive fields for the detail view. There is no integration with production systems and therefore no production blast radius. |
| **Economic** — does the payoff justify the cost? | **Yes, with margin.** $25,650 to build against ~$71,200/yr in steady-state recovered time: payback in roughly 15 months, 244% six-year ROI, positive NPV of ~$206,700 at an 8% discount rate. See §5 — including the sensitivity test, which is the part worth arguing with. |
| **Schedule** — can it be done in a useful timeframe? | **~10 weeks, and the schedule is the strongest argument for Option D.** Two weeks specification, four weeks development, three weeks catalog seeding running in parallel, one week user acceptance testing. No procurement cycle, no third-party security review, and no data-processing agreement — the items that would add three to four months to Option C. The critical path is catalog seeding, not code: interviewing nine teams to document 70 services is the long pole, and it is work Options B and C would also require. |

## 5. Costs & Benefits

All labor is valued at a **$95/hour fully-loaded engineering rate** (salary plus ~30% burden, at 2,080 hours).

**Costs** (one-time + ongoing):

| Item | One-time | Ongoing/year |
|------|----------|----------------|
| Systems analysis & specification (40 hrs) | $3,800 | — |
| Development (120 hrs) | $11,400 | — |
| Catalog seeding — interview 9 teams, document 70 services (60 hrs) | $5,700 | — |
| Testing & user acceptance (30 hrs) | $2,850 | — |
| Documentation & rollout (20 hrs) | $1,900 | — |
| Data stewardship & quarterly ownership attestation (96 hrs/yr) | — | $9,120 |
| Bug fixes & minor enhancements (40 hrs/yr) | — | $3,800 |
| Internal static hosting | — | $120 |
| Software licenses | $0 | $0 |
| **Total** | **$25,650** (270 hrs) | **$13,040** |

**Benefits** (tangible + intangible):

| Benefit | Tangible ($/time saved)? | Notes |
|---------|-----------------------------|-------|
| Reduced service-discovery time | **Yes — $60,600/yr** | 55 engineers × 70% adoption = 38.5 effective users, each recovering ~22 min/week across 46 working weeks = 638 hrs/yr × $95. Deliberately conservative: it assumes one avoided Slack round-trip per engineer per week, not a transformed workflow. |
| Faster onboarding for new engineers | **Yes — $10,600/yr** | 14 planned engineering hires × 8 hrs each of "learn the landscape" time removed × $95. |
| Faster incident response | **No — intangible** | ~22 sev-2+ incidents/yr, ~12 min each spent identifying the owning team and locating the runbook. The honest labor figure is under $2,000/yr, so it is not claimed as tangible. Its real value is reduced customer-facing downtime, which we cannot defensibly price. |
| Reduced key-person risk | **No — intangible** | Service knowledge currently concentrated in two engineers becomes durable and organizational rather than personal. |
| Accurate ownership data for next year's service decomposition | **No — intangible** | That effort is blocked on knowing what depends on what. Signpost is a prerequisite, not a nice-to-have, for it. |
| **Total tangible, steady state** | **$71,200/yr** | Years 2+. Year 0 is modeled at 35% and Year 1 at 85% to reflect build time and adoption ramp. |

**Cash flow** (Year 0 = year development begins; ongoing costs grow ~5%/yr):

| Year | Costs | Cumulative costs | Benefits | Cumulative benefits |
|------|-------|------------------|----------|---------------------|
| 0 | $35,430 | $35,430 | $24,900 | $24,900 |
| 1 | $13,040 | $48,470 | $60,500 | $85,400 |
| 2 | $13,700 | $62,170 | $71,200 | $156,600 |
| 3 | $14,400 | $76,570 | $71,200 | $227,800 |
| 4 | $15,100 | $91,670 | $71,200 | $299,000 |
| 5 | $15,900 | $107,570 | $71,200 | $370,200 |

**Payback period:** ~15 months from project start. Cumulative benefits overtake cumulative costs approximately 2.7 months into Year 1.

**ROI:** **244%** over six years — ($370,200 − $107,570) ÷ $107,570.

**Net present value:** **~$206,700** at an 8% discount rate ($299,300 present value of benefits less $92,600 present value of costs).

**Sensitivity — the assumption worth challenging.** The return is dominated by one estimate: 22 minutes per engineer per week. If that estimate is wrong *by half*, steady-state benefits fall from $71,200 to $40,900/yr, six-year ROI falls from 244% to **98%**, and payback moves from ~15 months to **~24 months** — still inside a three-year payback policy and still comfortably NPV-positive. The proposal does not depend on the optimistic case being right. Conversely, the return is high mainly because the build is inexpensive relative to a 55-engineer labor base, not because the per-engineer savings are aggressive.

*(See Toolkit Part C — Financial Analysis Tools document for payback, ROI, and present value formulas.)*

## 6. Priority & Urgency

This is a **discretionary project** in the Chapter 2 sense — no regulation, contract, or vendor end-of-life compels it, and the committee could defer it without immediate consequence. It should nonetheless be prioritized now, for three reasons that are time-bound rather than perpetual:

1. **Headcount growth makes the problem more expensive every quarter we wait.** Fourteen engineering hires are planned for next year, roughly 25% growth. Onboarding cost scales directly with how much of our architecture is undocumented, and each new engineer also becomes a new source of interruptions for the two people who hold the knowledge.
2. **Next year's service decomposition is blocked on this data.** That effort cannot safely begin without accurate ownership and dependency information. Building the catalog after decomposition starts means documenting a moving target — materially harder and less accurate than documenting the system as it stands today.
3. **Key-person risk is real and unhedged.** Two engineers hold most of the institutional knowledge about our service topology. If either leaves before it is written down, the catalog-seeding effort becomes significantly more expensive and less complete.

**Cost of waiting:** roughly $71,200/yr in continued lost time, plus the compounding cost of cataloging a larger and faster-moving estate later. Deferring one year does not preserve the option at today's price — it raises the price.

## 7. Recommendation

Approve **Option D** — build Signpost as a lightweight internal service catalog — and release $25,650 and 270 engineering hours for a 10-week effort, with a go/no-go checkpoint at the end of catalog seeding in week 7.

## 8. Approval

| Role | Name | Date | Decision |
|------|------|------|----------|
| Sponsor — VP, Engineering | | | Go / No-go |
| Director, Developer Experience | | | Go / No-go |
| Systems Review Committee Chair | | | Go / No-go |

---

### Primary sources
- *Systems Analysis and Design*, 10th ed. (Cengage, 2017) — Ch. 2 "Analyzing the Business Case" and Toolkit Part C "Financial Analysis Tools"

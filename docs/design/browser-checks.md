# Signpost - browser verification

Run: September 15, 2026. Headless local Chrome, 1440 × 1050 and 390 × 844 viewports. These are implementation checks, not participant observations or a complete accessibility audit.

- PASS: Home to catalog and eight service cards
- PASS: Combined search, team, and tier filters
- PASS: Detail shows owner and operational destinations
- PASS: Demo runbook opens a clearly fictional sample and returns
- PASS: Pin from detail, Home, and refresh persistence
- PASS: Filters survive detail return
- PASS: No results and clear recovery
- PASS: Pinned-only filter and unpin
- PASS: Overdue entry and missing links
- PASS: Unknown service ID recovery
- PASS: Keyboard navigation and labels
- PASS: Mobile catalog and detail have no horizontal overflow
- PASS: Network failure and Retry recovery
- PASS: Valid empty catalog
- PASS: Duplicate IDs fail clearly
- PASS: Missing headers and malformed CSV fail clearly
- PASS: Unsafe destinations unavailable and CSV text stays inert
- PASS: Future review dates are unverified
- PASS: Storage blocked retains session pins and explains limitation
- PASS: Malformed pin storage does not break catalog
- PASS: Observed 70-record response 12 ms; local synthetic fixture, not a user test
- PASS: 70-service filter response under 200 ms after load
- PASS: No uncaught browser page errors

## Published-site verification

On September 15, 2026, GitHub Pages reported the prototype publication as built. A browser check at https://ryroiu.github.io/business_case/ verified eight service records, search, detail navigation, direct service-link refresh, and the fictional sample runbook with no uncaught page errors. The required specification URL displayed “Specification: Signpost” and version 0.2.

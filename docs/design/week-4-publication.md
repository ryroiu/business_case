# Week 4 publication verification

**Checked:** September 21, 2026.

GitHub Pages reported revision `7fb24af8c9e6638a57545a545e5a2990a769c608` as built. The three public Markdown URLs below returned HTTP 200, and their downloaded bytes matched the local files exactly.

- Plan: https://ryroiu.github.io/business_case/docs/design/plan.md
- Tasks: https://ryroiu.github.io/business_case/docs/design/tasks.md
- Reflection draft: https://ryroiu.github.io/business_case/docs/design/week-4-reflection.md

GitHub Pages serves these files as `text/markdown; charset=utf-8`. The in-app browser treated Markdown navigation as a download instead of displaying the text. An early attempt while deployment was still running showed a cached 404; the completed-publication HTTP checks above confirmed that the files are present.

A [browser-readable companion](week-4.html) contains the same plan, tasks, and reflection with links to the required originals and their GitHub source views. It is a static rendering of the September 21 v0.2 documents and should be regenerated if those documents change. Use it for formatted reading when a browser downloads the Markdown originals.

| Document | SHA-256 of the verified Markdown content |
| --- | --- |
| `plan.md` | `72fe4b9611fe5a2fbdfb619e8c171e9122e5cf814e6f2bc2c7f6380db101a743` |
| `tasks.md` | `b4de33cebe26a233653c78bd5b83f9889368c760edb8b5a9bf2435a30bddc19d` |
| `week-4-reflection.md` | `efb4af7143ad4b90717898640f108dea8bda77027851499c5d641e9ddb806566` |

These publication checks concern document availability. They do not mark the future implementation tasks Done or constitute human approval of the plan.

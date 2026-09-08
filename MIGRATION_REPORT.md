# Migration report

## Content inventory and mapping (before implementation)

Source: EliseEgkart/portfolio_Hyeongjin_Kim, local clean checkout.
Reference: hongsheng-Z/academicpages.github.io at 0a00218447a6e15136d3ea3f31f60f149458e673.
The attached brief supplies current Hanyang identity and research direction; the user's direct corrections take priority.

| Source | Destination | Inventory |
| --- | --- | --- |
| index.html | / | Research identity, interests, selected work, education/contact |
| publications/index.html | /publications/ and _publications/ | 3 journal articles, 2 KICS presentations, 5 real images |
| projects/index.html | /projects/ and _portfolio/ | 12 existing projects, plus user-identified smart stroller |
| awards/index.html | /honors/ | 11 competitive awards, team roles and evidence |
| images/awards/14593–14596.jpg | /honors/ academic recognition | Recommendation, dean's commendation, B.Eng. diploma, INU SURPRISE certificate |
| experience/index.html | /experience/ | ICONS, UNITA, Hyundai, entrepreneurship and concise TA record |
| resume/index.html | /cv/ | Inline PDF, open/download controls and fallback |
| Academic_CV/ | /files/Hyeongjin_Kim_CV.pdf and legacy URL | Retain and reconcile LaTeX/PDF |
| No existing research page | /research/ | Four research themes and explicitly ongoing work from brief |

All five requested numbered assets exist and have been inspected. No missing numbered assets.
The original HTML/CV/assets were backed up outside the deployment tree at /tmp/hyeongjin-before-academic-migration.tar.gz.

## Conflicts identified

- CV still says undergraduate / incoming M.S.; brief supplies current integrated M.S.–Ph.D. status.
- SFL journal: website has wrong author order; CV title ends in Computing rather than Platform.
- 2025 IoTJ title: singular Smart City in DOI record versus plural in CV.
- KICS 2024: conflicting Sep/Oct dates, canonical DBpia record says November.
- KICS 2025: old October date conflicts with November conference photograph; duplicate DBpia URL actually points to the 2024 paper.
- Graduation-project evidence filename says 2025, but certificate explicitly says June 2, 2026.
- Recent projects and ICONS have end dates in the website but stale Present in CV.
- TA dates conflict between website and CV; prefer specific website terms, record correction.
- Entrepreneurship activity and machine project use different periods; preserve activity/project distinction.

## Implemented site

- **Foundation:** actual Sass and layout/include conventions from the requested Academic Pages repository, preserving the MIT license. The author sidebar, masthead, single/archive hierarchy and Jekyll collections remain recognizable. Layout markup was simplified to remove the stock blogging/teaching/comment/share controls and make navigation accessible.
- **Pages:** `/`, `/research/`, `/publications/`, `/projects/`, `/honors/`, `/experience/`, `/cv/`, and `/404.html`.
- **Collections:** 5 `_publications/` files (3 journal articles and 2 conference presentations); 13 `_portfolio/` project files, exposed as `/projects/…/`. Four selected projects appear on the homepage. Following the user's regrouping request, Projects has four Robotics & autonomous systems cards, seven Embedded systems & physical computing rows (including Resting Drone), and two Additional engineering projects rows (Virtual Gesture Interface Board and Unity Game Development). The `group` field controls the archive grouping and detail-page category.
- **Removed:** the Colorlib HTML/CSS/JS/font bundle, its demo article and animations, unused decorative backgrounds/logos, old route HTML, and all stock Academic Pages demo pages/entries. No Blog, Teaching, Talks, or Guide navigation/collection is enabled. Concise real TA service remains in Experience and the CV.
- **Research:** four themes and a clearly marked ongoing UAV surveillance-barrier description, using only the high-level scope supplied by the brief. No tentative paper title, unpublished results, target venue, or private diagram was introduced.
- **Profiles:** public email, GitHub, YouTube, and the first author's ORCID, verified in all three DOI deposits. LinkedIn/Google Scholar/IEEE author profile were omitted because an exact profile was not supplied or verified. No lab name or advisor was invented for Hanyang.
- **CV:** searchable 4-page PDF regenerated from `Academic_CV/main.tex`, with corrected identity, publications, dates, stroller description, and academic recognition. The original viewing pattern remains: native `<object>` PDF, Open PDF, Download CV, nested fallback, and a persistent direct-open link. The PDF was not converted to screenshots for the website. Source typography was retained, long heading tables were made wrappable, and the first project section now begins on a new page.

## Source-grounded corrections

Primary DOI records are stored in `docs/metadata/`. The DOI content-negotiation response is a publisher-deposited Crossref record, not a scraped third-party citation. These records were retrieved on September 8, 2026.

| Record | Old discrepancy | Final record and evidence |
| --- | --- | --- |
| Hanyang identity | Undergraduate / incoming M.S. / M.S. Candidate | Researcher, Electrical Engineering; integrated M.S.–Ph.D. program, September 2026 onward. Source: supplied brief, aligned with the session date. |
| Bachelor's degree | Website/CV use B.S. | B.Eng.; the inspected English diploma explicitly confers Bachelor of Engineering, August 21, 2026. |
| TNSM 2026 | Incorrect singular venue name and asserted exact March day | **IEEE Transactions on Network and Service Management**, vol. 23, pp. 3268–3278, **2026**. DOI deposit supplies year-level publication precision; exact title and order preserved. [DOI](https://doi.org/10.1109/TNSM.2026.3673324). |
| SFL–DQN 2026 | CV says Edge Computing; website places Hyunbum Kim second; March date reflects earlier record | Title ends **Distributed IoT Edge Platform**. Authors: Hyeongjin Kim, Jalel Ben-Othman, Byungju Lee, Hyunbum Kim. Final issue: vol. 13, no. 11, pp. 23495–23505, **June 1, 2026**. [DOI](https://doi.org/10.1109/JIOT.2026.3670351). |
| Resting-drone surveillance 2025 | Smart Cities in CV; inconsistent capitalization | Exact publisher title ends **IoT-Based Smart City**, authors Hyeongjin Kim, Hyunbum Kim, Mohsen Guizani; vol. 12, no. 16, pp. 33995–34006, **August 15, 2025**. [DOI](https://doi.org/10.1109/JIOT.2025.3577655). |
| KICS 2024 | September on website, October in CV; paraphrased Korean title | Exact Korean title from proceedings; **November 2024**, pp. 1101–1102; author order unchanged. [Official proceedings distribution record](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12035067). |
| KICS 2025 | October date; the 2024 DBpia article duplicated as its link | **November 21, 2025**, oral session **19C-1**, printed program p. 64. Exact title/authors verified against the [KICS official program](https://conf.kics.or.kr/2025f/downloadProgram?type=program). The user later provided the [correct DBpia proceedings record](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12566863), which confirms **pp. 455–456**. Proceedings, program, website citation, and CV are now linked consistently. No DOI is asserted. |
| Graduation Project Grand Prize | Filename/modal caption say 2025 | Certificate explicitly says **June 2, 2026**; asset renamed accordingly. Team-leader role preserved. |
| H-Mobility Outstanding Learner | Website/CV and filename say July 2025 | Certificate explicitly says **August 25, 2025**; website, CV and filename corrected. The training/ambassador activity itself remains April–July 2025. |
| ICONS and major projects | Stale Present in CV | ICONS ends June 2026, RoboCup project July 2026, delivery robot June 2026, following the more specific source website dates. |
| Matrix TA | CV says Spring/Fall 2025; website gives Fall 2025/Spring 2026 | Used the specific website terms; Algorithms TA (Fall 2025) retained as concise academic service. |
| Entrepreneurship | Activity dates differ from machine project dates | Club activity: July–December 2023; machine project: January–April 2024. Kept them distinct instead of choosing an unsupported replacement date. |

For date precision, `display_date` is the public label. Jekyll uses a normalized first day internally for year/month-only records (TNSM: `2026-01-01`; KICS 2024: `2024-11-01`); no exact day is claimed on those pages. Home journal order is explicitly controlled by `order`, not those normalized dates.

### English conference display (September 8, 2026 follow-up)

At the user's request, both KICS entries now display the English paper titles already supplied in the author's CV, on the publication list and detail pages. The original Korean titles remain in `original_title`; `title_source` distinguishes author-provided English wording from publisher-verified metadata. The publicly accessible DBpia record and Korean program confirm the Korean titles, but did not establish official English paper titles.

The venue labels are consistently **KICS Fall Conference 2024** and **KICS Fall Conference 2025** in the site and rebuilt CV. References: [2024 English program](https://conf.kics.or.kr/e2024f/downloadProgram?type=program), [2025 English program](https://conf.kics.or.kr/e2025f/downloadProgram?type=program). The organizing society's full English name is **Korean Institute of Communications and Information Sciences**, confirmed in its [official newsletter](https://www.kics.or.kr/modules/setting/subPageManager/user/core/view/3/eng_Newsletter/inc/data/Vol.6_No.2.pdf).

Follow-up validation: production build and all 612 local references passed. The publication list and both conference detail pages passed 12 browser checks across 320, 390, 768, and 1440 px widths, with English headings and no horizontal overflow (`docs/conference-english-verification.json`). Both distributed CV copies are identical, remain four pages, and contain the matching English venue labels; compilation reported no overfull/underfull boxes. Inline PDF embedding is retained.

### Hanyang laboratory affiliation

The user later clarified the advisor as Prof. Jun Moon and the intended research focus as reinforcement learning, networks, robot learning, and robotic manipulation. The spelling **Jun Moon** was verified on the [professor's official homepage](https://junmoony.github.io/). CV research experience now leads with **Control & Optimization Laboratory (COLAB)** and uses **Researcher (Advisor: Prof. Jun Moon)**, matching the ICONS entry structure. About and Experience use the same advisor and interests. First-page CV section spacing is 18 pt before / 10 pt after each heading, with the original 8 pt / 6 pt restored for subsequent pages. All five publications remain complete on page 1; the CV remains four pages, with no overfull/underfull warnings. The inline PDF and direct links carry a content-version query to refresh cached copies.

The user subsequently supplied the current Hanyang laboratory URL, [Control & Optimization Laboratory (COLAB)](https://sites.google.com/view/hy-contopt). Its homepage was retrieved on September 8, 2026 and verified the English name and acronym. The affiliation and link are now included in About, Experience, the shared sidebar, and the CV research-experience entry. The user supplied the affiliation; no advisor identity or additional personal research achievements were inferred from the lab website. Laboratory metadata is maintained under `author.laboratory`, `author.laboratory_short`, and `author.laboratory_url` in `_config.yml`.

## Numbered assets and evidence classification

| Original asset | Final file | Inspected meaning |
| --- | --- | --- |
| `images/projects/14600.jpg` | `images/projects/smart-stroller.webp` | Outdoor project demonstration scene identified by the user as the smart stroller project. Description includes camera–2D LiDAR sensor fusion, ROS 2, and Arduino motor control. No date, team role, navigation/SLAM/avoidance/tracking/safety result was inferred. |
| `images/awards/14593.jpg` | `images/honors/presidents-recommendation.webp` | President's Recommendation for Outstanding Talent, INU, August 21, 2026. |
| `images/awards/14594.jpg` | `images/honors/deans-commendation.webp` | Dean's commendation for excellent academic performance and exemplary conduct, August 21, 2026. The certificate alone is not labeled as first-in-class proof; that distinction separately comes from the existing site/CV and the user's description. |
| `images/awards/14595.jpg` | `images/honors/bachelor-of-engineering-diploma.webp` | English Bachelor of Engineering diploma, August 21, 2026; classified as a degree document, not a competition award. |
| `images/awards/14596.jpg` | `images/honors/inu-surprise-outstanding-talent.webp` | INU SURPRISE Outstanding Talent Certificate (최우수 인재), August 21, 2026; not mislabeled as a diploma or first-place prize. |

**Evidence privacy decision:** the scans were inspected and some contain student IDs and birth dates. In response to the explicit question about masking these fields with code, the user chose **“원본 그대로 표시”** (display originals unchanged). This direct instruction overrides the brief's generic redaction recommendation. Consequently, scans retain their original information, signatures, and seals; certificate WebP encoding is lossless. The new web profile and regenerated CV omit the private phone number. No CSS-only masking is used.

## Asset handling

- Reused every meaningful publication/project image, conference photograph, award record and numbered recognition document.
- Images organized under `images/profile/`, `images/publications/`, `images/projects/`, and `images/honors/`. No empty Experience image folder was manufactured because that page had no source image.
- Encoded images to WebP, preserving composition and dimensions and applying camera EXIF orientation. This also fixes legacy PNG filenames that actually contained JPEG/MPO data. Certificate images are encoded losslessly; photos/figures use quality 90. No generated imagery was used.
- At the initial migration, image bytes were reduced from **93,155,921** to **19,734,076** (about **79%**). `docs/asset-migration.json` records that initial snapshot, before the user's later lossless RoboCup, ERP42, and Fan-Li image replacements. The H-Mobility final filename was subsequently changed from `2025-07` to `2025-08` to match the inspected certificate.
- Sidebar portrait uses the original project-presentation photo with a CSS circular crop. Project photos and figures use contained aspect-ratio frames, preserving diagram content.
- Every evidence thumbnail links directly to its full image if JavaScript is unavailable; enhanced dialogs support keyboard access, Escape, a close button, focus return, and a full-size link.

## Compatibility and deployment

The Git remote and existing CV portfolio URL confirm a **project site**, not a username-root site. Configured `url: https://eliseegkart.github.io` and `baseurl: /portfolio_Hyeongjin_Kim`.

- `/resume/` → `/cv/` through Jekyll redirects.
- `/awards/` → `/honors/` through Jekyll redirects.
- `/publications/`, `/projects/`, `/experience/`, `/` retain their routes.
- `Academic_CV/Academic_CV.pdf` remains available and byte-identical to `files/Hyeongjin_Kim_CV.pdf`.
- All internal image/CSS/JS/PDF/page paths use Jekyll URL helpers.
- `.github/workflows/pages.yml` builds and verifies pull requests and deploys pushes to the main branch using GitHub Pages Actions. README and MAINTENANCE explain setup.
- **The site is live.** After the user authorized upload, the changes were committed and pushed, Pages was configured to use GitHub Actions, and deployment succeeded. The first remote build exposed an overly broad `vendor/` ignore rule; changing it to `/vendor/` and committing `_sass/vendor/` fixed the build. Subsequent updates are deployed from `master`, with the latest run and public files checked after each release.

## Initial migration verification

For the later conference-link and consistency audit, see [the September 8 audit](docs/portfolio-audit-2026-09-08.md).

- **Production build:** `BUNDLE_PATH=vendor/bundle JEKYLL_ENV=production bundle3.0 exec jekyll build --trace` — succeeded with Jekyll 3.10.0.
- **Path compatibility:** production project baseurl and a separate `--baseurl ''` root-site build both passed `scripts/check_site.py`.
- **Local links:** 28 generated HTML pages, 612 local link/asset/fragment references; zero errors. Required routes, correct legacy PDF, template/demo removal, and exclusion of private LaTeX/source reports verified.
- **External links:** all 28 distinct URLs responded: 22 HTTP 200 responses, 6 HTTP 202 responses from IEEE/DOI-to-IEEE. DOI metadata was independently verified via Crossref. HTTP reachability does not certify publisher access rights, video playback, or every external page's content. Results in `docs/external-link-check.json`.
- **Browser layout/accessibility:** Chrome, nine representative routes at 320, 390, 768, 1024 and 1440 CSS pixels (45 cases). No horizontal overflow, missing images, duplicate/missing h1, JavaScript errors, or axe WCAG A/AA violations after fixing the shared footer link underline.
- **Interactions:** keyboard menu toggle/Escape; evidence dialog opening, focus containment and restoration; Escape dismissal; PDF download and separate-tab opening; nested PDF fallback; resume/awards redirects; no-JavaScript navigation and image links passed.
- **Visual review:** Firefox desktop/mobile homepage, Projects, Honors and CV; Chrome inline PDF rendering. Initial Chrome screenshots were incomplete in this container's rendering environment, so Firefox was used for reliable full-page visual review. The DOM/image tests passed in Chrome. In headless Firefox's default PDF-disabled profile, the intended fallback is displayed.
- **PDF:** regenerated with Tectonic from the edited source, four A4 pages with selectable text and working hyperlink annotations; viewed all pages, checked text extraction, no overflow/underflow layout warnings. A standard shell-escape-disabled package message is harmless; no shell escape is required.
- **Diff hygiene:** `git diff --check` passes.

Unverified optional information remains omitted: stroller dates/role, new academic social profiles, a 2025 KICS proceedings DOI, and the TNSM exact publication day. No task-blocking build/link failures remain. Native PDF behavior on physical iOS/Android devices was not tested. Live GitHub Actions deployment and public HTML, CSS, image, and PDF delivery have since been verified.

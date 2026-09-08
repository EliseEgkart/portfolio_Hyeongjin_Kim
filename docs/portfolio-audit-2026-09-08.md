# Portfolio consistency audit — September 8, 2026

## Corrections

- Verified the user-supplied [2025 KICS proceedings record](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12566863): Korean title, author order, November 2025, and pages 455–456. Added the proceedings link to the publication list, detail page, BibTeX, and CV; retained the official conference program link. Source metadata is saved in `metadata/kics-2025-dbpia.json`.
- Added proceedings page ranges to both conference cards, downloadable BibTeX for both conferences, and both DBpia hyperlinks in the CV. English conference titles retain the author's CV wording; the BibTeX notes identify them as translations of Korean-language papers.
- Added the missing issue numbers to the two IEEE Internet of Things Journal BibTeX files, matching the website and CV.
- Aligned the research introduction, site description, and ICONS role with the current profile. Prior UAV publications remain connected to their research theme.
- Standardized project names and technical product capitalization between the CV and website. Reordered CV leadership and award entries by date, and clarified patent applications as applications.
- Kept the Tanghulu project together on page 3 and started Awards on page 4. All five publications remain on page 1, with the requested 18 pt / 10 pt section spacing unchanged.
- Added `scripts/update_cv.py` to synchronize the two public PDF copies and update all six CV link versions together. Corrected maintenance documentation that still described the site as unpublished.

## Validation

- Production Jekyll build passed; 28 HTML pages and 616 internal references checked with no errors.
- Chromium: 11 routes at 320, 390, 768, 1024, and 1440 px (55 cases). No horizontal overflow, broken images, JavaScript errors, duplicate/missing page headings, or automated WCAG A/AA violations in those cases.
- Keyboard menu and document dialog controls, focus return, PDF download/open/fallback, legacy redirects, and navigation without JavaScript passed.
- All five publication images are centered at 390 px; conference proceedings/program/BibTeX links and the 2025 BibTeX download passed.
- Ten core external project, research-news, and laboratory URLs returned HTTP 200. This checks reachability; it does not establish access to paywalled content or video playback.
- CV: four pages, all five publications on page 1, both conference hyperlink annotations present, searchable text preserved, and no overfull/underfull layout warnings. Both published PDF copies have SHA-256 `cdcc4c0efc835a3c160d81086aca894a4191fd3d784a4b8e9f9ec56c248093a7`.
- Reviewed all four PDF pages and the conference detail page at mobile width.

These browser checks use desktop Chromium with responsive viewports. Native PDF behavior on physical iOS/Android devices was not tested.

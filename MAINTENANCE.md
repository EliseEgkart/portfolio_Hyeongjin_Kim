# Maintaining Hyeongjin Kim's academic website

The site is built with Jekyll 3.10 and the supplied Academic Pages template. There is no JavaScript application build step. The Node dependencies are optional browser QA tools.

## Local preview

Install Ruby (3.3 recommended), Bundler, and your platform's Ruby development headers/build tools. Then:

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000/portfolio_Hyeongjin_Kim/`. Restart Jekyll after editing `_config.yml`.

This workstation uses `bundle3.0` instead of `bundle`; installed gems live in `vendor/bundle`. Its Ruby headers were supplied temporarily from `/tmp/hyeongjin-ruby-dev` to avoid changing system packages. The headers are only needed when compiling native dependencies, not for subsequent builds.

```sh
BUNDLE_PATH=vendor/bundle bundle3.0 exec jekyll serve --host 127.0.0.1
```

## Add or update a publication

Create `_publications/descriptive-slug.md`. Jekyll creates `/publications/descriptive-slug/` and includes it in the archive. Use one file per work and verify publisher metadata before entering it.

```yaml
---
title: "Exact publisher title"
category: Journal article
# Jekyll's date is used for sorting; display_date controls visible precision.
date: 2026-06-01
display_date: June 2026
authors:
  - Hyeongjin Kim
  - Other Author
venue: IEEE Internet of Things Journal
short_venue: IEEE IoT Journal
doi: 10.1109/REPLACE_WITH_REAL_DOI
volume: '13'
issue: '11'
pages: 23495-23505
image: /images/publications/descriptive-figure.webp
image_alt: Description of the actual figure
publisher_url: https://publisher.example/real-article
selected: false
order: 4
---
A concise, source-supported description.
```

Do not publish the example values above. Conference entries use `category: Conference presentation` and `presentation`. Use the English title in `title`, preserve the original Korean title in `original_title`, and record its provenance in `title_source`. The current conference titles use the author's CV English wording; the official programs verify the Korean originals, not the English translations. Only real PDFs/code/proceedings URLs should be added. `pdf_url` accepts a local site path; `code_url` accepts an external URL. `bibtex` points to a `.bib` file in `files/citations/`.

Homepage publications use `selected: true`, sorted by `order`. Journal archive ordering uses `order`; conference entries use their date.

## Add or update a project

Create `_portfolio/descriptive-slug.md`; the public route and page label are **Projects**. See an existing entry for the complete structure:

- `title`, `summary`, `image`, `image_alt`, and `technologies`.
- `period` and `role` only if verified. Leave them blank when unknown.
- `group` controls the Projects section and detail-page category. Use exactly `Robotics & autonomous systems`, `Embedded systems & physical computing`, or `Additional engineering projects`. The first group uses the main card grid; the other two use compact rows. Keep `major: true` for the robotics group and `false` for the others as descriptive metadata.
- `selected: true` to appear on the homepage.
- `order` controls listing order.
- `external_url` and `external_label` for an existing repository/video.
- Markdown body for actual contributions. Do not infer capabilities from a photograph.

## Add an honor or academic document

Edit `_data/honors.yml`. Use `competitive` for actual competition awards and `academic` for recommendations, commendations, diplomas, and institutional certifications. Preserve team/individual distinction and team role. Add evidence to `images/honors/` and reference its site-relative path.

Evidence links work without JavaScript; with JavaScript, a native dialog provides keyboard-accessible enlargement, Escape dismissal, focus restoration, and an original-image link. Keep scans readable. Before adding a new scan, check whether it contains unnecessary personal information; public files are downloadable, so a CSS overlay is not a redaction.

## Update the CV

The source is `Academic_CV/main.tex`. Compile it with your LaTeX installation, or with Tectonic:

```sh
mkdir -p /tmp/hyeongjin-cv-build
tectonic Academic_CV/main.tex --outdir /tmp/hyeongjin-cv-build
python3 scripts/update_cv.py /tmp/hyeongjin-cv-build/main.pdf
```

The update script replaces **both** PDF copies with identical bytes and updates the version query on every inline/open/download link, so browsers fetch the new CV. `/cv/` is the primary route; `/resume/` redirects there. The previous `Academic_CV/Academic_CV.pdf` URL remains available. Preserve searchable/selectable text and hyperlinks; do not replace the PDF with page screenshots. Check current affiliation, program, publication metadata, and dates against the website whenever updating the CV. The first-page section spacing in `main.tex` is 18 pt before / 10 pt after headings; it resets to 8 pt / 6 pt before Projects. Keep all five publications on the first page when recompiling.

`main_origin.tex` and the old auxiliary author PDF remain source archives and are excluded from the published output.

## Profile, navigation, and appearance

- `_config.yml`: identity, public email, avatar, profiles, repository, URL, and baseurl.
- `_data/navigation.yml`: main navigation; the site title links home.
- `_pages/`: main page content and legacy redirects.
- `_sass/_academic-custom.scss`: custom design and responsive behavior on top of Academic Pages Sass.
- `_includes/`: reusable author profile, navigation, publication/project cards, and evidence dialog.
- `assets/js/site.js`: progressive navigation and image-dialog behavior.

ORCID is verified against publication metadata. Add Google Scholar or LinkedIn only after confirming the exact profile; no generic search link or other person's profile should be used.

Use `relative_url` for site paths and `absolute_url` for canonical metadata. Never paste `/portfolio_Hyeongjin_Kim` into individual page links.

## Build and verify

```sh
JEKYLL_ENV=production bundle exec jekyll build --trace
python3 scripts/check_site.py _site /portfolio_Hyeongjin_Kim
```

The link checker uses only the Python standard library and verifies local routes, fragments, image/PDF paths, legacy PDF consistency, required pages, and absence of demo/private source files.

Optional browser checks require Node.js, Chrome, and the dev dependencies in `package.json`:

```sh
npm install
SITE_URL=http://127.0.0.1:4000/portfolio_Hyeongjin_Kim/ npm run check:browser
```

Set `CHROME_PATH` for a different Chrome executable. `REPORT_PATH` controls the JSON report destination. The suite checks nine pages at 320/390/768/1024/1440 CSS pixels, axe accessibility rules, image loading, overflow, keyboard interactions, PDF controls, legacy redirects, and navigation without JavaScript. Browser PDF support varies; both persistent open/download links and inline fallback are intentional.

## Deploy on GitHub Pages

The verified target is the existing project site:

- Repository: `EliseEgkart/portfolio_Hyeongjin_Kim`
- URL: `https://eliseegkart.github.io/portfolio_Hyeongjin_Kim/`
- `_config.yml`: `url: https://eliseegkart.github.io`, `baseurl: /portfolio_Hyeongjin_Kim`

The site is live and **Settings → Pages → GitHub Actions** is configured. `.github/workflows/pages.yml` builds and checks pull requests, and deploys pushes to `main`/`master` or a manual workflow run. Confirm that the run for the latest commit succeeds and check the public page after deployment. `.gitignore` excludes only the root `/vendor/` dependency folder; `_sass/vendor/` must remain tracked because it contains the theme's Sass libraries.

To use a username root site later, update repository/url and set `baseurl: ''`; update the workflow link-check baseurl argument too. A root-path build was also validated during migration.

Keep the Academic Pages MIT notice in `LICENSE`. Theme lineage and the exact upstream revision are recorded in `MIGRATION_REPORT.md`.

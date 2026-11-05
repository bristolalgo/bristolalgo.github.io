# Algorithms and Complexity — University of Bristol

This is a small, static website for **GitHub Pages**. You can edit its news and
publications without editing page layout, without installing anything, and
without running a build or download script.

## PhD recruitment notice

The homepage displays a lightly shaded **“We are recruiting PhD students”** notice
immediately below the group description. The notice links to the group contact
email address. To edit or remove the notice when recruitment status changes,
open `index.html` and find the section marked `id="phd-opportunities"`.
Its colours and spacing are defined in `assets/site.css` under the comment
“PhD recruitment”. This is deliberately separate from news, so it remains
visible while recruitment is active. The application deadline currently shown is
**January 2027** (no exact day is specified). Update or remove this date in
`index.html` if the deadline changes.

## To add a news item

1. Open **`content/news.js`** in a text editor.
2. Add a new object at the beginning of `window.NEWS_ITEMS`, following the
   existing format:

   ```js
   {
     "date": "November 2026",
     "year": 2026,
     "title": "Paper accepted at a conference",
     "description": "Paper title and authors, or a short description."
   },
   ```

3. Save the file. The **four newest announcements** automatically appear on
   the homepage; **all announcements** appear on `news.html`, grouped by year.
4. If an announcement has photographs, place them in `images/` and add:

   ```js
   "photos": [
     {"file": "my-photo.jpg", "alt": "Description of the photograph"}
   ],
   ```

   You can also include an optional `"links"` array, such as:

   ```js
   "links": [
     {"label": "Conference website", "url": "https://example.org/"}
   ]
   ```

Remember commas between news entries. The browser displays the items in date
order, regardless of where you insert them.

## To add a publication

1. Open **`content/publications.js`**.
2. Find the relevant `"year"` and add an object inside its `"papers"` list:

   ```js
   {
     "title": "Title of the paper",
     "authors": "First Author, Second Author, Third Author",
     "venue": "Journal or conference name (2026)",
     "url": "https://doi.org/example"
   },
   ```

3. `"url"` is optional; if supplied, the paper title becomes a link.
4. To introduce a **new year**, copy a whole year block and put it at the
   beginning of the array:

   ```js
   {
     "year": 2028,
     "papers": [
       {"title": "...", "authors": "...", "venue": "..."}
     ]
   },
   ```

**Every publication year has a dropdown**. The two newest years automatically
start expanded, including after adding a new year. The other years start closed.

## Files

| File | Purpose | Normally edit? |
|---|---|---|
| `index.html` | Homepage structure (description, people, contact) | Occasionally |
| `news.html` | News archive page structure | Rarely |
| **`content/news.js`** | All news, photographs, and relevant links | **Yes** |
| **`content/publications.js`** | All publications by year | **Yes** |
| `assets/site.css` | Website colours, type, spacing, layout | Only for design changes |
| `assets/site.js` | Generates news and publication lists from the content files | Rarely |
| `images/` | University logo, member portraits, archive news photographs | When adding photos |

## Local preview and publishing

Double-click `index.html` to open it in a browser. Internal images, news,
publication dropdowns and navigation work without an internet connection.
External university, researcher and paper links need a connection.

To replace the website on GitHub Pages, **upload the contents** of this folder
(including `assets/`, `content/`, and `images/`) into the repository's published
folder. For a repository published from its root, keep `index.html` at the root.

No build script, Node, Python, package manager or third-party library is required.

## Current content

The news archive has 36 entries. The publication list includes 41 papers,
including the 2026 *Journal of the ACM* paper, “Settling the Pass Complexity
of Approximate Matchings in Dynamic Graph Streams” (DOI: 10.1145/3820493).

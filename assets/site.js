/*
 * Algorithms and Complexity — page rendering.
 *
 * You normally DO NOT need to edit this file.
 * Add announcements in content/news.js.
 * Add papers in content/publications.js.
 * These functions display that content on the two pages automatically.
 */
'use strict';

// Create an element with optional CSS class and plain text content.
function makeElement(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function makeLink(url, text, className = '') {
  const anchor = makeElement('a', className, text);
  anchor.href = url;
  return anchor;
}

// Newest first. The month/year is human-readable in content/news.js.
function sortedNews() {
  return [...(window.NEWS_ITEMS || [])].sort((a, b) => {
    const timeA = Date.parse(`1 ${a.date}`);
    const timeB = Date.parse(`1 ${b.date}`);
    return (Number.isNaN(timeB) ? 0 : timeB) - (Number.isNaN(timeA) ? 0 : timeA);
  });
}

// Homepage: the four most recent news announcements in the right column.
function renderLatestNews() {
  const container = document.getElementById('latest-news-items');
  if (!container) return;

  for (const item of sortedNews().slice(0, 4)) {
    const article = makeElement('article', 'news-item');
    article.append(makeElement('span', 'news-date', item.date));
    const inner = makeElement('div');
    inner.append(makeElement('h3', '', item.title));
    inner.append(makeElement('p', '', item.description));
    article.append(inner);
    container.append(article);
  }
}

// News archive: every news entry, grouped by year, with the original photographs.
function renderNewsArchive() {
  const container = document.getElementById('news-archive-items');
  if (!container) return;

  const byYear = new Map();
  for (const item of sortedNews()) {
    const year = Number(item.year || item.date.match(/\d{4}$/)?.[0]);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(item);
  }

  for (const year of [...byYear.keys()].sort((a, b) => b - a)) {
    const section = makeElement('section', 'archive-year');
    section.id = `year-${year}`;
    section.append(makeElement('h2', '', String(year)));

    for (const item of byYear.get(year)) {
      const article = makeElement('article', 'archive-news-item');
      const dateColumn = makeElement('div');
      dateColumn.append(makeElement('span', 'archive-date', item.date));
      const body = makeElement('div');
      body.append(makeElement('h3', '', item.title));
      body.append(makeElement('p', '', item.description));

      if (item.photos?.length) {
        const gallery = makeElement('div', 'archive-photo-grid');
        if (item.photos.length > 1) gallery.classList.add('double');
        for (const photo of item.photos) {
          const file = `images/${photo.file}`;
          const imageLink = makeLink(file, '');
          imageLink.title = 'View full-size photograph';
          const image = makeElement('img');
          image.src = file;
          image.alt = photo.alt || item.title;
          image.loading = 'lazy';
          image.decoding = 'async';
          image.addEventListener('error', () => {
            image.remove();
            imageLink.append(makeElement('span', 'photo-missing', 'Photograph unavailable'));
            imageLink.classList.add('image-unavailable');
          });
          imageLink.append(image);
          gallery.append(imageLink);
        }
        body.append(gallery);
      }

      if (item.links?.length) {
        const links = makeElement('div', 'archive-related-links');
        for (const link of item.links) links.append(makeLink(link.url, link.label));
        body.append(links);
      }

      article.append(dateColumn, body);
      section.append(article);
    }
    container.append(section);
  }
}

// Publications: every year is collapsible, with the two newest years initially open.
function renderPublications() {
  const container = document.getElementById('publication-years');
  if (!container) return;

  const years = [...(window.PUBLICATION_YEARS || [])]
    .sort((a, b) => Number(b.year) - Number(a.year));

  years.forEach((entry, index) => {
    const details = makeElement('details', 'pub-year archived');
    details.id = `pub-${entry.year}`;
    details.dataset.year = String(entry.year);
    details.open = index < 2;

    const summary = makeElement('summary');
    summary.setAttribute('aria-label', `Toggle publications from ${entry.year}`);

    const label = makeElement('span', 'pub-year-label');
    label.append(makeElement('strong', '', String(entry.year)));
    const count = entry.papers.length;
    label.append(makeElement('small', '', `${count} ${count === 1 ? 'paper' : 'papers'}`));

    const action = makeElement('span', 'accordion-action');
    action.append(makeElement('span', 'action-closed', 'View papers'));
    action.append(makeElement('span', 'action-open', 'Hide papers'));
    const chevron = makeElement('span', 'chev', '⌄');
    chevron.setAttribute('aria-hidden', 'true');
    action.append(chevron);
    summary.append(label, action);
    details.append(summary);

    const list = makeElement('ol', 'paper-list');
    for (const paper of entry.papers) {
      const listItem = makeElement('li', 'paper');
      const heading = makeElement('h3');
      if (paper.url) heading.append(makeLink(paper.url, paper.title));
      else heading.textContent = paper.title;
      listItem.append(heading);
      listItem.append(makeElement('p', 'authors', paper.authors));
      listItem.append(makeElement('p', 'venue', paper.venue));
      list.append(listItem);
    }
    details.append(list);
    container.append(details);
  });
}

// defer ensures that both the data files and the page exist before this runs.
renderLatestNews();
renderNewsArchive();
renderPublications();

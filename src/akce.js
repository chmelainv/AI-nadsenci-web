import { loadTexts, loadEvents } from './utils.js';
import { renderNavigation, renderFooter, setupMobileMenu, getNavLogoHref } from './shared.js';

const BASE = import.meta.env.BASE_URL;

async function init() {
  try {
    const [texts, events] = await Promise.all([loadTexts(), loadEvents()]);

    // Fix logo and breadcrumb hrefs
    const logo = document.getElementById('nav-logo');
    if (logo) logo.href = BASE;
    const breadcrumbHome = document.getElementById('breadcrumb-home');
    if (breadcrumbHome) breadcrumbHome.href = BASE;

    renderNavigation(texts.nav, true);
    renderFooter(texts.footer, true);
    setupMobileMenu(texts.accessibility);

    const pageTexts = texts.eventsPage || {};
    const subtitle = document.getElementById('page-subtitle');
    if (subtitle) subtitle.textContent = pageTexts.subtitle || texts.events.subheading;

    const upcoming = events.filter(e => e.status !== 'past');
    const past = events.filter(e => e.status === 'past');

    if (upcoming.length > 0) {
      renderSection('upcoming', upcoming, texts.events, pageTexts.upcomingHeading || 'Nadcházející akce');
    }
    if (past.length > 0) {
      renderSection('past', past, texts.events, pageTexts.pastHeading || 'Proběhlé akce');
    }

  } catch (error) {
    console.error('Failed to initialize events page:', error);
  }
}

function renderSection(id, events, eventTexts, heading) {
  const section = document.getElementById(`${id}-section`);
  const grid = document.getElementById(`${id}-grid`);
  const headingEl = document.getElementById(`${id}-heading`);

  if (!section || !grid) return;

  section.classList.remove('hidden');
  if (headingEl) headingEl.textContent = heading;

  grid.innerHTML = events.map(event => renderEventCard(event, eventTexts)).join('');
}

function renderEventCard(event, texts) {
  const isPast = event.status === 'past';
  const isSoldOut = event.status === 'sold-out';

  const statusLabel = texts.statusLabels[event.status];
  const statusBadgeClass = isPast ? 'bg-gray-700' : isSoldOut ? 'bg-red-700' : 'bg-green-700';

  const coverImage = event.media && event.media.cover
    ? `${event.basePath}${event.media.cover}`
    : `${BASE}images/placeholder-event.svg`;

  const detailUrl = `${BASE}akce/detail.html?id=${event.id}`;

  let buttonsHtml = '';
  if (isPast) {
    buttonsHtml = `<a href="${detailUrl}" class="w-full block text-center px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors">${texts.buttons.showRecap}</a>`;
  } else if (isSoldOut) {
    buttonsHtml = `
      <div class="grid grid-cols-2 gap-3">
        <button disabled class="block px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">${texts.buttons.soldOut}</button>
        <a href="${detailUrl}" class="block text-center px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">${texts.buttons.learnMore}</a>
      </div>
    `;
  } else {
    buttonsHtml = `
      <div class="grid grid-cols-2 gap-3">
        <a href="${event.lumaLink}" target="_blank" class="block text-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">${texts.buttons.buyTicket}</a>
        <a href="${detailUrl}" class="block text-center px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors">${texts.buttons.learnMore}</a>
      </div>
    `;
  }

  return `
    <article class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div class="relative h-48 sm:h-56 bg-gray-100 overflow-hidden group">
        <img src="${coverImage}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <span class="absolute top-4 right-4 px-3 py-1 ${statusBadgeClass} text-white text-sm font-bold rounded-full shadow-lg ring-2 ring-white/30">
          ${statusLabel}
        </span>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <h3 class="text-xl font-bold mb-2 text-gray-900">${event.title}</h3>
        <div class="space-y-2 mb-6 flex-grow text-sm">
          <div class="flex items-center text-gray-600">
            <span class="w-20 font-medium text-gray-400">${texts.infoLabels.date}</span>
            <span class="font-medium">${event.date}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <span class="w-20 font-medium text-gray-400">${texts.infoLabels.time}</span>
            <span>${event.time}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <span class="w-20 font-medium text-gray-400">${texts.infoLabels.location}</span>
            <span>${event.location}</span>
          </div>
          ${!isPast ? `
          <div class="flex items-center text-gray-600 mt-3 pt-3 border-t border-gray-100">
            <span class="w-20 font-medium text-gray-400">${texts.infoLabels.price}</span>
            <span class="font-bold text-gray-900">${event.price}</span>
          </div>
          ` : ''}
        </div>
        <div class="mt-auto">
          ${buttonsHtml}
        </div>
      </div>
    </article>
  `;
}

init();

import { loadTexts, loadEvent } from './utils.js';
import { renderNavigation, renderFooter, setupMobileMenu } from './shared.js';

const BASE = import.meta.env.BASE_URL;

async function init() {
  try {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');

    const texts = await loadTexts();

    // Fix logo href
    const logo = document.getElementById('nav-logo');
    if (logo) logo.href = BASE;

    renderNavigation(texts.nav, true);
    renderFooter(texts.footer, true);
    setupMobileMenu(texts.accessibility);

    if (!eventId) {
      renderNotFound(texts);
      return;
    }

    const event = await loadEvent(eventId);
    if (!event) {
      renderNotFound(texts);
      return;
    }

    document.title = `${event.title} | AI nadšenci`;
    renderEventDetail(event, texts);
    initLightbox(event);

  } catch (error) {
    console.error('Failed to initialize event detail:', error);
  }
}

function renderNotFound(texts) {
  const container = document.getElementById('event-detail');
  if (!container) return;

  const detailTexts = texts.eventDetail || {};
  container.innerHTML = `
    <div class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-3xl font-bold mb-4 text-gray-900">${detailTexts.notFoundTitle || 'Akce nenalezena'}</h1>
      <p class="text-gray-600 mb-8">${detailTexts.notFoundText || 'Tato akce neexistuje nebo byla odstraněna.'}</p>
      <a href="${BASE}akce/" class="inline-flex items-center font-bold text-blue-700 hover:text-blue-900 transition-colors">
        &larr; ${detailTexts.backToList || 'Zpět na seznam akcí'}
      </a>
    </div>
  `;
}

function renderEventDetail(event, texts) {
  const container = document.getElementById('event-detail');
  if (!container) return;

  const isPast = event.status === 'past';
  const isSoldOut = event.status === 'sold-out';
  const eventTexts = texts.events;
  const detailTexts = texts.eventDetail || {};

  const statusLabel = eventTexts.statusLabels[event.status];
  const statusBadgeClass = isPast ? 'bg-gray-700' : isSoldOut ? 'bg-red-700' : 'bg-green-700';

  const coverImage = event.media && event.media.cover
    ? `${event.basePath}${event.media.cover}`
    : `${BASE}images/placeholder-event.svg`;

  const description = event.longDescription || event.description;

  // CTA buttons for open events
  let ctaHtml = '';
  if (!isPast && !isSoldOut) {
    ctaHtml = `
      <div class="flex flex-col sm:flex-row gap-4 mt-8">
        <a href="${event.lumaLink}" target="_blank" class="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium text-center">
          ${eventTexts.buttons.buyTicket}
        </a>
      </div>
    `;
  } else if (isSoldOut) {
    ctaHtml = `
      <div class="mt-8">
        <span class="inline-block px-8 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium">${eventTexts.buttons.soldOut}</span>
      </div>
    `;
  }

  // Gallery for past events
  let galleryHtml = '';
  const galleryImages = isPast && event.media && event.media.gallery ? event.media.gallery : [];
  if (galleryImages.length > 0) {
    const galleryTitle = detailTexts.galleryTitle || 'Fotogalerie';
    galleryHtml = `
      <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold mb-8">${galleryTitle}</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="gallery-grid">
            ${galleryImages.map((img, i) => `
              <button type="button" class="aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-700" data-index="${i}">
                <img src="${event.basePath}${img}" alt="${event.title} - foto ${i + 1}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
              </button>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Lightbox -->
      <div id="lightbox" class="fixed inset-0 z-50 bg-black/90 hidden items-center justify-center" role="dialog" aria-label="Fotogalerie">
        <button id="lb-close" class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Zavřít">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <button id="lb-prev" class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Předchozí">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button id="lb-next" class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors" aria-label="Další">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
        <div class="flex items-center justify-center w-full h-full p-16">
          <img id="lb-img" src="" alt="" class="max-w-full max-h-full object-contain rounded-lg shadow-2xl">
        </div>
        <div id="lb-counter" class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium"></div>
      </div>
    `;
  }

  // Recap for past events
  let recapHtml = '';
  if (isPast && event.recapText) {
    const recapTitle = detailTexts.recapTitle || 'Jak to bylo';
    recapHtml = `
      <section class="py-16">
        <div class="container mx-auto px-4 max-w-3xl">
          <h2 class="text-2xl md:text-3xl font-bold mb-6">${recapTitle}</h2>
          <div class="prose prose-lg text-gray-600 leading-relaxed space-y-4">
            ${event.recapText.split('\n').map(p => `<p>${p}</p>`).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // Recap video
  let videoHtml = '';
  if (isPast && event.media && event.media.recap) {
    const videoTitle = detailTexts.videoTitle || 'Video recap';
    videoHtml = `
      <section class="py-16 ${event.recapText ? 'bg-gray-50' : ''}">
        <div class="container mx-auto px-4 max-w-4xl">
          <h2 class="text-2xl md:text-3xl font-bold mb-8">${videoTitle}</h2>
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <video controls class="w-full" poster="${coverImage}">
              <source src="${event.basePath}${event.media.recap}" type="video/mp4">
              Váš prohlížeč nepodporuje přehrávání videa.
            </video>
          </div>
        </div>
      </section>
    `;
  }

  container.innerHTML = `
    <!-- Breadcrumb + Header -->
    <section class="bg-blue-50 py-16">
      <div class="container mx-auto px-4">
        <nav class="text-sm text-gray-500 mb-6">
          <a href="${BASE}" class="hover:text-blue-700 transition-colors">Domů</a>
          <span class="mx-2">/</span>
          <a href="${BASE}akce/" class="hover:text-blue-700 transition-colors">Akce</a>
          <span class="mx-2">/</span>
          <span class="text-gray-900 font-medium">${event.title}</span>
        </nav>

        <div class="flex flex-col lg:flex-row gap-12 items-start">
          <!-- Cover Image -->
          <div class="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <img src="${coverImage}" alt="${event.title}" class="w-full h-64 lg:h-96 object-cover">
          </div>

          <!-- Event Info -->
          <div class="w-full lg:w-1/2">
            <span class="inline-block px-3 py-1 ${statusBadgeClass} text-white text-sm font-bold rounded-full mb-4">
              ${statusLabel}
            </span>

            <h1 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">${event.title}</h1>

            <div class="space-y-4 mb-6">
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span class="font-medium">${event.date}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>${event.time}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <svg class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>${event.location}</span>
              </div>
              ${!isPast ? `
              <div class="flex items-center text-gray-600 pt-4 border-t border-gray-200">
                <svg class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                <span class="text-lg font-bold text-gray-900">${event.price}</span>
              </div>
              ` : `
              <div class="flex items-center text-gray-600 pt-4 border-t border-gray-200">
                <svg class="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>${event.attendees} ${eventTexts.infoLabels.attendees}</span>
              </div>
              `}
            </div>

            ${ctaHtml}
          </div>
        </div>
      </div>
    </section>

    <!-- Description -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-6">${detailTexts.aboutTitle || 'O akci'}</h2>
        <div class="text-lg text-gray-600 leading-relaxed space-y-4">
          ${description.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
    </section>

    ${recapHtml}
    ${videoHtml}
    ${galleryHtml}

    <!-- Back link -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <a href="${BASE}akce/" class="inline-flex items-center font-bold text-blue-700 hover:text-blue-900 transition-colors group">
          <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
          ${detailTexts.backToList || 'Zpět na seznam akcí'}
        </a>
      </div>
    </section>
  `;
}

function initLightbox(event) {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const images = (event.media && event.media.gallery || []).map(img => `${event.basePath}${img}`);
  if (images.length === 0) return;

  const lbImg = document.getElementById('lb-img');
  const lbCounter = document.getElementById('lb-counter');
  let current = 0;

  function show(index) {
    current = (index + images.length) % images.length;
    lbImg.src = images[current];
    lbImg.alt = `${event.title} - foto ${current + 1}`;
    lbCounter.textContent = `${current + 1} / ${images.length}`;
  }

  function open(index) {
    show(index);
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Open on thumbnail click
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-index]');
    if (btn) open(parseInt(btn.dataset.index, 10));
  });

  // Navigation buttons
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? show(current - 1) : show(current + 1);
    }
  }, { passive: true });
}

init();

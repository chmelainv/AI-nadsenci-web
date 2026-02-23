const BASE = import.meta.env.BASE_URL;

/**
 * Render navigation — works on both homepage and subpages.
 * On homepage, nav links are anchors (#akce). On subpages, they become absolute URLs.
 */
export function renderNavigation(nav, isSubpage = false) {
  const desktopNav = document.querySelector('nav.hidden.md\\:flex');
  const mobileNav = document.querySelector('#mobile-menu nav');

  if (!nav || !nav.links) return;

  const resolveHref = (href) => {
    if (isSubpage && href.startsWith('#')) {
      return `${BASE}${href}`;
    }
    return href;
  };

  const createLinks = (isMobile) => nav.links.map(link => `
    <a href="${resolveHref(link.href)}" class="${isMobile ? 'block py-2 text-lg text-gray-700 hover:text-blue-700' : 'text-gray-700 hover:text-blue-700 font-medium transition-colors'}">
      ${link.label}
    </a>
  `).join('');

  if (desktopNav) desktopNav.innerHTML = createLinks(false);
  if (mobileNav) mobileNav.innerHTML = createLinks(true);
}

/**
 * Render footer
 */
export function renderFooter(texts, isSubpage = false) {
  const container = document.querySelector('#footer .container');
  if (!container || !texts) return;

  const resolveHref = (href) => {
    if (isSubpage && href.startsWith('#')) {
      return `${BASE}${href}`;
    }
    return href;
  };

  const linksHtml = (section) => section.links.map(link => `
    <li><a href="${resolveHref(link.href)}" class="text-gray-500 hover:text-blue-700 transition-colors">${link.label}</a></li>
  `).join('');

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <div>
        <a href="${BASE}" class="text-xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 bg-clip-text text-transparent block mb-4">
          AI nadšenci
        </a>
        <p class="text-gray-500 mb-6">${texts.description}</p>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-900">${texts.sections.navigation.heading}</h4>
        <ul class="space-y-3">
          ${linksHtml(texts.sections.navigation)}
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-900">${texts.sections.contact.heading}</h4>
        <ul class="space-y-3 text-gray-500">
          <li><a href="mailto:${texts.sections.contact.email}" class="hover:text-blue-700 transition-colors">${texts.sections.contact.email}</a></li>
          <li>${texts.sections.contact.phone}</li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-6 text-gray-900">${texts.sections.social.heading}</h4>
        <div class="flex gap-4">
           ${texts.sections.social.links.map(l => `
             <a href="${l.href}" class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all transform hover:scale-110">
               <span class="sr-only">${l.label}</span>
               <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.492 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg>
             </a>
           `).join('')}
        </div>
      </div>
    </div>

    <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>${texts.copyright}</p>
      <div class="flex items-center gap-2">
        <span>${texts.organizer.label}</span>
        <a href="${texts.organizer.href}" class="font-bold text-gray-900 hover:text-blue-700 transition-colors">${texts.organizer.name}</a>
      </div>
    </div>
  `;
}

/**
 * Setup mobile menu toggle
 */
export function setupMobileMenu(a11y) {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('hidden');
      btn.setAttribute('aria-label', !isExpanded ? a11y.closeMenu : a11y.menuToggle);
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', a11y.menuToggle);
      });
    });
  }
}

/**
 * Shared HTML shell for navigation header (used in subpage HTML files via JS)
 */
export function getNavLogoHref() {
  return BASE;
}

# Prompt pro AI asistenta - Vývoj webu Fajne Prompty

## Instrukce pro asistenta

Jsi expert webový vývojář. Tvým úkolem je vytvořit kompletní web pro "Fajne Prompty" - komunitu AI nadšenců z Moravskoslezského kraje.

---

## Kontext projektu

**Co je Fajne Prompty:**
Neformální komunita AI nadšenců z Moravskoslezského kraje, která pořádá offline akce, kde se lidé setkávají, sdílejí zkušenosti s AI a budují vztahy.

**Cíl webu:**
- Propagovat nadcházející a minulé akce
- Představit komunitu a organizátory
- Získávat nové členy a partnery
- Sbírat kontakty přes newsletter

---

## Technické požadavky

### Stack
- **Framework:** HTML5 + Tailwind CSS + Vanilla JS (nebo Next.js pro škálovatelnost)
- **Font:** Inter (Google Fonts) - sans-serif, optimalizovaný pro čitelnost
- **Content:** JSON soubory - texty a data oddělené od kódu
- **Hosting:** GitHub Pages s automatickým deployem
- **CI/CD:** GitHub Actions - deploy po každém push na main

### Struktura projektu
```
fajne-prompty/
├── .github/workflows/deploy.yml
├── content/                    # ⭐ CONTENT SOUBORY
│   ├── texts.json             # Všechny texty webu
│   ├── organizers.json        # Data organizátorů
│   ├── partners.json          # Data partnerů
│   └── events/                # ⭐ UDÁLOSTI (složka per akce)
│       ├── index.json         # Seznam všech akcí
│       ├── 20251002/          # Fajne prompty #1
│       │   ├── event.json     # Data události
│       │   └── media/         # Média z akce
│       └── 20260323/          # Fajne prompty #2
│           ├── event.json
│           └── media/
├── public/images/
├── src/
├── index.html
└── package.json
```

### Content Management
**DŮLEŽITÉ:** Všechny texty a data MUSÍ být v `/content/*.json` souborech, NE hardcoded v HTML/JSX.

Výhody:
- Editace obsahu bez zásahu do kódu
- Non-tech uživatelé mohou upravovat texty
- Lepší verzování změn

### Accessibility (WCAG 2.1 AA) - POVINNÉ
- Kontrast textu minimálně 4.5:1 (ideálně 7:1+)
- Focus indicators: 3px solid #1e40af, offset 2px
- Touch targets minimálně 44x44px
- Skip navigation link na začátku
- Semantic HTML s ARIA labels
- Alt texty pro všechny obrázky
- 100% keyboard navigation
- Respektovat `prefers-reduced-motion`

### Responzivní design - POVINNÉ
- Mobile-first přístup
- Breakpointy: sm(640px), md(768px), lg(1024px), xl(1280px)
- Fluid typography a spacing

---

## Barevná paleta (Light Mode, Accessible)

```css
/* Primární */
--blue-700: #1e40af;    /* CTA, odkazy, focus */
--purple-700: #7c3aed;  /* Akcenty */
--pink-700: #db2777;    /* Akcenty */

/* Status */
--green-700: #15803d;   /* Success */
--red-700: #b91c1c;     /* Error */

/* Text (všechny 7:1+ kontrast) */
--gray-900: #111827;    /* Hlavní text */
--gray-700: #374151;    /* Sekundární */
--gray-600: #4b5563;    /* Muted */

/* Pozadí */
--white: #ffffff;
--gray-50: #f9fafb;     /* Sekce pozadí */
--blue-50: #eff6ff;     /* Hero pozadí */

/* Bordery */
--gray-300: #d1d5db;    /* Default */
--blue-700: #1e40af;    /* Active/Focus */
```

---

## Content Files (JSON)

**DŮLEŽITÉ:** Použij přiložené JSON soubory jako zdroj všech textů a dat.

### texts.json
Obsahuje: meta info, navigaci, hero sekci, events labels, community texty, partnership texty, footer.

### events/ (složková struktura)
```
events/
├── index.json           # Seznam ID akcí: ["20260323", "20251002"]
├── 20260323/
│   ├── event.json       # Data akce
│   └── media/
│       └── cover.jpg
└── 20251002/
    ├── event.json
    └── media/
        ├── cover.jpg
        ├── gallery/
        └── recap.mp4
```

**event.json struktura:**
```json
{
  "id": "20260323",
  "title": "Fajne prompty #2",
  "date": "23. 3. 2026",
  "time": "17:00 - 22:00",
  "location": "Cafe Club Dock, Ostrava",
  "attendees": 100,
  "price": "349 Kč",
  "status": "open",
  "lumaLink": "https://luma.com/...",
  "description": "...",
  "media": {
    "cover": "media/cover.jpg",
    "gallery": ["media/gallery/01.jpg"],
    "recap": "media/recap.mp4"
  }
}
```

### organizers.json
Obsahuje: pole organizátorů s id, name, bio, linkedin, image.

### partners.json
Obsahuje: pole partnerů s id, name, logo, url, description.

### Použití v kódu (React/Next.js):
```javascript
import texts from '@/content/texts.json';
import eventsIndex from '@/content/events/index.json';

// Načtení eventů
async function loadEvents() {
  const events = await Promise.all(
    eventsIndex.events.map(async (id) => {
      const res = await fetch(`/content/events/${id}/event.json`);
      const event = await res.json();
      event.basePath = `/content/events/${id}/`;
      return event;
    })
  );
  return events;
}

function Hero() {
  return <h1>{texts.hero.claim.line1}</h1>;
}
```

### Použití v plain HTML + JS:
```javascript
async function loadEvents() {
  const indexRes = await fetch('/content/events/index.json');
  const { events: ids } = await indexRes.json();
  
  return Promise.all(ids.map(async (id) => {
    const res = await fetch(`/content/events/${id}/event.json`);
    const event = await res.json();
    event.basePath = `/content/events/${id}/`;
    return event;
  }));
}
```

---

## Struktura webu (Single Page)

```css
/* Primární */
--blue-700: #1e40af;    /* CTA, odkazy, focus */
--purple-700: #7c3aed;  /* Akcenty */
--pink-700: #db2777;    /* Akcenty */

/* Status */
--green-700: #15803d;   /* Success */
--red-700: #b91c1c;     /* Error */

/* Text (všechny 7:1+ kontrast) */
--gray-900: #111827;    /* Hlavní text */
--gray-700: #374151;    /* Sekundární */
--gray-600: #4b5563;    /* Muted */

/* Pozadí */
--white: #ffffff;
--gray-50: #f9fafb;     /* Sekce pozadí */
--blue-50: #eff6ff;     /* Hero pozadí */

/* Bordery */
--gray-300: #d1d5db;    /* Default */
--blue-700: #1e40af;    /* Active/Focus */
```

---

## Struktura webu (Single Page)

### 1. Navigation (sticky)
```
Desktop: [FAJNE PROMPTY logo]  Akce | Komunita | AI Nadšenci | Partneři | Kontakt
Mobile:  [FAJNE PROMPTY logo]                                              [☰]
```
- Sticky top, white background s blur
- Logo: gradient text (blue → purple → pink)

### 2. Hero Section
- Background: blue-50
- Claim: "AI komunita, která věří v offline" (první část gradient)
- Intro text (2 paragrafy)
- 3 CTA tlačítka: Zjistit víc | Nejbližší akce | Přihlásit k odběru
- 3 statistiky: 100+ účastníků | 40+ měsíčně | 120+ členů
- Partner loga: GUG.cz, Černá Kostka

### 3. Events Section
- Heading: "Nadcházející akce" (první slovo gradient)
- Grid 2 sloupce (1 na mobilu)
- Event cards s: obrázek, status badge, info, CTA tlačítka
- "Zobrazit všechny akce" button

### 4. Community Section
- Background: blue-50
- Heading: "Kdo jsme a proč se potkáváme?" (první část gradient)
- 5 paragrafů textu
- 3 organizátor cards

### 5. Partnership Section
- Heading: "Pomozte nám budovat komunitu" (první část gradient)
- 3 paragrafy
- 4 benefits s checkmarks
- 2 CTA tlačítka

### 6. Footer
- 4 sloupce: Logo+popis | Navigace | Kontakt | Social
- Copyright

---

## Event Data

**Viz `events.json`** - obsahuje kompletní data událostí.

**Status badges:**
- open → "Otevřeno" (green-700)
- sold-out → "Vyprodáno" (red-700)
- past → "Proběhlo" (gray-600)

**CTA buttons by status:**
- open: "Koupit lístek" (filled) + "Zjistit víc" (outline)
- past: "Zobrazit recap" (outline)
- sold-out: "Vyprodáno" (disabled)

---

## GitHub Pages Deployment

### Repository struktura
```
fajne-prompty.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── images/
│   │   ├── events/
│   │   └── partners/
│   ├── favicon.ico
│   └── CNAME (pokud custom doména)
├── src/
│   └── ...
├── index.html (nebo app/)
├── package.json
└── README.md
```

### GitHub Actions (deploy.yml)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
```

---

## Výstup

Vytvoř kompletní funkční web včetně:

1. **Všech HTML/JSX souborů** s kompletní strukturou
2. **CSS/Tailwind stylů** s accessible barvami
3. **JavaScript** pro načítání JSON a interaktivitu
4. **Content soubory načítané z JSON** (texts, events, organizers, partners)
5. **GitHub Actions workflow** pro automatický deploy
6. **README.md** s instrukcemi pro setup

### Kvalitativní požadavky:
- Lighthouse Accessibility: 100/100
- Lighthouse Performance: 90+
- Mobile-first responzivní design
- Semantic HTML s ARIA
- Funkční keyboard navigation
- Skip link na začátku
- **Všechny texty z JSON souborů, NE hardcoded**

---

## Poznámky

- Web je v češtině (lang="cs")
- Použij placeholder obrázky z Unsplash pro eventy
- Partner loga budou dodána (použij placeholder)
- Newsletter link: zatím placeholder, bude Mailchimp
- Emoji jsou součástí designu, zachovej je

---

**Začni tvorbou základní struktury a postupně implementuj všechny sekce. Po každé sekci ukaž výsledek.**

# Fajne Prompty - Product Requirements Document (PRD)

## 📋 Metadata

| Položka | Hodnota |
|---------|---------|
| **Projekt** | Fajne Prompty - Web pro AI komunitu |
| **Verze** | 1.0 |
| **Datum** | Leden 2026 |
| **Autor** | Kateřina Švidrnochová |
| **Kontakt** | katerina@svidrnochova.cz |

---

## 1. Přehled projektu

### 1.1 Co je Fajne Prompty?
Fajne Prompty je neformální komunita AI nadšenců z Moravskoslezského kraje. Komunita pořádá offline akce, kde se lidé setkávají, sdílejí zkušenosti s AI a budují vztahy.

### 1.2 Cíl webu
Vytvořit moderní, bezbariérový web, který:
- Propaguje nadcházející a minulé akce komunity
- Představuje komunitu a její organizátory
- Umožňuje získávat nové členy a partnery
- Sbírá kontakty přes newsletter signup

### 1.3 Cílová skupina
- AI nadšenci (začátečníci i pokročilí)
- IT profesionálové z MSK regionu
- Marketéři a business lidé zajímající se o AI
- Potenciální partneři a sponzoři

---

## 2. Technické požadavky

### 2.1 Tech Stack

```yaml
Framework: HTML5 + CSS3 + Vanilla JavaScript
  # NEBO React/Next.js (preferováno pro škálovatelnost)
  
Styling: Tailwind CSS 3.4+
  # Utility-first CSS framework
  
Font: Inter (Google Fonts)
  # Sans-serif, optimalizovaný pro čitelnost
  
Content: JSON soubory
  # Texty a data oddělené od kódu
  
Hosting: GitHub Pages
  # Statický hosting s automatickým deployem
  
CI/CD: GitHub Actions
  # Automatický build a deploy po každém commitu
```

### 2.2 Struktura projektu

```
fajne-prompty/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── content/                     # ⭐ CONTENT SOUBORY
│   ├── texts.json              # Všechny texty webu
│   ├── organizers.json         # Data organizátorů
│   ├── partners.json           # Data partnerů
│   └── events/                 # ⭐ UDÁLOSTI (složka per akce)
│       ├── index.json          # Seznam všech akcí
│       ├── 20251002/           # Fajne prompty #1
│       │   ├── event.json      # Data události
│       │   └── media/          # Média z akce
│       │       ├── cover.jpg
│       │       ├── gallery/
│       │       └── recap.mp4
│       └── 20260323/           # Fajne prompty #2
│           ├── event.json
│           └── media/
│               └── cover.jpg
├── public/
│   ├── images/
│   │   └── partners/           # Loga partnerů
│   ├── favicon.ico
│   └── CNAME                   # Custom doména (volitelné)
├── src/
│   ├── components/             # UI komponenty
│   ├── styles/                 # CSS/Tailwind
│   └── utils/                  # Helper funkce
├── index.html                  # Hlavní HTML
├── package.json
└── README.md
```

### 2.3 Content Management

**Princip:** Všechny texty a data jsou v `/content/` souborech, oddělené od kódu. To umožňuje:
- Editaci obsahu bez zásahu do kódu
- Verzování změn v obsahu
- Snadnou lokalizaci (do budoucna)
- Non-technical uživatelé mohou upravovat texty

**Content soubory:**

| Soubor | Obsah |
|--------|-------|
| `texts.json` | Hero texty, community sekce, partnership sekce, footer |
| `organizers.json` | Pole organizátorů |
| `partners.json` | Pole partnerů s logy |
| `events/index.json` | Seznam ID všech akcí |
| `events/yyyymmdd/event.json` | Data konkrétní události |
| `events/yyyymmdd/media/` | Média z akce (fotky, video, audio) |

**Naming convention pro eventy:**
- Složka: `yyyymmdd` (např. `20260323`)
- Uvnitř: `event.json` + `media/` složka
- Media složka obsahuje: `cover.jpg`, `gallery/`, `recap.mp4`, atd.

### 2.5 Požadavky na hosting

**GitHub Pages Setup:**
```yaml
Repository: fajne-prompty/fajne-prompty.github.io
Branch: main (source) → gh-pages (deploy)
URL: https://fajne-prompty.github.io
  # Nebo vlastní doména: https://fajneprompty.cz
```

**GitHub Actions Workflow:**
- Trigger: Push na `main` branch
- Build: Next.js static export NEBO plain HTML
- Deploy: Automaticky na GitHub Pages
- Cache: Node modules pro rychlejší buildy

### 2.6 Browser Support

| Browser | Verze |
|---------|-------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 2.7 Performance Targets

```yaml
Lighthouse Score:
  Performance: 90+
  Accessibility: 100
  Best Practices: 100
  SEO: 100

Core Web Vitals:
  LCP: < 2.5s
  FID: < 100ms
  CLS: < 0.1
```

---

## 3. Accessibility (WCAG 2.1 AA)

### 3.1 Povinné požadavky

| Požadavek | Specifikace |
|-----------|-------------|
| **Kontrast textu** | Minimálně 4.5:1 (máme 7:1+) |
| **Focus indicators** | 3px solid #1e40af, offset 2px |
| **Touch targets** | Minimálně 44x44px |
| **Skip navigation** | Link na začátku stránky |
| **Semantic HTML** | Správné použití landmarks |
| **ARIA labels** | Pro všechny interaktivní elementy |
| **Alt texty** | Pro všechny obrázky |
| **Keyboard navigation** | 100% funkčnost bez myši |
| **Reduced motion** | Respektovat `prefers-reduced-motion` |

### 3.2 Barevná paleta (Accessible)

```css
/* Primární barvy */
--color-primary: #1e40af;      /* Blue-700, CTA */
--color-secondary: #7c3aed;    /* Purple-700 */
--color-accent: #db2777;       /* Pink-700 */

/* Success/Error */
--color-success: #15803d;      /* Green-700 */
--color-error: #b91c1c;        /* Red-700 */

/* Text (všechny kontrast 7:1+) */
--color-text-primary: #111827;   /* Gray-900 */
--color-text-secondary: #374151; /* Gray-700 */
--color-text-muted: #4b5563;     /* Gray-600 */

/* Backgrounds */
--color-bg-primary: #ffffff;
--color-bg-secondary: #f9fafb;   /* Gray-50 */
--color-bg-accent: #eff6ff;      /* Blue-50 */

/* Borders */
--color-border: #d1d5db;         /* Gray-300 */
--color-border-active: #1e40af;  /* Blue-700 */
```

### 3.3 Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - minimum pro body */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

---

## 4. Struktura webu

### 4.1 Sitemap

```
Homepage (/)
├── #hero          - Hero sekce s claim
├── #akce          - Nadcházející akce
├── #komunita      - O komunitě + organizátoři
├── #partneri      - Partnerská sekce
└── #kontakt       - Footer s kontakty
```

### 4.2 Responzivní breakpointy

```css
/* Mobile first */
sm: 640px    /* Small devices */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
```

---

## 6. Content Files - Specifikace JSON souborů

### 6.1 texts.json

Obsahuje všechny statické texty webu.

```json
{
  "meta": {
    "title": "Fajne Prompty | AI komunita, která věří v offline",
    "description": "Neformální komunita AI nadšenců z Moravskoslezského kraje. Scházíme se na akcích, sdílíme zkušenosti s AI a budujeme vztahy.",
    "keywords": ["AI", "umělá inteligence", "komunita", "Ostrava", "MSK"]
  },
  
  "nav": {
    "logo": "FAJNE PROMPTY",
    "links": [
      { "label": "Akce", "href": "#akce" },
      { "label": "Komunita", "href": "#komunita" },
      { "label": "AI Nadšenci", "href": "#nadsenci" },
      { "label": "Partneři", "href": "#partneri" },
      { "label": "Kontakt", "href": "#kontakt" }
    ]
  },
  
  "hero": {
    "claim": {
      "line1": "AI komunita,",
      "line2": "která věří v offline"
    },
    "intro": [
      "Jsme neformální komunita lidí z Moravskoslezského kraje, kteří neradi zůstávají jen u obrazovek. Scházíme se na akcích, sdílíme zkušenosti s AI a dokazujeme, že nejlepší konverzace jsou tváří v tvář.",
      "Žádné nutné formality, jen lidé, kteří chtějí spolu růst a bavit se u toho. 🚀"
    ],
    "cta": [
      { "label": "Zjistit víc", "href": "#komunita", "style": "outline" },
      { "label": "Nejbližší akce", "href": "#akce", "style": "filled" },
      { "label": "Přihlásit k odběru", "href": "https://mailchimp.com", "style": "secondary", "external": true }
    ],
    "stats": [
      { "value": "100+", "label": "Účastníků na první akci", "color": "blue" },
      { "value": "40+", "label": "Lidí na měsíčních setkáních", "color": "purple" },
      { "value": "120+", "label": "Členů v komunitě", "color": "pink" }
    ],
    "partnersLabel": "Partneři"
  },
  
  "events": {
    "heading": "Nadcházející akce",
    "subheading": "Žádné kravaty, žádné nudné prezentace – jen banda lidí, co se zajímají o AI 🎉",
    "viewAllButton": "Zobrazit všechny akce →",
    "statusLabels": {
      "open": "Otevřeno",
      "sold-out": "Vyprodáno",
      "past": "Proběhlo"
    },
    "buttons": {
      "buyTicket": "Koupit lístek",
      "learnMore": "Zjistit víc",
      "showRecap": "Zobrazit recap",
      "soldOut": "Vyprodáno"
    }
  },
  
  "community": {
    "heading": "Kdo jsme a proč se potkáváme?",
    "paragraphs": [
      "Fajne prompty jsou komunita AI nadšenců, která vznikla v Moravskoslezském kraji – ale jste vítaní všichni, ať už jste z Prahy, Brna, nebo odkudkoli jinud. 🗺️",
      "Naším cílem není jen scrollovat LinkedIn a sledovat AI novinky online. Chceme se potkávat naživo, budovat vztahy, vzájemně si pomáhat a inspirovat se reálnými příběhy z praxe.",
      "Bo AI sice umí hodně, ale kamaráda vám zatím nenajde. 😅",
      "Neřešíme, jestli používáte Claude, ChatGPT, nebo stále Googlete \"jak na AI\" – u nás se chytí každý. Od ajťáků přes marketéry až po ty, co AI zatím využívají jen na recepty z taveného sýra. 🧀",
      "Přijďte na akci, poznejte lidi, co to s AI myslí vážně (ale ne moc), a zjistěte, že nejlepší prompty vznikají ve skupině přátel."
    ],
    "organizersHeading": "Organizátoři"
  },
  
  "partnership": {
    "heading": "Pomozte nám budovat komunitu",
    "paragraphs": [
      "Naše akce nejsou financované z dotací ani grantů. Vše, co děláme, stojí na zapálení organizátorů a podpoře od partnerů, kteří věří ve stejnou vizi jako my.",
      "Pokud chcete být součástí rostoucí AI komunity v MSK a podpořit místo, kde se lidé skutečně potkávají, vzájemně pomáhají a posouvají dopředu – ozvěte se nám.",
      "Nabízíme partnerství šité na míru vašim cílům – od loga na akcích přes přímý kontakt s našimi členy až po prostor pro vaše AI projekty."
    ],
    "benefits": [
      "Dosah k 120+ AI nadšencům z MSK regionu",
      "Logo a zmínka na akcích i sociálních sítích",
      "Přímý kontakt s tech komunitou",
      "Možnost prezentace vašich AI řešení"
    ],
    "cta": [
      { "label": "Stát se partnerem", "href": "mailto:filip@gug.cz", "style": "outline" },
      { "label": "Zjistit víc o partnerství", "href": "#partneri", "style": "secondary" }
    ]
  },
  
  "footer": {
    "description": "Komunita AI nadšenců z Moravskoslezského kraje",
    "sections": {
      "navigation": {
        "heading": "Navigace",
        "links": [
          { "label": "Akce", "href": "#akce" },
          { "label": "Komunita", "href": "#komunita" },
          { "label": "AI Nadšenci", "href": "#nadsenci" },
          { "label": "Partneři", "href": "#partneri" }
        ]
      },
      "contact": {
        "heading": "Kontakt",
        "email": "katerina@svidrnochova.cz",
        "phone": "+420 725 121 217"
      },
      "social": {
        "heading": "Sledujte nás",
        "links": [
          { "label": "LinkedIn", "href": "#", "icon": "linkedin" },
          { "label": "Instagram", "href": "#", "icon": "instagram" }
        ]
      }
    },
    "copyright": "© 2026 Fajne Prompty. Organizováno s ❤️ v Ostravě.",
    "organizer": {
      "label": "Pořadatel:",
      "name": "GUG.cz",
      "href": "https://gug.cz"
    }
  },
  
  "accessibility": {
    "skipLink": "Přejít na hlavní obsah",
    "menuToggle": "Otevřít navigační menu"
  }
}
```

### 6.2 Events - Struktura složek

Každá akce má vlastní složku pojmenovanou podle data `yyyymmdd`.

```
/content/events/
├── index.json              # Seznam všech akcí
├── 20251002/               # Fajne prompty #1
│   ├── event.json          # Data události
│   └── media/              # Média z akce
│       ├── cover.jpg       # Hlavní obrázek
│       ├── gallery/        # Fotogalerie
│       │   ├── 01.jpg
│       │   ├── 02.jpg
│       │   └── ...
│       └── recap.mp4       # Video recap (volitelné)
└── 20260323/               # Fajne prompty #2
    ├── event.json
    └── media/
        └── cover.jpg
```

### 6.3 events/index.json

Seznam všech akcí pro načtení na webu.

```json
{
  "events": [
    "20260323",
    "20251002"
  ]
}
```

**Poznámky:**
- Pořadí v poli určuje pořadí zobrazení (nejnovější první)
- Web načte `index.json`, pak jednotlivé `event.json` soubory

### 6.4 events/yyyymmdd/event.json

Data konkrétní události.

```json
{
  "id": "20251002",
  "title": "Fajne prompty #1",
  "date": "2. 10. 2025",
  "time": "17:00 - 22:00",
  "location": "Bar pod Ostravicí",
  "attendees": 100,
  "price": "349 Kč",
  "status": "past",
  "lumaLink": "https://luma.com/ouuw2s0x",
  "description": "První historické setkání komunity Fajne prompty.",
  "media": {
    "cover": "media/cover.jpg",
    "gallery": [
      "media/gallery/01.jpg",
      "media/gallery/02.jpg"
    ],
    "recap": "media/recap.mp4"
  }
}
```

**Event status hodnoty:**
| Status | Popis |
|--------|-------|
| `open` | Registrace otevřena |
| `sold-out` | Vyprodáno |
| `past` | Akce již proběhla |

**Media objekt:**
| Klíč | Popis | Povinné |
|------|-------|---------|
| `cover` | Hlavní obrázek akce | Ano |
| `gallery` | Pole cest k fotkám z akce | Ne (pouze past) |
| `recap` | Video recap | Ne |

### 6.5 organizers.json

Obsahuje pole organizátorů komunity.

```json
{
  "organizers": [
    {
      "id": 1,
      "name": "Kateřina Švidrnochová",
      "bio": "Legenda praví, že den Kači má 32 hodin a ještě noc. Zvládá školit, tvořit, metodikovat, organizovat.",
      "linkedin": "https://www.linkedin.com/in/svidrnochova/",
      "image": "/images/team/katerina.jpg"
    },
    {
      "id": 2,
      "name": "Martin Chmela",
      "bio": "Patriot, který pomáhá firmám i jednotlivcům automatizovat procesy a využívat AI na maximum.",
      "linkedin": "https://www.linkedin.com/in/martinchmela/",
      "image": "/images/team/martin.jpg"
    },
    {
      "id": 3,
      "name": "Filip Goszler",
      "bio": "Lektor tělem i duší, vykopávač projektů a velký technologický i životní optimista.",
      "linkedin": "https://www.linkedin.com/in/filipgoszler/",
      "image": "/images/team/filip.jpg"
    }
  ]
}
```

### 6.6 partners.json

Obsahuje pole partnerů s jejich logy a odkazy.

```json
{
  "partners": [
    {
      "id": 1,
      "name": "GUG.cz",
      "logo": "/images/partners/gug-logo.png",
      "url": "https://gug.cz",
      "description": "Google User Group Czech Republic"
    },
    {
      "id": 2,
      "name": "Černá Kostka",
      "logo": "/images/partners/cerna-kostka-logo.png",
      "url": "https://cernakostka.cz",
      "description": "Kreativní hub v Ostravě"
    }
  ]
}
```

### 6.7 Jak používat content soubory

**V React/Next.js:**
```javascript
// Import statických JSON souborů
import texts from '@/content/texts.json';
import eventsIndex from '@/content/events/index.json';
import organizers from '@/content/organizers.json';
import partners from '@/content/partners.json';

// Dynamické načtení jednotlivých eventů
async function loadEvents() {
  const eventIds = eventsIndex.events;
  const events = await Promise.all(
    eventIds.map(async (id) => {
      const res = await fetch(`/content/events/${id}/event.json`);
      return res.json();
    })
  );
  return events;
}

// Použití v komponentě
function Hero() {
  return (
    <section>
      <h1>{texts.hero.claim.line1}</h1>
      <h1>{texts.hero.claim.line2}</h1>
      {texts.hero.intro.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </section>
  );
}
```

**V plain HTML + JS:**
```javascript
// Načtení events
async function loadEvents() {
  const indexRes = await fetch('/content/events/index.json');
  const { events: eventIds } = await indexRes.json();
  
  const events = await Promise.all(
    eventIds.map(async (id) => {
      const res = await fetch(`/content/events/${id}/event.json`);
      const event = await res.json();
      // Přidej base path pro média
      event.basePath = `/content/events/${id}/`;
      return event;
    })
  );
  
  return events;
}
```

### 6.8 Jak přidat novou akci

1. **Vytvoř složku** s datem akce:
   ```bash
   mkdir -p content/events/20261015
   ```

2. **Vytvoř `event.json`**:
   ```json
   {
     "id": "20261015",
     "title": "Fajne prompty #3",
     "date": "15. 10. 2026",
     "time": "17:00 - 22:00",
     "location": "Nové místo, Ostrava",
     "attendees": 120,
     "price": "399 Kč",
     "status": "open",
     "lumaLink": "https://luma.com/...",
     "description": "Třetí setkání komunity.",
     "media": {
       "cover": "media/cover.jpg"
     }
   }
   ```

3. **Přidej cover obrázek**:
   ```bash
   mkdir content/events/20261015/media
   cp cover.jpg content/events/20261015/media/
   ```

4. **Aktualizuj `index.json`**:
   ```json
   {
     "events": [
       "20261015",
       "20260323",
       "20251002"
     ]
   }
   ```

5. **Commit a push** → automatický deploy

### 6.9 Jak přidat média k proběhlé akci

1. **Přidej fotky do gallery**:
   ```bash
   mkdir content/events/20251002/media/gallery
   cp fotky/*.jpg content/events/20251002/media/gallery/
   ```

2. **Aktualizuj `event.json`**:
   ```json
   {
     "media": {
       "cover": "media/cover.jpg",
       "gallery": [
         "media/gallery/01.jpg",
         "media/gallery/02.jpg",
         "media/gallery/03.jpg"
       ],
       "recap": "media/recap.mp4"
     }
   }
   ```

3. **Změň status na `past`** (pokud ještě není)

### 6.10 Pravidla pro editaci content souborů

1. **Zachovej strukturu** - neměň klíče, pouze hodnoty
2. **Escape speciální znaky** - uvozovky jako `\"`
3. **Emoji jsou OK** - JSON podporuje UTF-8
4. **Testuj JSON validitu** - použij jsonlint.com před commitem
5. **Verzuj změny** - každá změna = nový commit s popisem

---

## 7. Sekce webu - Detailní specifikace

### 7.1 Navigation

**Layout:**
```
Desktop: [LOGO]  Akce | Komunita | AI Nadšenci | Partneři | Kontakt
Mobile:  [LOGO]                                              [☰]
```

**Specifikace:**
- Position: `sticky top-0`
- Background: `white/90` s `backdrop-blur`
- Border: `border-b-2 border-gray-300`
- Shadow: `shadow-sm`
- Z-index: `50`

**Logo:**
```
Text: "FAJNE PROMPTY"
Style: Gradient text (blue → purple → pink)
Font: Inter Bold
```

**Menu items:**
- Font: 14px, medium weight
- Hover: `text-blue-700`
- Active: Underline nebo background
- Mobile: Burger menu (hamburger icon)

**Accessibility:**
```html
<nav role="navigation" aria-label="Hlavní navigace">
```

---

### 7.2 Hero Section

**Layout:**
```
┌─────────────────────────────────────────┐
│         [Background: Blue-50]           │
│                                         │
│         AI komunita,                    │
│         která věří v offline            │
│                                         │
│   [Intro text - 2 paragrafy]            │
│                                         │
│   [CTA 1] [CTA 2] [CTA 3]              │
│                                         │
│   ┌───────┐ ┌───────┐ ┌───────┐       │
│   │ 100+  │ │  40+  │ │ 120+  │       │
│   │ stat  │ │ stat  │ │ stat  │       │
│   └───────┘ └───────┘ └───────┘       │
│                                         │
│           PARTNEŘI                      │
│     [GUG.CZ]    [ČERNÁ KOSTKA]         │
│                                         │
└─────────────────────────────────────────┘
```

**Claim:**
```
AI komunita,
která věří v offline
```

**Gradient style pro "AI komunita,":**
```css
.accessible-gradient {
  background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #db2777 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Intro text (paragraf 1):**
```
Jsme neformální komunita lidí z Moravskoslezského kraje, kteří neradi 
zůstávají jen u obrazovek. Scházíme se na akcích, sdílíme zkušenosti 
s AI a dokazujeme, že nejlepší konverzace jsou tváří v tvář.
```

**Intro text (paragraf 2):**
```
Žádné nutné formality, jen lidé, kteří chtějí spolu růst a bavit se u toho. 🚀
```

**CTA tlačítka:**

| Tlačítko | Text | Link | Style |
|----------|------|------|-------|
| Primary outline | Zjistit víc | #komunita | Border blue-700, text blue-700 |
| Primary filled | Nejbližší akce | #akce | Bg blue-700, text white |
| Secondary | Přihlásit k odběru | Mailchimp URL | Border gray-400 |

**Statistiky:**

| Číslo | Label | Border color |
|-------|-------|--------------|
| 100+ | Účastníků na první akci | Blue-700 |
| 40+ | Lidí na měsíčních setkáních | Purple-700 |
| 120+ | Členů v komunitě | Pink-700 |

**Partner loga:**
- Label: "PARTNEŘI" (uppercase, gray-600, small)
- Loga: GUG.cz, Černá Kostka
- Layout: Flex row, gap 48px
- Logo height: 40px
- Hover: Scale 1.1, opacity 100%

---

### 7.3 Events Section

**Heading:**
```
Nadcházející akce
```
("Nadcházející " má gradient)

**Subheading:**
```
Žádné kravaty, žádné nudné prezentace – jen banda lidí, co se zajímají o AI 🎉
```

**Event Card Layout:**
```
┌─────────────────────────────────┐
│                                 │
│   [IMAGE - event photo]         │
│                  [STATUS BADGE] │
│                                 │
├─────────────────────────────────┤
│                                 │
│   Event Title (gradient)        │
│                                 │
│   📅 Datum                      │
│      Čas                        │
│   📍 Místo                      │
│   👥 Počet účastníků            │
│   💰 Cena                       │
│                                 │
│   [CTA BUTTON(S)]               │
│                                 │
└─────────────────────────────────┘
```

**Event Data Structure:**
```typescript
interface Event {
  id: number;
  title: string;           // "Fajne prompty #2"
  date: string;            // "23. 3. 2026"
  time: string;            // "17:00 - 22:00"
  location: string;        // "Cafe Club Dock, Ostrava"
  attendees: number;       // 100
  price: string;           // "349 Kč"
  status: "open" | "sold-out" | "past";
  lumaLink: string;        // "https://luma.com/..."
  image: string;           // "/images/events/event1.jpg"
  recap?: boolean;         // true (pouze pro "past")
}
```

**Status Badges:**

| Status | Text | Background | Text color |
|--------|------|------------|------------|
| open | Otevřeno | Green-700 | White |
| sold-out | Vyprodáno | Red-700 | White |
| past | Proběhlo | Gray-600 | White |

**CTA Buttons by Status:**

| Status | Button 1 | Button 2 |
|--------|----------|----------|
| open | "Koupit lístek" (filled) | "Zjistit víc" (outline) |
| past | "Zobrazit recap" (outline) | - |
| sold-out | "Vyprodáno" (disabled) | - |

**Sample Events Data:**
```javascript
const events = [
  {
    id: 1,
    title: "Fajne prompty #2",
    date: "23. 3. 2026",
    time: "17:00 - 22:00",
    location: "Cafe Club Dock, Ostrava",
    attendees: 100,
    price: "349 Kč",
    status: "open",
    lumaLink: "https://luma.com/ouuw2s0x",
    image: "/images/events/event2.jpg"
  },
  {
    id: 2,
    title: "Fajne prompty #1",
    date: "2. 10. 2025",
    time: "17:00 - 22:00",
    location: "Bar pod Ostravicí",
    attendees: 100,
    price: "349 Kč",
    status: "past",
    lumaLink: "https://luma.com/ouuw2s0x",
    image: "/images/events/event1.jpg",
    recap: true
  }
];
```

**Card Hover:**
```css
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: #1e40af;
}
```

**"Zobrazit všechny akce" Button:**
- Text: "Zobrazit všechny akce →"
- Style: Outline, blue-700 border
- Position: Centered below cards

---

### 7.4 Community Section (Kdo jsme)

**Background:** Blue-50

**Heading:**
```
Kdo jsme a proč se potkáváme?
```
("Kdo jsme " má gradient)

**Content (5 paragrafů):**

```
Paragraf 1:
Fajne prompty jsou komunita AI nadšenců, která vznikla v Moravskoslezském 
kraji – ale jste vítaní všichni, ať už jste z Prahy, Brna, nebo odkudkoli jinud. 🗺️

Paragraf 2:
Naším cílem není jen scrollovat LinkedIn a sledovat AI novinky online. 
Chceme se potkávat naživo, budovat vztahy, vzájemně si pomáhat a inspirovat 
se reálnými příběhy z praxe.

Paragraf 3:
Bo AI sice umí hodně, ale kamaráda vám zatím nenajde. 😅

Paragraf 4:
Neřešíme, jestli používáte Claude, ChatGPT, nebo stále Googlete "jak na AI" – 
u nás se chytí každý. Od ajťáků přes marketéry až po ty, co AI zatím využívají 
jen na recepty z taveného sýra. 🧀

Paragraf 5:
Přijďte na akci, poznejte lidi, co to s AI myslí vážně (ale ne moc), 
a zjistěte, že nejlepší prompty vznikají ve skupině přátel.
```

**Organizátoři Subheading:**
```
Organizátoři
```
(gradient text)

**Organizátoři Data:**
```javascript
const organizers = [
  {
    name: "Kateřina Švidrnochová",
    bio: "Legenda praví, že den Kači má 32 hodin a ještě noc. Zvládá školit, tvořit, metodikovat, organizovat.",
    linkedin: "https://www.linkedin.com/in/svidrnochova/"
  },
  {
    name: "Martin Chmela",
    bio: "Patriot, který pomáhá firmám i jednotlivcům automatizovat procesy a využívat AI na maximum.",
    linkedin: "https://www.linkedin.com/in/martinchmela/"
  },
  {
    name: "Filip Goszler",
    bio: "Lektor tělem i duší, vykopávač projektů a velký technologický i životní optimista.",
    linkedin: "https://www.linkedin.com/in/filipgoszler/"
  }
];
```

**Organizer Card:**
```
┌───────────────────────┐
│                       │
│   Name (gradient)     │
│                       │
│   Bio text...         │
│                       │
│   LinkedIn profil →   │
│                       │
└───────────────────────┘
```

- Border: gray-300, hover → blue-600
- Background: white
- Padding: 24px
- Border radius: 8px

---

### 7.5 Partnership Section

**Background:** White

**Heading:**
```
Pomozte nám budovat komunitu
```
("Pomozte nám " má gradient)

**Content (3 paragrafy):**

```
Paragraf 1:
Naše akce nejsou financované z dotací ani grantů. Vše, co děláme, 
stojí na zapálení organizátorů a podpoře od partnerů, kteří věří 
ve stejnou vizi jako my.

Paragraf 2:
Pokud chcete být součástí rostoucí AI komunity v MSK a podpořit místo, 
kde se lidé skutečně potkávají, vzájemně pomáhají a posouvají dopředu – 
ozvěte se nám.

Paragraf 3:
Nabízíme partnerství šité na míru vašim cílům – od loga na akcích 
přes přímý kontakt s našimi členy až po prostor pro vaše AI projekty.
```

**Benefits (4 položky):**
```
✓ Dosah k 120+ AI nadšencům z MSK regionu
✓ Logo a zmínka na akcích i sociálních sítích
✓ Přímý kontakt s tech komunitou
✓ Možnost prezentace vašich AI řešení
```

- Checkmark: Green-700
- Layout: 2 columns (desktop), 1 column (mobile)

**CTA Buttons:**

| Button | Text | Link | Style |
|--------|------|------|-------|
| Primary | Stát se partnerem | mailto:filip@gug.cz | Outline blue-700 |
| Secondary | Zjistit víc o partnerství | #partneri | Outline gray-400 |

---

### 7.6 Footer

**Background:** Gray-50
**Border:** border-t-2 border-gray-300

**Layout (4 columns):**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ FAJNE       │ Navigace    │ Kontakt     │ Sledujte    │
│ PROMPTY     │             │             │ nás         │
│             │ • Akce      │ email       │             │
│ Komunita AI │ • Komunita  │ telefon     │ • LinkedIn  │
│ nadšenců... │ • Nadšenci  │             │ • Instagram │
│             │ • Partneři  │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┘

© 2026 Fajne Prompty. Organizováno s ❤️ v Ostravě.
Pořadatel: GUG.cz
```

**Kontakt:**
```
Email: katerina@svidrnochova.cz
Telefon: +420 725 121 217
```

**Footer note:**
```
© 2026 Fajne Prompty. Organizováno s ❤️ v Ostravě.
Pořadatel: GUG.cz
```

---

## 8. Assets

### 6.1 Obrázky

| Asset | Rozměry | Formát | Umístění |
|-------|---------|--------|----------|
| Event photos | 800x600px min | JPG/WebP | /images/events/ |
| Partner logos | auto x 40px | PNG/SVG | /images/partners/ |
| OG Image | 1200x630px | PNG | /images/og-image.png |
| Favicon | 32x32, 16x16 | ICO/PNG | /favicon.ico |

### 6.2 Partner Logos

**Dodaná loga:**
1. GUG.cz - `gug-logo.png`
2. Černá Kostka - `cerna-kostka-logo.png`

**Styling:**
- Na light mode: Původní barvy
- Hover: `opacity: 0.8 → 1`, `scale: 1.1`

### 6.3 Ikony

Použít emoji pro event info:
- 📅 Datum/čas
- 📍 Místo
- 👥 Účastníci
- 💰 Cena
- ✓ Checkmarks (green-700)

---

## 9. Interakce a animace

### 7.1 Transitions

```css
/* Default transition */
transition: all 0.2s ease;

/* Buttons */
button:hover { transform: scale(1.02); }

/* Cards */
.card:hover { 
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Links */
a:hover { color: #1e40af; }
```

### 7.2 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7.3 Focus States

```css
*:focus-visible {
  outline: 3px solid #1e40af;
  outline-offset: 2px;
}
```

---

## 10. GitHub Pages Deployment

### 8.1 Repository Setup

```bash
# Název repository
fajne-prompty.github.io

# Nebo pro custom doménu
fajne-prompty-web
```

### 8.2 GitHub Actions Workflow

**Soubor:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out  # Pro Next.js static export
          # path: ./dist  # Pro Vite
          # path: ./build  # Pro Create React App

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 8.3 Next.js Configuration (pokud použito)

**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Pro custom doménu není potřeba basePath
  // Pro GitHub Pages bez custom domény:
  // basePath: '/fajne-prompty-web',
}

module.exports = nextConfig
```

### 8.4 Custom Domain (volitelné)

**Soubor:** `public/CNAME`
```
fajneprompty.cz
```

**DNS záznamy u registrátora:**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Name: www
Value: fajne-prompty.github.io
```

---

## 11. SEO

### 9.1 Meta Tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Fajne Prompty - Neformální komunita AI nadšenců z Moravskoslezského kraje. Scházíme se na akcích, sdílíme zkušenosti s AI a budujeme vztahy.">
  <meta name="keywords" content="AI, umělá inteligence, komunita, Ostrava, MSK, Moravskoslezský kraj, prompty, ChatGPT, Claude">
  <meta name="author" content="Fajne Prompty">
  <meta name="robots" content="index, follow">
  
  <title>Fajne Prompty | AI komunita, která věří v offline</title>
  
  <!-- Open Graph -->
  <meta property="og:title" content="Fajne Prompty | AI komunita, která věří v offline">
  <meta property="og:description" content="Neformální komunita AI nadšenců z MSK. Scházíme se na akcích a sdílíme zkušenosti.">
  <meta property="og:image" content="https://fajneprompty.cz/images/og-image.png">
  <meta property="og:url" content="https://fajneprompty.cz">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="cs_CZ">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Fajne Prompty | AI komunita, která věří v offline">
  <meta name="twitter:description" content="Neformální komunita AI nadšenců z MSK.">
  <meta name="twitter:image" content="https://fajneprompty.cz/images/og-image.png">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Language -->
  <html lang="cs">
</head>
```

### 9.2 Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fajne Prompty",
  "description": "Komunita AI nadšenců z Moravskoslezského kraje",
  "url": "https://fajneprompty.cz",
  "email": "katerina@svidrnochova.cz",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ostrava",
    "addressRegion": "Moravskoslezský kraj",
    "addressCountry": "CZ"
  }
}
</script>
```

---

## 12. Checklist před spuštěním

### 10.1 Development
- [ ] Všechny sekce implementovány
- [ ] Responzivní design funguje
- [ ] Accessibility audit passed (Lighthouse 100)
- [ ] Cross-browser testing
- [ ] Performance optimalizace

### 10.2 Content
- [ ] Všechny texty finální
- [ ] Event data aktuální
- [ ] Partner loga nahrána
- [ ] Alt texty pro všechny obrázky

### 10.3 Technical
- [ ] GitHub Actions workflow funguje
- [ ] Automatický deploy po commitu
- [ ] HTTPS aktivní
- [ ] Custom doména (pokud použita)
- [ ] 404 stránka

### 10.4 SEO
- [ ] Meta tags
- [ ] OG image
- [ ] Favicon
- [ ] robots.txt
- [ ] sitemap.xml

---

## 13. Kontakty

**Technické dotazy:**
- Kateřina Švidrnochová
- katerina@svidrnochova.cz
- +420 725 121 217

**Partnerství:**
- Filip Goszler
- filip@gug.cz
- +420 774 670 137

**Pořadatel:**
- GUG.cz
- https://gug.cz

---

## 14. Event Aktivity Systém

Systém pro sběr a zobrazení aktivit od účastníků během akcí. Umožňuje týmům odeslat výsledek své práce (foto + popis) přímo z mobilu. Organizátor PR schválí a výsledky se automaticky zobrazí na webu.

### 14.1 Přehled architektury

```
Účastník vyplní formulář (/odevzdat/)
    ↓
n8n webhook přijme multipart/form-data
    ↓
n8n vytvoří GitHub branch + commitne foto + activities.json
    ↓
n8n vytvoří Pull Request
    ↓
Organizátor PR schválí v GitHubu
    ↓
GitHub Actions spustí build (~90 s)
    ↓
Výsledky se zobrazí na /rozcestnik/?event=ID
```

### 14.2 Stránky

| Stránka | URL | Popis |
|---------|-----|-------|
| Formulář odevzdání | `/odevzdat/?event=ID&team=NázevTýmu` | Účastníci odevzdávají aktivitu |
| Přehled aktivit | `/rozcestnik/?event=ID` | 2-sloupcová galerie karet týmů |
| Admin – jedna aktivita | `/admin/aktivita.html` | Správa obsahu `/aktivita/` stránky |
| Admin – rozcestník | `/admin/rozcestnik.html` | Správa per-event aktivit v rozcestníku |

### 14.3 Formulář odevzdání (`/odevzdat/`)

**Soubor:** `public/odevzdat/index.html`

**Funkce:**
- Předvyplnění týmu z URL parametru `?team=NázevTýmu`
- Event ID z URL parametru `?event=ID`
- Canvas resize fotky na max 1200px, JPEG kvalita 0.82 (před odesláním)
- Drag & drop nebo click-to-upload
- Odeslání přes `multipart/form-data` POST na n8n webhook
- Stavy: formulář / odesílám (spinner) / úspěch / chyba

**Konfigurace:**
```javascript
const WEBHOOK_URL = 'https://auto.maronext.cz/webhook/submission';
const PHOTO_MAX_PX  = 1200;
const PHOTO_QUALITY = 0.82;
```

**Každý tým dostane unikátní odkaz:**
```
https://fajneprompty.cz/odevzdat/?event=20260323&team=N%C3%A1zevT%C3%BDmu
```

### 14.4 n8n Workflow

**Soubor:** `n8n/submission-workflow.json` (importovatelný do n8n)

**Nodes (sekvenční řetězec):**

| # | Node | Typ | Popis |
|---|------|-----|-------|
| 1 | Webhook | Webhook | Příjme POST na `/webhook/submission` |
| 2 | Připrav data | Code | Extrahuje pole z `body.*`, načte binární foto přes `getBinaryDataBuffer`, sestaví cesty |
| 3 | Načti HEAD main | HTTP GET | Získá SHA aktuálního commitu main větve |
| 4 | Vytvoř větev | HTTP POST | Vytvoří `submission/{eventId}-{timestamp}` větev |
| 5 | Načti activities.json | HTTP GET | Načte existující soubor (continueOnFail=true — soubor nemusí existovat) |
| 6 | Sestav activities.json | Code | Dekóduje existující, přidá novou aktivitu, zakóduje zpět do base64; extrahuje `sha` pro aktualizaci |
| 7 | Nahraj fotku | HTTP PUT | GitHub Contents API — uloží foto do `public/images/submissions/{eventId}/{ts}.jpg` |
| 8 | Připrav JSON upload | Code | Sestaví `uploadUrl` a `uploadBody` jako plain string (obchází omezení n8n expression parseru) |
| 9 | Nahraj activities.json | HTTP PUT | `url: {{ $json.uploadUrl }}`, `body: {{ $json.uploadBody }}` |
| 10 | Vytvoř PR | HTTP POST | Vytvoří PR s názvem `🎯 Aktivita: {team}` |
| 11 | Odpověz 200 | Respond | Vrátí `{"ok": true}` formuláři |

**Klíčové technické detaily:**

- **multipart/form-data**: textová pole jsou pod `item.json.body.*`, ne `item.json.*`
- **Binary storage**: n8n v2 s `filesystem-v2` neukládá base64 inline — nutno použít `this.helpers.getBinaryDataBuffer(0, 'photo')`
- **GitHub SHA**: při aktualizaci existujícího souboru musí PUT obsahovat `sha` — jinak GitHub vrátí 422
- **Sekvenční chain**: uzly musí být za sebou (ne paralelně), jinak n8n spustí PR dřív než se nahraje JSON
- **Header Auth credential**: Name pole = `Authorization`, Value = `token ghp_xxx`

**Datová struktura activities.json:**
```json
{
  "eventId": "20260323",
  "title": "",
  "activities": [
    {
      "id": "1742600000000",
      "title": "Název týmu",
      "description": "Popis aktivity...",
      "url": "",
      "btnLabel": "Zobrazit",
      "photo": "/images/submissions/20260323/1742600000000.jpg"
    }
  ]
}
```

**Umístění:** `public/content/events/{eventId}/activities.json`

### 14.5 Přehled aktivit (`/rozcestnik/`)

**Soubor:** `public/rozcestnik/index.html`

**Funkce:**
- Načítá `?event=ID` z URL, stáhne `/content/events/{ID}/activities.json`
- 2-sloupcová grid galerie karet
- Každá karta: foto (180px výška), název týmu, popis (80 znaků + Zobrazit více/méně), volitelné tlačítko s URL
- Odkaz na detail akce (`/akce/detail.html?id=ID`) a zpět na web (`/`)
- Cache bust: `?t=Date.now()` při fetch

### 14.6 Admin stránky

**Admin – jedna aktivita** (`/admin/aktivita.html`):
- Spravuje obsah stránky `/aktivita/` (jeden AI asistent pro akci)
- Data v `public/content/activity.json`
- Atomický commit přes GitHub Trees API (1 commit = 1 build)
- GitHub token uložen v `localStorage`
- Live preview

**Admin – rozcestník** (`/admin/rozcestnik.html`):
- Spravuje per-event aktivity v rozcestníku
- Vybírá event z `public/content/events/index.json` (`{ "events": ["20260323", ...] }`)
- Přidává karty do `public/content/events/{eventId}/activities.json`
- Atomický commit přes GitHub Trees API

### 14.7 Workflow pro organizátora během akce

1. Vytvoř QR kódy pro každý tým (URL s `?event=ID&team=Název`)
2. Týmy vyplní formulář z mobilu během akce
3. V GitHubu se objeví PR za každý tým
4. Schval PR (nebo všechny najednou) — build proběhne automaticky (~90 s)
5. Výsledky jsou živé na `/rozcestnik/?event=ID`

---

## 15. Changelog

| Verze | Datum | Změny |
|-------|-------|-------|
| 1.0 | Leden 2026 | Initial PRD |
| 1.1 | Březen 2026 | Přidán Event Aktivity Systém: /aktivita/, /rozcestnik/, /odevzdat/, admin stránky, n8n workflow |

---

*Dokument vytvořen pro vývoj webu Fajne Prompty*
*Poslední aktualizace: Březen 2026*

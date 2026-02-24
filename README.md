# AI nadšenci Web

Komunitní web pro AI nadšence - neformální komunitu lidí v Moravskoslezském kraji, kteří se zajímají o AI a scházejí se offline.

**Live:** [https://chmelainv.github.io/AI-nadsenci-web/](https://chmelainv.github.io/AI-nadsenci-web/)

## Technologie
- **HTML5** - sémantická struktura
- **Tailwind CSS** - styling a design system
- **Vanilla JavaScript** - logika a vykreslování
- **Vite** - build tool
- **GitHub Pages** - hosting (auto-deploy z `main`)

## Struktura projektu
```
AI-nadsenci-web/
├── .github/workflows/    # CI/CD (GitHub Actions → Pages)
├── akce/                 # Podstránky akcí
│   ├── index.html        # Výpis všech akcí
│   └── detail.html       # Detail akce (galerie, recap, video)
├── content/              # JSON data
│   ├── texts.json        # Globální texty, navigace, footer
│   ├── organizers.json   # Organizátoři
│   ├── partners.json     # Partneři
│   └── events/           # Akce (každá ve vlastní složce)
│       ├── index.json    # Seznam ID akcí
│       └── {id}/         # Složka akce
│           ├── event.json  # Data akce
│           └── media/      # Cover, galerie, video
├── public/               # Statické soubory (obrázky)
├── src/
│   ├── style.css         # Tailwind entry point
│   ├── main.js           # Homepage logika
│   ├── shared.js         # Sdílené komponenty (nav, footer, menu)
│   ├── akce.js           # Výpis akcí
│   └── akce-detail.js    # Detail akce + lightbox galerie
├── index.html            # Homepage
├── vite.config.js        # Build konfigurace (multi-page)
└── tailwind.config.js    # Tailwind konfigurace
```

## Instalace a spuštění

```bash
npm install       # Instalace závislostí
npm run dev       # Lokální dev server
npm run build     # Produkční build (do out/)
npm run preview   # Náhled produkčního buildu
```

## Správa obsahu

Veškerý obsah je v JSON souborech ve složce `content/`.

### Přidání nové akce
1. Vytvoř složku `content/events/{YYYYMMDD}/`
2. Přidej `event.json` s daty akce (viz existující akce jako vzor)
3. Přidej cover obrázek do `media/`
4. Přidej ID do `content/events/index.json`

### Statusy akcí
- `open` - nadcházející, prodej lístků otevřen
- `sold-out` - vyprodáno (zobrazí disabled tlačítko + odkaz na detail)
- `past` - proběhlá (zobrazí recap, galerii, video)

### Galerie a recap (pro proběhlé akce)
- Fotky přidej do `content/events/{id}/media/` a vyplň pole `gallery` v `event.json`
- Recap video přidej do `media/` a vyplň `media.recap`
- Text recapu vyplň v `recapText`

### Stránky
- **Homepage** (`/`) - zobrazuje max 2 nejbližší akce
- **Výpis akcí** (`/akce/`) - všechny akce (nadcházející + proběhlé)
- **Detail akce** (`/akce/detail.html?id={id}`) - plný detail s galerií a lightboxem

## Design
Font Inter, vlastní barevná paleta v `tailwind.config.js`.

## Deployment
Web se automaticky deployuje na GitHub Pages přes GitHub Actions po pushnutí do `main` větve.

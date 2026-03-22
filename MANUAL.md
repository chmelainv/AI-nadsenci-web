# Správa webu AI nadšenci — uživatelský manuál

## Obsah
1. [Jak web funguje](#jak-web-funguje)
2. [Přidání nové akce](#přidání-nové-akce)
3. [Úprava existující akce](#úprava-existující-akce)
4. [Uzavření akce po proběhnutí (recap)](#uzavření-akce-po-proběhnutí)
5. [Editace textů na webu](#editace-textů-na-webu)
6. [Správa organizátorů](#správa-organizátorů)
7. [Správa partnerů](#správa-partnerů)
8. [Kontakt a footer](#kontakt-a-footer)
9. [Publikování změn (deploy)](#publikování-změn-deploy)
10. [Event aktivity — sběr výsledků od týmů](#event-aktivity--sběr-výsledků-od-týmů)

---

## Jak web funguje

Web je postaven na principu **JSON-driven obsahu** — veškerý obsah (akce, texty, organizátoři, partneři) je uložen v textových souborech ve složce `public/content/`. Webový kód tato data načítá a zobrazuje.

**Nemusíš umět programovat.** Pro 99 % změn stačí editovat tyto soubory:

```
public/
└── content/
    ├── texts.json          ← texty na celém webu (homepage, navigace, footer)
    ├── organizers.json     ← tým organizátorů
    ├── partners.json       ← partneři
    └── events/
        ├── index.json      ← seznam akcí (jejich pořadí)
        └── 20260323/       ← složka jedné akce (název = datum RRRRMMDD)
            ├── event.json  ← data akce
            └── media/      ← obrázky a videa akce
```

---

## Přidání nové akce

### Krok 1 — Vytvoř složku akce

Ve složce `public/content/events/` vytvoř novou složku s názvem ve formátu **RRRRMMDD** (rok, měsíc, den):

```
public/content/events/20260420/
```

Uvnitř vytvoř podsložku `media/`:

```
public/content/events/20260420/media/
```

### Krok 2 — Přidej obrázky

Do složky `media/` nahraj:
- **`cover.png`** (nebo `.jpg`) — hlavní obrázek akce (zobrazuje se na kartě i v detailu)

### Krok 3 — Vytvoř soubor `event.json`

Ve složce `public/content/events/20260420/` vytvoř soubor `event.json` s tímto obsahem:

```json
{
  "id": "20260420",
  "title": "Fajne prompty #3",
  "date": "20. 4. 2026",
  "time": "17:00 - 22:00",
  "location": "Cafe Club Dock, Ostrava",
  "attendees": 100,
  "price": "490 Kč",
  "status": "open",
  "lumaLink": "https://lu.ma/tvuj-odkaz",
  "description": "Krátký popis akce (zobrazuje se na kartě v seznamu akcí).",
  "longDescription": "Delší popis pro stránku detailu akce.\nNový odstavec začni na novém řádku za \\n.",
  "media": {
    "cover": "media/cover.png"
  }
}
```

**Vysvětlení polí:**

| Pole | Popis | Příklad |
|---|---|---|
| `id` | Musí odpovídat názvu složky | `"20260420"` |
| `title` | Název akce | `"Fajne prompty #3"` |
| `date` | Datum — volný text | `"20. 4. 2026"` |
| `time` | Čas | `"17:00 - 22:00"` |
| `location` | Místo konání | `"Cafe Club Dock, Ostrava"` |
| `attendees` | Kapacita (číslo) | `100` |
| `price` | Cena | `"490 Kč"` |
| `status` | Stav akce — viz níže | `"open"` |
| `lumaLink` | Odkaz na registraci (Luma) | `"https://lu.ma/..."` |
| `description` | Krátký popis (karta) | max. 1-2 věty |
| `longDescription` | Dlouhý popis (detail stránka) | odstavce odděluj `\n` |
| `media.cover` | Cesta k hlavnímu obrázku | `"media/cover.png"` |

**Hodnoty pole `status`:**

| Hodnota | Zobrazení na webu |
|---|---|
| `"open"` | Zelený štítek "Otevřeno" — aktivní tlačítko registrace |
| `"sold-out"` | Červený štítek "Vyprodáno" — tlačítko nefunkční |
| `"past"` | Šedý štítek "Proběhlo" — zobrazí se recap sekce |

### Krok 4 — Zaregistruj akci do seznamu

Otevři soubor `public/content/events/index.json` a přidej ID nové akce **na začátek** seznamu:

```json
{
  "events": ["20260420", "20260323", "20260223", "20260113", "20251002"]
}
```

> **Důležité:** Akce jsou na webu zobrazeny v pořadí, v jakém jsou v tomto seznamu. Nejnovější akce patří na začátek.

---

## Úprava existující akce

Otevři soubor `public/content/events/{ID akce}/event.json` a uprav libovolné pole.

**Příklady:**

- Změna statusu na vyprodáno: `"status": "sold-out"`
- Aktualizace odkazu na Lumu: `"lumaLink": "https://lu.ma/novy-odkaz"`
- Úprava popisu: edituj `"description"` nebo `"longDescription"`

> Při editaci `longDescription` používej `\n` pro odřádkování (nový odstavec).

---

## Uzavření akce po proběhnutí

Po skončení akce proveď tyto kroky:

### 1. Změň status

```json
"status": "past"
```

### 2. Přidej recap text

Do `event.json` přidej pole `recapText`:

```json
"recapText": "Jak to bylo — shrnutí akce pro veřejnost.\nMůžeš psát více odstavců oddělených \\n.\nPoděkuj účastníkům, shrň highlights."
```

### 3. Přidej fotogalerii

Nahraj fotky do složky `media/` a zaregistruj je v `event.json`:

```json
"media": {
  "cover": "media/cover.png",
  "gallery": [
    "media/FOTO-01.jpg",
    "media/FOTO-02.jpg",
    "media/FOTO-03.jpg"
  ],
  "recap": "media/recap-video.mp4"
}
```

> - `gallery` — pole s cestami k fotkám (zobrazí se v lightbox galerii)
> - `recap` — cesta k recap videu (MP4, zobrazí se v přehrávači)
> - Oba prvky jsou volitelné — přidej je jen pokud máš materiály

**Příklad hotového `event.json` pro proběhlou akci:**

```json
{
  "id": "20260420",
  "title": "Fajne prompty #3",
  "date": "20. 4. 2026",
  "time": "17:00 - 22:00",
  "location": "Cafe Club Dock, Ostrava",
  "attendees": 87,
  "price": "490 Kč",
  "status": "past",
  "lumaLink": "#",
  "description": "Třetí setkání komunity AI nadšenci. AI, networking a pivo.",
  "longDescription": "Popis akce...",
  "recapText": "Třetí Fajne prompty byly opět skvělé.\nDěkujeme všem účastníkům!",
  "media": {
    "cover": "media/cover.png",
    "gallery": [
      "media/FOTO-01.jpg",
      "media/FOTO-02.jpg"
    ],
    "recap": "media/recap.mp4"
  }
}
```

---

## Editace textů na webu

Všechny texty na webu jsou v souboru `public/content/texts.json`.

### Homepage — hlavní claim

```json
"hero": {
  "claim": {
    "line1": "AI komunita,",
    "line2": "která věří v offline"
  },
  "intro": [
    "První odstavec úvodního textu.",
    "Druhý odstavec úvodního textu."
  ],
  ...
}
```

### Statistiky (čísla na homepage)

```json
"stats": [
  { "value": "100+", "label": "Účastníků na první akci", "color": "blue" },
  { "value": "40+",  "label": "Lidí na měsíčních setkáních", "color": "purple" },
  { "value": "120+", "label": "Členů v komunitě", "color": "pink" }
]
```

Uprav `"value"` a `"label"`. `"color"` nechej beze změny.

### Sekce Komunita (kdo jsme)

```json
"community": {
  "heading": "Kdo jsme a proč se potkáváme?",
  "paragraphs": [
    "První odstavec.",
    "Druhý odstavec.",
    "..."
  ]
}
```

Každý odstavec je samostatný prvek v poli `paragraphs`.

### Sekce Partnerství

```json
"partnership": {
  "heading": "Pomozte nám budovat komunitu",
  "paragraphs": ["..."],
  "benefits": [
    "Benefit 1",
    "Benefit 2"
  ]
}
```

### SEO meta tagy

```json
"meta": {
  "title": "AI nadšenci | AI komunita, která věří v offline",
  "description": "Popis pro Google a sdílení na sociálních sítích.",
  "keywords": ["AI", "komunita", "Ostrava"]
}
```

---

## Správa organizátorů

Soubor: `public/content/organizers.json`

```json
{
  "organizers": [
    {
      "name": "Jana Nováková",
      "role": "Organizátorka",
      "bio": "Krátký popis osoby.",
      "image": "images/team/jana.jpg",
      "linkedin": "https://linkedin.com/in/jana-novakova"
    }
  ]
}
```

**Přidání organizátora:**
1. Nahraj fotografii do složky `public/images/team/`
2. Přidej nový objekt do pole `organizers`

**Odebrání organizátora:** Odstraň celý objekt `{...}` ze seznamu.

---

## Správa partnerů

Soubor: `public/content/partners.json`

```json
{
  "partners": [
    {
      "name": "Název firmy",
      "logo": "images/partners/logo-firma.png",
      "url": "https://www.firma.cz",
      "tier": "main"
    }
  ]
}
```

| Pole | Popis |
|---|---|
| `name` | Název partnera (alt text loga) |
| `logo` | Cesta k logu (nahraj do `public/images/partners/`) |
| `url` | Web partnera (odkaz při kliknutí na logo) |
| `tier` | Úroveň partnerství (`"main"` nebo `"standard"`) |

**Přidání partnera:**
1. Nahraj logo do `public/images/partners/` (doporučený formát: PNG s průhledným pozadím)
2. Přidej nový objekt do pole `partners`

---

## Kontakt a footer

Soubor: `public/content/texts.json`, sekce `footer`

```json
"footer": {
  "description": "Komunita AI nadšenců z Moravskoslezského kraje",
  "sections": {
    "contact": {
      "heading": "Kontakt",
      "email": "katerina@svidrnochova.cz",
      "phone": "+420 725 121 217"
    },
    "social": {
      "links": [
        { "label": "LinkedIn", "href": "https://linkedin.com/...", "icon": "linkedin" },
        { "label": "Instagram", "href": "https://instagram.com/...", "icon": "instagram" }
      ]
    }
  },
  "copyright": "© 2026 AI nadšenci. Organizováno s ❤️ v Ostravě."
}
```

---

## Publikování změn (deploy)

Web je hostován na **GitHub Pages** a aktualizuje se automaticky po pushnutí na GitHub.

### Postup pro publikování

```bash
# 1. Přejdi do složky projektu
cd C:\Users\marti\_Program\Claude\Fajne-prompty-web

# 2. Zobraz změněné soubory
git status

# 3. Přidej změny
git add public/content/events/20260420/event.json
git add public/content/events/index.json

# 4. Vytvoř commit s popisem
git commit -m "Přidána akce Fajne prompty #3"

# 5. Publikuj na web
git push
```

Po `git push` se web automaticky aktualizuje do cca **1–2 minut**.

### Lokální náhled před publikováním (volitelné)

Pokud chceš vidět změny lokálně před zveřejněním:

```bash
npm run dev
```

Web se otevře na adrese `http://localhost:5173`.

---

## Rychlý přehled souborů

| Co chceš upravit | Soubor |
|---|---|
| Přidat / upravit akci | `public/content/events/{ID}/event.json` |
| Pořadí akcí na webu | `public/content/events/index.json` |
| Texty homepage | `public/content/texts.json` → sekce `hero`, `community`, `partnership` |
| Navigaci a footer | `public/content/texts.json` → sekce `nav`, `footer` |
| Organizátory | `public/content/organizers.json` |
| Partnery | `public/content/partners.json` |
| Obrázky partnerů | `public/images/partners/` |
| Fotky týmu | `public/images/team/` |
| Obrázky / galerie akce | `public/content/events/{ID}/media/` |
| Aktivitu pro akci (AI asistent) | Admin: `/admin/aktivita.html` |
| Aktivity týmů v rozcestníku | Admin: `/admin/rozcestnik.html` nebo přes n8n (automaticky) |

---

## Event aktivity — sběr výsledků od týmů

Systém pro sběr výsledků týmů přímo z mobilu během akce. Každý tým dostane QR kód s odkazem na formulář, vyplní ho, a výsledky se po schválení zobrazí na webu.

### Jak to funguje

```
Tým naskenuje QR → vyplní formulář → n8n vytvoří PR → ty schválíš → web se aktualizuje (~90 s)
```

### Krok 1 — Připrav QR kódy pro týmy

Každý tým dostane vlastní odkaz ve formátu:

```
https://fajneprompty.cz/odevzdat/?event=20260323&team=NázevTýmu
```

- `event` = ID akce (datum ve formátu RRRRMMDD)
- `team` = název týmu (předvyplní se ve formuláři)

QR kód lze vygenerovat na [qr.io](https://qr.io) nebo podobné službě. Připrav jeden QR pro každý tým nebo jeden společný (bez `team=`).

### Krok 2 — Týmy odevzdají aktivitu

Tým otevře odkaz, vyplní:
- **Název týmu** (předvyplněn z URL)
- **Popis aktivity** (max 1000 znaků)
- **Fotka** (resize na max 1200px proběhne automaticky v prohlížeči)

Po odeslání se zobrazí potvrzení. Na pozadí n8n automaticky:
1. Vytvoří novou větev v GitHubu
2. Nahraje fotku
3. Přidá aktivitu do `activities.json` dané akce
4. Vytvoří Pull Request

### Krok 3 — Schval Pull Request

Otevři [GitHub → Pull requests](https://github.com/chmelainv/AI-nadsenci-web/pulls) a schval PR každého týmu (nebo všechny najednou tlačítkem **Merge pull request**).

> Každý PR = jedna aktivita od jednoho týmu. Můžeš schvalovat průběžně nebo najednou na konci.

### Krok 4 — Výsledky jsou živé

Po schválení PR proběhne automatický build (~90 sekund). Výsledky se zobrazí na:

```
https://fajneprompty.cz/rozcestnik/?event=20260323
```

### Stránka s aktivitou (AI asistent)

Pokud chceš pro akci nastavit stránku s konkrétním AI asistentem (foto + popis + tlačítko), použij admin:

1. Otevři **`/admin/aktivita.html`**
2. Vlož GitHub token (uložen lokálně v prohlížeči)
3. Vyplň název, popis, URL asistenta, nahraj foto
4. Klikni **Publikovat** — změna se commitne přímo do main větve a web se aktualizuje za ~90 s

Stránka pro účastníky je pak dostupná na `/aktivita/`.

### Manuální úprava aktivit (pokud potřeba)

Aktivity jsou uloženy v JSON souboru pro každou akci:

```
public/content/events/{eventId}/activities.json
```

Struktura:
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

Soubor lze editovat přímo přes admin `/admin/rozcestnik.html` nebo ručně v GitHubu.

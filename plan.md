# Portfolio Website — Plan

## Stack

**Plain HTML + CSS + JS + `projects.json`**

Bez frameworka, bez build stepu, bez `node_modules`. Vercel serwuje statyczne pliki natywnie.

- **vs Next.js / Astro** — za duże do tego problemu. Masz 5 plików, nie potrzebujesz 200MB zależności.
- **Deployment** — każdy `git push` → automatyczny redeploy na Vercel w ~10 sekund.

---

## Struktura plików

```
portfolio/
├── index.html        # Cała strona (szkielet DOM)
├── style.css         # Wszystkie style
├── main.js           # Fetch projects.json → renderuje karty
├── projects.json     # JEDYNE ŹRÓDŁO PRAWDY — tu edytujesz projekty
└── vercel.json       # Opcjonalne: security headers
```

---

## Format `projects.json`

```json
{
  "owner": {
    "name": "Twoje Imię",
    "tagline": "Krótki opis tego co robisz",
    "github": "https://github.com/twojeKonto",
    "linkedin": "https://linkedin.com/in/twojeKonto",
    "email": "ty@example.com"
  },
  "projects": [
    {
      "id": "projekt-slug",
      "title": "Nazwa Projektu",
      "description": "Jedno lub dwa zdania co robi i po co.",
      "url": "https://github.com/twojeKonto/projekt",
      "tags": ["Python", "CLI"],
      "featured": true
    }
  ]
}
```

**Pola:**
- `url` — link który otwiera się po kliknięciu karty (GitHub, live demo, blog, cokolwiek)
- `tags` — max 3, renderują się jako pigułki na karcie
- `featured: true` — karta wyróżniona wizualnie, sortowana na górę

---

## Kroki implementacji

### 1. `projects.json`
Zacznij od danych. Uzupełnij swoimi prawdziwymi projektami.

### 2. `index.html`
Szkielet z pustymi kontenerami (`#owner-name`, `#project-grid`) — wypełnia je `main.js`.

### 3. `main.js`
- `fetch('./projects.json')` przy załadowaniu strony
- Sort: `featured` projekty na górze
- Każda karta to `<a href="{url}" target="_blank" rel="noopener noreferrer">` — cała karta jest klikalnym linkiem

### 4. `style.css`
- CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` — responsywność bez media queries
- CSS variables dla kolorów (łatwy dark mode przez `@media (prefers-color-scheme: dark)`)
- System font stack — bez Google Fonts

### 5. `vercel.json` (opcjonalne)
Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`).

---

## Deploy na Vercel

### Pierwsze wdrożenie
1. Push repo na GitHub
2. vercel.com → "Add New Project" → wybierz repo
3. Konfiguracja:
   - Framework Preset: **Other**
   - Build Command: **puste**
   - Output Directory: **puste**
4. Kliknij Deploy — live w ~10 sekund

### Kolejne aktualizacje
```bash
# Dodaj projekt → edytuj projects.json
git commit -am "add project X"
git push
# → automatyczny redeploy
```

### Custom domena (opcjonalnie)
Vercel Dashboard → Settings → Domains → dodaj domenę. SSL automatyczny.

---

## Workflow (docelowy)

1. Otwórz `projects.json`
2. Dodaj/edytuj wpis projektu
3. `git push`
4. Gotowe — na żywo w kilka sekund

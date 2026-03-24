# 🐾 PawFect Studio — Next.js Landing Page

Landing page bilingue FR/EN pour un salon de toilettage premium. Stack Next.js 14, GSAP, design vivid & coloré.

---

## ⚡ Installation

```bash
npm install
npm run dev     # → http://localhost:3000
npm run build   # build de production
npm run start   # serveur de production local
```

---

## 🗂 Structure

```
src/
├── app/
│   ├── layout.js         → fonts (Syne + Outfit), metadata OG
│   ├── page.js           → page principale
│   ├── globals.css       → ⭐ TOUT le CSS (variables + classes)
│   ├── sitemap.js
│   └── robots.js
├── components/
│   ├── Navbar.js         → sticky, language switcher FR/EN
│   ├── Hero.js           → hero animé GSAP, blobs, stats
│   ├── Services.js       → grille 6 services, couleurs vivid
│   ├── Testimonials.js   → 3 avis clients, carte featured
│   ├── CTA.js            → bandeau dark call-to-action
│   ├── Footer.js         → grille 4 colonnes
│   └── Providers.js      → LanguageContext wrapper
└── lib/
    ├── gsap.js           → lazy GSAP init
    ├── i18n.js           → toutes les traductions FR/EN
    └── LanguageContext.js → contexte langue React
```

---

## 🎨 Design System

Voir `src/app/globals.css` — Section 1 `:root { ... }` pour toutes les variables CSS.

### Palette principale
| Variable | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFAF3` | Fond principal |
| `--color-accent` | `#FF4F1F` | CTA, liens actifs |
| `--color-accent-2` | `#05C4A0` | Accent teal |
| `--color-accent-3` | `#FFB92E` | Accent jaune |
| `--color-bg-dark` | `#140D07` | Sections sombres |

### Fonts
- **Heading** : Syne (700–800) — via `next/font/google`
- **Body** : Outfit (300–700) — via `next/font/google`

---

## 🌍 Internationalisation

Toutes les traductions sont dans `src/lib/i18n.js`.
Le switcher FR/EN est dans la Navbar — état global via `LanguageContext`.

Pour ajouter une langue : ajouter la clé dans chaque objet de traduction et un bouton dans `Navbar.js`.

---

## 🚀 Déploiement Vercel

```bash
npm i -g vercel
vercel
```

Variables d'environnement requises : aucune pour la version statique.

---

## 📋 Webflow

Voir `WEBFLOW.md` pour le guide de reproduction dans Webflow.

# CLAUDE.md — PawFect Studio

## Projet
**Nom** : PawFect Studio  
**Description** : Landing page bilingue FR/EN pour un salon de toilettage premium. Style vivid & coloré, hero animé, services, testimonials, CTA.  
**Type** : Landing page / vitrine  
**URL de production** : https://pawfect-studio.com  
**Statut** : En développement

---

## ⚠️ Fichier CRITIQUE à ne jamais oublier
**`jsconfig.json`** à la racine — sans ce fichier, l'alias `@/` ne fonctionne pas et tout le projet casse au build.
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } } }
```

---

## Stack technique
- **Framework** : Next.js 14 (App Router)
- **CSS** : `src/app/globals.css` unique — variables CSS + classes via `@apply` Tailwind
- **Animations** : GSAP 3 + ScrollTrigger (`src/lib/gsap.js` — import dynamique)
- **Fonts** : next/font/google — Syne (heading) + Outfit (body), déclarées dans `layout.js`
- **Icons** : lucide-react
- **i18n** : Custom context — `src/lib/i18n.js` + `src/lib/LanguageContext.js`

---

## Commandes
```bash
npm run dev      # Dev server → http://localhost:3000
npm run build    # Build production
npm run lint     # ESLint
npm run start    # Serveur production local
```

---

## ⚠️ Conventions CSS — RÈGLES ABSOLUES

### ✅ Autorisé
```jsx
<section className="hero-section">
  <div className="container-site">
    <h1 className="display-title">Titre</h1>
    <a className="btn-primary">CTA</a>
  </div>
</section>
```

### ❌ Interdit
```jsx
// Classes Tailwind utilitaires dans le JSX
<section className="pt-24 pb-20 bg-white">
// Style inline
<h1 style={{ fontSize: '3rem' }}>
// CSS Modules
import styles from './Hero.module.css'
```

**Règle** : toute nouvelle classe doit être déclarée dans `globals.css` sous `@layer components { ... }`.

---

## Design System — Variables CSS

### Couleurs principales
| Variable | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#FFFAF3` | Fond principal |
| `--color-bg-alt` | `#FFF3E8` | Fond alternatif |
| `--color-bg-dark` | `#140D07` | Sections sombres (CTA, footer) |
| `--color-ink` | `#160C04` | Texte principal |
| `--color-ink-2` | `#6B4F35` | Texte secondaire |
| `--color-ink-3` | `#A8896C` | Texte tertiaire |
| `--color-border` | `#F2E4D2` | Bordures |
| `--color-accent` | `#FF4F1F` | CTA principal (coral/orange) |
| `--color-accent-2` | `#05C4A0` | Accent teal |
| `--color-accent-3` | `#FFB92E` | Accent jaune |

### Gradients
| Variable | Usage |
|---|---|
| `--grad-hero` | `#FF4F1F → #FF8C42 → #FFB92E` |
| `--grad-coral` | Boutons primaires |
| `--grad-teal` | Service card teal |
| `--grad-yellow` | Service card jaune |
| `--grad-purple` | Service card violet |
| `--grad-pink` | Service card rose |
| `--grad-blue` | Service card bleu |
| `--grad-text` | Titres dégradés |

### Typographie
| Variable | Valeur | Usage |
|---|---|---|
| `--font-heading` | Syne | Titres H1–H3 |
| `--font-body` | Outfit | Texte courant |
| `--text-display` | `clamp(3.5rem, 8vw, 6.5rem)` | Titre héro |
| `--text-h2` | `clamp(2rem, 4vw, 3.25rem)` | Titres sections |

### Espacement
Utiliser les variables `--space-[n]` (multiples de 4px), de `--space-1` (4px) à `--space-32` (128px).

### Layout
- `--max-width` : `1200px`
- `--nav-height` : `76px`
- `--px-site` : `48px` (32px à 1024px, 20px mobile)

---

## Architecture des composants
```
src/components/
├── Providers.js      → LanguageContext wrapper ('use client')
├── Navbar.js         → classes : navbar, navbar.scrolled, nav-logo, nav-links, nav-link, nav-cta, lang-switcher, lang-btn
├── Hero.js           → classes : hero-section, hero-bg, hero-blob, hero-content, hero-left, hero-right, hero-title, hero-badge, hero-desc, hero-actions, hero-stats, hero-visual-card, hero-bubble
├── Services.js       → classes : services-section, services-header, services-grid, service-card, service-card--{color}, service-icon-wrap, service-card-title, service-card-desc, service-card-footer, service-card-price
├── Testimonials.js   → classes : testimonials-section, testimonials-header, testimonials-grid, testimonial-card, testimonial-card--featured, testimonial-stars, testimonial-text, testimonial-author, testimonial-avatar
├── CTA.js            → classes : cta-section, cta-inner, cta-title, cta-desc, cta-actions, cta-note
└── Footer.js         → classes : footer, footer-grid, footer-brand-name, footer-brand-desc, footer-social, footer-col-title, footer-links-list, footer-link, footer-contact-item, footer-bottom, footer-copy
```

---

## Internationalisation
- Toutes les chaînes sont dans `src/lib/i18n.js` (objet `translations`)
- Fonction utilitaire : `t(obj, lang)` retourne `obj[lang] ?? obj['fr']`
- Langue courante : `useLanguage()` hook — contexte global (`LanguageContext`)
- Langues supportées : `'fr'` | `'en'` (défaut : `'fr'`)
- Switcher : Navbar → `lang-switcher` / `lang-btn.active`

---

## Pages du projet
| Route | Fichier | Description |
|---|---|---|
| `/` | `src/app/page.js` | Page principale (Hero + Services + Testimonials + CTA + Footer) |

---

## Ce qu'il NE faut PAS toucher
- `src/app/globals.css` Section 1 (`:root` variables) — modifier uniquement en accord avec le design system
- `src/app/layout.js` — fonts et metadata, ne modifier qu'avec intention
- `src/lib/i18n.js` — structure des objets de traduction

---

## Intégration 21st.dev Magic (`/ui ...`)

Quand tu génères un composant avec `/ui`, applique ces étapes avant d'intégrer :
1. **Remplace** toutes les classes Tailwind utilitaires par des class names sémantiques
2. **Déplace** tous les styles dans `globals.css` sous la bonne section
3. **Remplace** toutes les valeurs hardcodées par les variables CSS du design system
4. **Vérifie** que le composant passe `npm run build` sans erreur

---

## Skills actifs (Claude Code)
Après `uipro init --ai claude` :
- `.claude/skills/ui-ux-pro-max/SKILL.md` — design intelligence

Référence Webflow :
- `WEBFLOW.md` — style guide + process de reproduction Webflow complet

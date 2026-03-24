# WEBFLOW.md — PawFect Studio Style Guide

Guide complet pour reproduire ce projet dans Webflow.

---

## 1. STYLE GUIDE

### Variables Webflow (Global Swatches)

Créer ces swatches dans Webflow > Style Manager > Colors :

| Nom Webflow | Valeur | Usage |
|---|---|---|
| `bg-primary` | `#FFFAF3` | Fond principal |
| `bg-alt` | `#FFF3E8` | Fond alternatif |
| `bg-dark` | `#140D07` | Footer, CTA sombre |
| `ink` | `#160C04` | Texte principal |
| `ink-2` | `#6B4F35` | Texte secondaire |
| `ink-3` | `#A8896C` | Labels, sous-titres |
| `border` | `#F2E4D2` | Bordures |
| `accent-coral` | `#FF4F1F` | CTA, bouton principal |
| `accent-coral-light` | `#FFF0EB` | Fond badge/chips |
| `accent-teal` | `#05C4A0` | Accent secondaire |
| `accent-yellow` | `#FFB92E` | Accent tertiaire |
| `white` | `#FFFFFF` | Blanc pur |

### Gradients (CSS dans Head Code)
```css
.grad-hero   { background: linear-gradient(135deg, #FF4F1F, #FF8C42, #FFB92E); }
.grad-coral  { background: linear-gradient(135deg, #FF4F1F, #FF8C42); }
.grad-teal   { background: linear-gradient(135deg, #05C4A0, #0094D4); }
.grad-text   { background: linear-gradient(135deg, #FF4F1F, #FFB92E); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
```

---

## 2. TYPOGRAPHIE

### Fonts (Webflow > Project Settings > Fonts)

- **Syne** — Google Font — Weights : 700, 800 → pour tous les titres
- **Outfit** — Google Font — Weights : 400, 500, 600, 700 → pour le body

### Text Styles à créer dans Webflow

| Nom | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Display Title | Syne | clamp(3.5rem, 8vw, 6.5rem) | 800 | Héro H1 |
| H2 Section | Syne | clamp(2rem, 4vw, 3.25rem) | 800 | Titres sections |
| H3 Card | Syne | 1.375rem | 700 | Titres cartes |
| Body Large | Outfit | 1.125rem | 400 | Descriptions |
| Body Base | Outfit | 1rem | 400 | Texte courant |
| Label | Outfit | 0.75rem | 600 | Labels uppercase |
| Eyebrow | Outfit | 0.875rem | 600 | Badges sections |

---

## 3. COMPOSANTS WEBFLOW

### Navbar
- **Type** : Webflow Navbar component (sticky, 76px height)
- **Background** : Transparent → blur 16px + `rgba(255,250,243,0.90)` au scroll (via interaction)
- **Logo** : Div 40×40px avec `border-radius: 12px`, gradient coral + emoji 🐾
- **Links** : Body Base, ink-2, hover underline gradient coral
- **CTA** : Bouton pill (border-radius: 9999px), gradient coral, shadow

### Buttons
- **Btn Primary** : grad-coral, white text, border-radius 9999px, padding 16px 32px, font-weight 600, box-shadow coral 35%
- **Btn Outline** : transparent bg, border 2px solid border color, border-radius 9999px
- **Btn White** : white bg, accent-coral text, border-radius 9999px

### Service Cards
- **Conteneur** : `border-radius: 24px`, white bg, shadow, border-top 4px gradient unique par carte
- **Hover** : `translateY(-6px)` + shadow plus prononcée (Webflow Interaction > Hover)
- **6 variantes de couleur** : coral / teal / yellow / purple / pink / blue

### Testimonial Cards
- **Carte normale** : white bg, border 1px solid border-color, border-radius 24px
- **Carte featured** : grad-hero background, texte blanc

---

## 4. SECTIONS — LAYOUT

### Hero
- **Layout** : 2 colonnes (50/50), min-height 100vh, align-items center
- **Blobs** : 3 divs absolus, border-radius 50%, filter blur 90px, animations CSS @keyframes
- **Badges flottants** : position absolute sur la carte visuelle droite

### Services
- **Grid** : 3 colonnes → 2 colonnes (1024px) → 1 colonne (768px)
- **Background** : bg-alt (#FFF3E8)

### Testimonials
- **Grid** : 3 colonnes → 1 colonne (768px)
- **Background** : bg-primary (#FFFAF3)

### CTA
- **Background** : bg-dark (#140D07) + radial-gradients overlay
- **Layout** : centré, max-width 700px

### Footer
- **Background** : bg-dark (#140D07)
- **Grid** : 4 colonnes (2fr 1fr 1fr 1.5fr) → 2 colonnes (1024px) → 1 colonne (768px)

---

## 5. ANIMATIONS WEBFLOW

### Hero (Page Load Trigger)
1. **Blobs** : opacity 0→1, duration 1500ms, stagger 200ms
2. **Badge** : opacity 0→1 + translateY 20→0, duration 600ms, delay 300ms
3. **Titre** : opacity 0→1 + translateY 40→0, duration 800ms, delay 600ms
4. **Description** : opacity 0→1 + translateY 20→0, duration 700ms, delay 900ms
5. **Boutons** : opacity 0→1 + translateY 20→0, duration 600ms, delay 1100ms
6. **Visuel droit** : opacity 0→1 + translateX 40→0 + scale 0.95→1, duration 900ms, delay 500ms

### Services & Testimonials (Scroll Into View)
- Cartes : opacity 0→1 + translateY 50→0, duration 700ms, stagger 100ms
- Trigger : "When element enters viewport"

### Service Cards Hover
- translateY 0→-6px, box-shadow augmentée
- Duration : 300ms, easing : ease

---

## 6. RESPONSIVE BREAKPOINTS

| Breakpoint | max-width | Changements |
|---|---|---|
| Tablet | 1024px | `--px-site: 32px`, services 2 cols, footer 2 cols |
| Mobile Landscape | 768px | `--px-site: 20px`, hero 1 col, services 1 col, nav links masqués |
| Mobile Portrait | 480px | Boutons pleine largeur, actions en colonne |

---

## 7. CMS WEBFLOW (optionnel)

Si extension CMS souhaitée :

**Collection "Services"**
- Champ : Nom (Text), Description FR (Rich Text), Description EN (Rich Text), Prix (Text), Emoji (Text), Couleur (Option: coral/teal/yellow/purple/pink/blue)

**Collection "Témoignages"**
- Champ : Texte FR (Rich Text), Texte EN (Rich Text), Nom client (Text), Label animal (Text), Avatar emoji (Text), Featured (Switch)

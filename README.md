# SiteArtisan - Annuaire d'Artisans Français

Plateforme moderne et élégante pour référencer et promouvoir les artisans (plombiers, piscinistes, paysagistes, électriciens) en France.

## 🚀 Features

### Pages Publiques
- **Accueil** - Hero section avec barre de recherche, catégories dépliables, artisans en vedette
- **Recherche & Filtres** - Résultats avec filtres par métier, ville, note, et tri
- **Fiche Artisan** - Profil complet avec contact, portfolio, certifications
- **À Propos** - Présentation de la plateforme
- **Contact** - Formulaire de contact

### Administration (Protégée)
- **Dashboard** - Statistiques, répartition par métier, derniers artisans
- **Gestion Artisans** - Liste, recherche, filtres, actions CRUD
- **Formulaire Complet** - Ajout/édition d'artisans avec tous les champs

**Accès Admin:** `/admin`
**Mot de passe:** `celexia2024`

## 🛠 Stack Technique

- **Framework:** Next.js 14 + TypeScript
- **Styling:** Tailwind CSS
- **Composants:** Radix UI + Shadcn/ui
- **Animations:** Framer Motion
- **Icônes:** Lucide React
- **Déploiement:** Vercel

## 📋 Structure du Projet

```
src/
├── app/                          # Pages Next.js
│   ├── page.tsx                 # Accueil
│   ├── artisans/                # Recherche & résultats
│   ├── artisan/[id]/            # Fiche détaillée
│   ├── admin/                   # Dashboard admin
│   ├── a-propos/                # À propos
│   ├── contact/                 # Contact
│   ├── layout.tsx               # Layout principal
│   └── globals.css              # Styles globaux
├── components/
│   ├── layout/                  # Header, Footer
│   ├── ui/                      # Composants UI réutilisables
│   └── admin/                   # Composants admin
├── types/
│   └── artisan.ts               # Types TypeScript
├── lib/
│   └── utils.ts                 # Fonctions utilitaires
└── data/
    └── artisans.ts              # Données artisans (8 exemples)
```

## 🚀 Installation & Lancement Local

```bash
# Cloner le projet
git clone https://github.com/agencecelexia-dotcom/siteartisan.git
cd siteartisan

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build
npm start
```

Accéder au site: **http://localhost:3000**

## 📦 Données & Métiers

### Métiers Supportés
1. **Plombier** 🔧 - Plomberie générale, rénovation, dépannage
2. **Pisciniste** 🏊 - Construction et rénovation de piscines
3. **Paysagiste** 🌳 - Aménagement d'espaces verts
4. **Électricien** ⚡ - Installation électrique, domotique, énergies renouvelables

### Données Exemple
8 artisans de démonstration fournis (2 par métier) avec:
- Profils complets avec photos
- Avis et notes (4.4 à 4.9/5)
- Certifications et labels
- Portfolio de réalisations
- Zones d'intervention

## 🎨 Design

- **Palette de couleurs:**
  - Primary: Bleu `#2563EB`
  - Secondary: Orange `#F59E0B`
  - Accents par métier (bleu, cyan, vert, amber)

- **Typographie:**
  - Titles: DM Sans / Inter
  - Body: Inter

- **Responsive:** Mobile-first, optimisé pour tous les appareils
- **Animations:** Smooth transitions avec Framer Motion

## 🔐 Admin Panel

### Authentification
- Login simple par mot de passe
- Stockage local (localStorage)
- **Mot de passe par défaut:** `celexia2024`

### Fonctionnalités
- ✅ Dashboard avec statistiques
- ✅ CRUD complet artisans
- ✅ Formulaire avec tous les champs
- ✅ Upload photos (URL)
- ✅ Gestion certifications, assurances, labels
- ✅ Prévisualisation avant publication

## 📱 Pages Détails

### `/` - Accueil
- Hero avec recherche
- Stats (artisans, villes, note moyenne)
- Catégories dépliables
- Artisans en vedette
- Section "Pourquoi nous"
- CTA pour artisans

### `/artisans` - Recherche
- Barre de recherche (ville + métier)
- Filtres latéraux (métier, ville, note)
- Tri (pertinence, note, récent)
- Résultats en grid responsive

### `/artisan/[id]` - Profil
- Photo de couverture + profil
- Contact (téléphone, email, site)
- Présentation détaillée
- Types de projets
- Portfolio photo
- Certifications & garanties
- Sidebar contact sticky

### `/admin` - Dashboard
- Stats globales
- Graphiques par métier
- Derniers artisans
- Accès rapide aux fonctionnalités

### `/admin/artisans` - Liste
- Table avec recherche/filtres
- Actions: voir, éditer, supprimer
- Lien vers fiche publique
- Statut (actif/inactif)

### `/admin/artisans/new` - Ajouter
Formulaire complet avec sections:
- Infos générales (nom, métiers, logo, statut)
- Coordonnées (téléphone, email, adresse, réseaux)
- Présentation (descriptions, zone d'intervention)
- Projets (types, spécialités)
- Certifications (labels, assurances, garanties)
- SEO (meta title, meta description)

## 🎯 Points Clés

✅ **Performance** - Build optimisé, pages pré-rendues
✅ **SEO** - Meta tags, structure sémantique
✅ **Accessibility** - WCAG AA, navigation clavier
✅ **Mobile** - Responsive design, touch-friendly
✅ **Animations** - Smooth, performantes
✅ **Code Quality** - TypeScript, composants réutilisables

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

Vercel déploiera automatiquement à chaque push sur main.

### Configuration Vercel
- **Build Command:** `next build`
- **Start Command:** `next start`
- **Install Command:** `npm install`

## 📝 Notes

- Les données artisans sont stockées en local (`src/data/artisans.ts`)
- Pour un vrai système, intégrer une BDD (Supabase, Firebase, etc.)
- L'admin utilise localStorage - ajouter une vraie authentification en production
- Les photos utilisent des URLs Unsplash - remplacer par vos propres images

## 👨‍💼 Contact & Support

**Email:** agence.celexia@gmail.com
**GitHub:** https://github.com/agencecelexia-dotcom/siteartisan

---

**Développé avec ❤️ par Claude Code**

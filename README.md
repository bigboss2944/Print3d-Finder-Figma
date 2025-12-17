# Print3D Finder

**Plateforme de recherche et d'impression de modèles 3D**

> 📚 **[Guide de Documentation Complète](./DOCUMENTATION_INDEX.md)** - Consultez l'index pour naviguer facilement dans toute la documentation

## 📋 Description

Print3D Finder est une plateforme web (et future application mobile) permettant aux utilisateurs de rechercher des modèles 3D à imprimer via :
- 🔍 **Recherche textuelle** intelligente avec filtres avancés
- 📸 **Recherche par photo** grâce à l'intelligence artificielle
- 🔬 **Analyse automatique** de la printabilité des modèles
- 🖨️ **Service d'impression** professionnel intégré

**Phase 1** : Application Web Blazor (en cours de développement)  
**Phase 2** : Application Mobile MAUI (développement ultérieur)

## 🎯 Objectifs

Fournir une solution complète permettant aux utilisateurs de :
1. Rechercher facilement des modèles 3D sur internet
2. Analyser la compatibilité d'impression (matériaux, dimensions, complexité)
3. Commander l'impression de modèles auprès d'un service professionnel
4. Suivre leurs commandes en temps réel

## 🛠️ Technologies

### Application Web
- **Framework**: Blazor Server/WebAssembly (.NET 10)
- **Langage**: C# 12
- **UI**: Tailwind CSS / MudBlazor
- **Authentification**: ASP.NET Core Identity + JWT
- **Sécurité**: Connexion HTTPS obligatoire

### Application Mobile (Phase 2)
- **Framework**: .NET MAUI (.NET 10) - *Développement ultérieur*
- **Plateformes**: Android 7.0+ (API 24+), iOS 13+
- **Interface**: XAML + MAUI Community Toolkit

### Backend
- **API**: ASP.NET Core Web API (.NET 10)
- **Base de données**: PostgreSQL 16+ / SQL Server 2022
- **ORM**: Entity Framework Core 10
- **Stockage fichiers**: Azure Blob Storage / AWS S3
- **Recherche**: Elasticsearch / Azure Cognitive Search
- **IA Vision**: Azure Computer Vision / Google Cloud Vision API

## 🔐 Sécurité

- ✅ **Connexion HTTPS obligatoire** (TLS 1.3) pour toutes les communications
- ✅ **Noms d'utilisateurs sécurisés** (chiffrement et hachage en base de données)
- ✅ **Aucun credential dans les logs** (mots de passe, tokens, clés API filtrés)
- ✅ Authentification JWT avec tokens d'expiration
- ✅ Hashage des mots de passe avec bcrypt/Argon2id
- ✅ Certificat SSL/TLS valide et HSTS activé
- ✅ Protection contre SQL Injection, XSS, CSRF
- ✅ Conformité RGPD (droit à l'oubli, export de données)
- ✅ Rate limiting et protection DDoS
- ✅ Scan antivirus sur uploads de fichiers

## 📚 Documentation

Pour les spécifications complètes du projet, consultez le **[Cahier des Charges](./CAHIER_DES_CHARGES.md)** qui inclut :
- Spécifications fonctionnelles détaillées
- Architecture technique complète
- Exigences de sécurité
- **Standards de qualité du code** (conventions, analyse statique, métriques)
- Workflow utilisateur
- Planning et jalons du projet
- Budget prévisionnel
- Critères d'acceptation

## 🎯 Qualité du Code

Le projet respecte des **standards de qualité stricts** :
- ✅ **Conventions Microsoft C# / .NET** (PascalCase, camelCase, SOLID)
- ✅ **Test-Driven Development (TDD)** avec couverture > 70%
- ✅ **Analyse statique** : StyleCop, Roslyn Analyzers, SonarQube
- ✅ **Métriques SonarQube** : Note A ou B minimum
- ✅ **Complexité cyclomatique** < 10 par méthode
- ✅ **Duplication de code** < 3%
- ✅ **Documentation XML** pour toutes les API publiques
- ✅ **Revues de code** systématiques avec checklist
- ✅ **CI/CD** avec tests automatiques et quality gates
- Budget prévisionnel
- Critères d'acceptation

## 🚀 Fonctionnalités Principales

### Pour les Utilisateurs
- 🔐 Inscription et connexion sécurisées
- 🔍 Recherche textuelle avec auto-complétion
- 📷 Recherche par photo (upload ou capture)
- 🖼️ Visualisation de modèles avec images multiples + **auteur/créateur affiché** (Version 1)
- 🎨 Visualisation 3D interactive (Version 2 - future)
- 📊 Analyse automatique de printabilité (base : dimensions, matériaux, coûts)
- ⚙️ Configuration personnalisée (matériau, couleur, **buse**, qualité)
- 🛒 Commande et suivi d'impression
- 📧 Notifications email
- ✅ Messages d'erreur clairs et explicites
- 📜 Historique des commandes
- ⭐ Évaluation et avis
- 🚀 **Base de données optimisée pour millions de modèles** (latence <50ms)

### Pour les Administrateurs / Imprimeur
- 📊 Tableau de bord avec statistiques
- **📧 Notification email automatique** pour chaque nouvelle commande reçue
- 📦 Gestion des commandes en temps réel
- 🎨 Gestion des modèles 3D avec informations auteur/source
- 🧱 **Gestion des matériaux** (ajout, modification, prix, couleurs, stock)
- 🔧 **Gestion des buses d'impression** (diamètres, qualités, compatibilités)
- 🌐 **Gestion des sources de modèles** (configuration des sites web interrogés)
- 🔄 Monitoring des synchronisations et performance des sources
- 👥 Gestion des utilisateurs
- 📈 Rapports et analytics

## 🗺️ Roadmap

### ✅ Phase 0 : Prototype UI (Actuel - React/Vite)
- Interface de recherche
- Visualisation des résultats
- Pages de détails et commande
- Authentification basique

### 🔨 Phase 1 : Conception et Préparation (4 semaines)
- Finalisation cahier des charges
- Design UI/UX
- Architecture technique

### 🔨 Phase 2 : Backend API (.NET 10) (8 semaines)
- API REST avec authentification HTTPS
- Gestion utilisateurs sécurisée
- Recherche textuelle et par image
- Système de notification email pour l'imprimeur

### 🔨 Phase 3 : Frontend Web Blazor (6 semaines)
- Migration complète vers Blazor .NET 10
- Connexion HTTPS obligatoire
- Interface de recherche complète
- Workflow de commande
- Tableau de bord administrateur

### 🧪 Phase 4 : Tests et Déploiement (6 semaines)
- Tests de sécurité (HTTPS, authentification)
- Tests de performance
- Déploiement en production avec HTTPS

### 📱 Phase 5 : Application Mobile MAUI (Ultérieure)
**Développement après la mise en production de l'application web**
- Application native Android/iOS
- Intégration caméra pour recherche photo
- Notifications push
- Synchronisation avec backend

### 🔬 Phase 6 : Analyse Structurelle Avancée (Future)
**Après mise en production Phase 1-5**
- Analyse structurelle complète des modèles 3D
- Détection automatique des surfaces non supportées
- Calcul de stabilité structurelle
- Identification des zones nécessitant des supports
- Vérification épaisseur des parois
- Simulation de slicing avancée

## 👨‍💻 Contexte de Développement

Ce projet est développé par un **développeur solo en temps partiel**, avec une approche progressive :
1. **Priorité** : Application web complète et fonctionnelle
2. **Planning** : 12-15 mois (développement temps partiel ~50%)
3. **Packages** : Uniquement open-source et maintenus activement
4. **Images** : Libres de droits (Unsplash, Pexels, Pixabay)
5. **Ensuite** : Application mobile une fois le web stabilisé
- Réalité Augmentée (AR)

## 💻 Développement Local (Prototype React Actuel)

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/bigboss2944/Print3d-Finder-Figma.git
cd Print3d-Finder-Figma

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build
```

### Accès
- L'application sera disponible sur `http://localhost:5173`
- Utilisez un email contenant "admin" pour accéder au tableau de bord administrateur

## 📦 Structure du Projet (Prototype Actuel)

```
Print3d-Finder-Figma/
├── src/
│   ├── components/           # Composants React
│   │   ├── SearchPage.tsx    # Page de recherche
│   │   ├── SearchResults.tsx # Résultats de recherche
│   │   ├── ModelDetails.tsx  # Détails du modèle
│   │   ├── PrintRequest.tsx  # Demande d'impression
│   │   ├── LoginPage.tsx     # Authentification
│   │   ├── UserProfile.tsx   # Profil utilisateur
│   │   ├── AdminDashboard.tsx # Tableau de bord admin
│   │   └── ui/               # Composants UI réutilisables
│   ├── App.tsx               # Composant principal
│   ├── main.tsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── public/                   # Assets statiques
├── CAHIER_DES_CHARGES.md     # Spécifications complètes
├── package.json              # Dépendances npm
└── vite.config.ts            # Configuration Vite
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet utilise des composants de :
- [shadcn/ui](https://ui.shadcn.com/) sous [licence MIT](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md)
- Photos de [Unsplash](https://unsplash.com) sous [licence Unsplash](https://unsplash.com/license)

## 📞 Contact

Pour toute question concernant le projet :
- 📧 Email : [Créer une issue](https://github.com/bigboss2944/Print3d-Finder-Figma/issues)
- 🐛 Bugs : [Signaler un bug](https://github.com/bigboss2944/Print3d-Finder-Figma/issues)
- 💡 Suggestions : [Proposer une fonctionnalité](https://github.com/bigboss2944/Print3d-Finder-Figma/issues)

---

**Version**: 1.0.0  
**Statut**: Prototype React → Migration vers Blazor .NET 10 & MAUI planifiée  
**Dernière mise à jour**: Décembre 2025

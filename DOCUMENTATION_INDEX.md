# Documentation Index - Print3D Finder

## 📚 Vue d'Ensemble de la Documentation

Ce dépôt contient la documentation complète pour le projet **Print3D Finder**, une plateforme de recherche et d'impression de modèles 3D.

## 📖 Documents Disponibles

### 1. [README.md](./README.md)
**Document de présentation générale**

- Description du projet et objectifs
- Technologies utilisées (Blazor .NET 10, MAUI)
- Fonctionnalités principales
- Instructions d'installation pour le prototype React actuel
- Roadmap du projet (5 phases)
- Informations de contribution et contact

**Public cible** : Développeurs, contributeurs, utilisateurs finaux

---

### 2. [CAHIER_DES_CHARGES.md](./CAHIER_DES_CHARGES.md) ⭐
**Spécifications complètes du projet (23 KB, ~15 minutes de lecture)**

#### Contenu Principal :

**Section 1 - Présentation du Projet**
- Contexte et objectif
- Portée (Web Blazor + Mobile MAUI)

**Section 2 - Spécifications Fonctionnelles** ⚙️
- 2.1 Authentification et Sécurité (noms d'utilisateurs chiffrés)
- 2.2 Recherche (textuelle + photo avec IA)
- 2.3 Visualisation 3D interactive
- 2.4 Analyse de printabilité automatique
- 2.5 Processus de commande d'impression
- 2.6 Gestion des commandes utilisateur
- 2.7 Tableau de bord administrateur
- 2.8 Profil utilisateur

**Section 3 - Spécifications Techniques** 💻
- 3.1 Architecture globale (Web Blazor + Mobile MAUI)
- 3.2 Backend (ASP.NET Core API .NET 10)
- 3.3 Sécurité (chiffrement, JWT, RGPD)
- 3.4 Performance et scalabilité
- 3.5 Compatibilité navigateurs et OS

**Section 4 - Exigences Non Fonctionnelles**
- Performance (temps de réponse)
- Disponibilité (99.9% uptime)
- Scalabilité (1000+ utilisateurs)
- Accessibilité (WCAG 2.1 AA)
- Maintenabilité

**Section 5 - Workflow Utilisateur Complet** 🔄
- Parcours détaillé en 10 étapes
- De la recherche à la livraison

**Section 6 - Livrables Attendus**

**Section 7 - Planning et Jalons** 📅
- Phase 1 : Conception (4 semaines)
- Phase 2 : Backend (8 semaines)
- Phase 3 : Frontend Web Blazor (6 semaines)
- Phase 4 : Mobile MAUI (6 semaines)
- Phase 5 : Tests (4 semaines)
- Phase 6 : Déploiement (2 semaines)
- **Total : 30 semaines**

**Section 8 - Budget Prévisionnel** 💰
- Ressources humaines
- Infrastructure mensuelle (420-1200€)
- Outils et licences

**Section 9 - Risques et Mitigation** ⚠️

**Section 10 - Critères d'Acceptation** ✅

**Section 11 - Maintenance et Évolutions Futures**

**Public cible** : Chef de projet, Product Owner, Équipe de développement, Stakeholders

---

### 3. [ARCHITECTURE_TECHNIQUE.md](./ARCHITECTURE_TECHNIQUE.md) 🏗️
**Documentation technique détaillée (45 KB, ~30 minutes de lecture)**

#### Contenu Principal :

**Section 1 - Vue d'Ensemble de l'Architecture**
- Diagramme architectural complet
- Flux de communication entre composants

**Section 2 - Architecture Détaillée par Couche** 📦

**2.1 Couche Présentation**
- Structure application Blazor .NET 10
  - Pages, composants, services
  - Code exemple ApiClient
- Structure application MAUI
  - Views, ViewModels (MVVM)
  - Services natifs (caméra, notifications)
  - Code exemple ViewModel

**2.2 Couche API (Backend)**
- Structure projet ASP.NET Core
- Configuration complète (Program.cs)
  - Identity, JWT, CORS
  - Redis cache
  - Rate limiting
  - Swagger/OpenAPI
- Exemples de controllers avec code

**2.3 Couche Données**
- Modèle de données Entity Framework Core
  - Entités : User, Model3D, Order, Material, Category
  - Relations entre tables
  - Configuration DbContext
  - Seed data initial
- Code complet des entités

**2.4 Services Externes et Intégrations**
- Service de recherche par image (Azure Computer Vision)
- Service d'analyse de modèles 3D
  - Calcul dimensions, volume
  - Détection overhangs
  - Épaisseur parois
  - Estimation temps et coût
- Code complet des services

**Section 3 - Sécurité** 🔐
- Implémentation chiffrement AES pour noms d'utilisateurs
- Configuration appsettings.json
  - Connection strings
  - JWT settings
  - Clés API services externes

**Section 4 - Déploiement** 🚀
- Azure App Service (pipeline YAML)
- Docker (Dockerfile + docker-compose)

**Section 5 - Monitoring** 📊
- Application Insights
- Logging personnalisé
- Tracking des événements et métriques

**Section 6 - Tests** 🧪
- Tests unitaires (xUnit)
- Tests d'intégration
- Code exemple complet

**Public cible** : Développeurs backend, Développeurs frontend, Architectes logiciels, DevOps

---

## 🎯 Guide de Lecture Recommandé

### Pour les Développeurs Débutants sur le Projet
1. **README.md** - Comprendre le projet globalement
2. **CAHIER_DES_CHARGES.md** (Sections 1, 2, 5) - Fonctionnalités et workflow utilisateur
3. **ARCHITECTURE_TECHNIQUE.md** (Section 1) - Vue d'ensemble technique

### Pour les Développeurs Backend
1. **CAHIER_DES_CHARGES.md** (Sections 2, 3) - Besoins fonctionnels et techniques
2. **ARCHITECTURE_TECHNIQUE.md** (Sections 2.2, 2.3, 2.4) - API, données, services
3. **ARCHITECTURE_TECHNIQUE.md** (Section 3) - Sécurité

### Pour les Développeurs Frontend (Web - Blazor)
1. **CAHIER_DES_CHARGES.md** (Sections 2, 5) - Fonctionnalités et UX
2. **ARCHITECTURE_TECHNIQUE.md** (Section 2.1.1) - Structure Blazor
3. **Code existant** dans `src/components/` - Prototype React à migrer

### Pour les Développeurs Mobile (MAUI)
1. **CAHIER_DES_CHARGES.md** (Sections 2, 3.1.2) - Fonctionnalités mobiles
2. **ARCHITECTURE_TECHNIQUE.md** (Section 2.1.2) - Structure MAUI
3. **CAHIER_DES_CHARGES.md** (Section 3.5.2) - Compatibilité Android/iOS

### Pour les DevOps
1. **CAHIER_DES_CHARGES.md** (Sections 3.2, 4.2) - Infrastructure et performance
2. **ARCHITECTURE_TECHNIQUE.md** (Sections 4, 5) - Déploiement et monitoring

### Pour les Product Owners / Chefs de Projet
1. **README.md** - Vue d'ensemble
2. **CAHIER_DES_CHARGES.md** (Sections 1, 5, 7, 8, 10) - Objectifs, workflow, planning, budget, critères

### Pour les Designers UI/UX
1. **CAHIER_DES_CHARGES.md** (Sections 2, 5) - Fonctionnalités et parcours utilisateur
2. **Code existant** dans `src/components/` - Prototype UI actuel
3. **CAHIER_DES_CHARGES.md** (Section 4.5) - Accessibilité

## 📋 Checklist d'Implémentation

### Phase Actuelle : Prototype React ✅
- [x] Interface de recherche (texte + photo)
- [x] Visualisation des résultats
- [x] Pages de détails de modèles
- [x] Workflow de commande
- [x] Authentification basique
- [x] Tableau de bord admin
- [x] Documentation complète

### Phase Suivante : Migration Blazor .NET 10
- [ ] Setup projet Blazor WebAssembly/Server
- [ ] Migration des composants React vers Blazor
- [ ] Implémentation ASP.NET Core API
- [ ] Configuration Entity Framework Core
- [ ] Intégration PostgreSQL/SQL Server
- [ ] Authentification JWT + Identity
- [ ] Chiffrement des noms d'utilisateurs
- [ ] Tests unitaires backend

### Phase Future : Application Mobile MAUI
- [ ] Setup projet .NET MAUI
- [ ] Implémentation MVVM architecture
- [ ] Pages principales (Login, Search, Results, Details, Orders)
- [ ] Intégration caméra (recherche photo)
- [ ] Notifications push
- [ ] Synchronisation avec API
- [ ] Tests sur Android/iOS

## 🔗 Liens Utiles

### Technologies Officielles
- [.NET 10 Documentation](https://learn.microsoft.com/en-us/dotnet/)
- [Blazor Documentation](https://learn.microsoft.com/en-us/aspnet/core/blazor/)
- [.NET MAUI Documentation](https://learn.microsoft.com/en-us/dotnet/maui/)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/)

### Services Cloud
- [Azure Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/)
- [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)
- [PostgreSQL](https://www.postgresql.org/)

### Outils de Développement
- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Swagger/OpenAPI](https://swagger.io/)
- [Postman](https://www.postman.com/)

## 📝 Conventions de Nommage

### Branches Git
- `main` - Branche principale stable
- `develop` - Branche de développement
- `feature/<nom-fonctionnalité>` - Nouvelles fonctionnalités
- `bugfix/<nom-bug>` - Corrections de bugs
- `hotfix/<nom-hotfix>` - Corrections urgentes
- `docs/<nom-doc>` - Documentation

### Commits
Format : `<type>: <description courte>`

Types :
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage, style
- `refactor:` - Refactorisation
- `test:` - Ajout/modification de tests
- `chore:` - Maintenance

Exemple : `feat: add user authentication with JWT`

## 🤝 Contribution

Pour contribuer au projet, veuillez :

1. Lire le **README.md** et le **CAHIER_DES_CHARGES.md**
2. Créer une branche depuis `develop`
3. Implémenter les changements en suivant l'architecture définie
4. Écrire des tests pour vos modifications
5. Créer une Pull Request avec description détaillée

## 📞 Support

Pour toute question sur la documentation :
- **Issues GitHub** : [Créer une issue](https://github.com/bigboss2944/Print3d-Finder-Figma/issues)
- **Documentation manquante ?** Créer une issue avec le label `documentation`

---

**Dernière mise à jour** : 17 décembre 2025  
**Version de la documentation** : 1.0  
**Statut du projet** : Prototype React (Phase 1) → Migration Blazor/MAUI planifiée

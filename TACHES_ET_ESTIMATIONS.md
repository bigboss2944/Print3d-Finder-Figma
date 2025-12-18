# Analyse des Tâches et Estimations - Print3D Finder

## 📋 Vue d'Ensemble

Ce document décompose chaque phase du projet en sous-tâches détaillées avec des estimations de temps. Les estimations sont données en **jours-homme effectifs** pour un développeur travaillant **à temps partiel (~50%)**.

**Convention de temps:**
- 1 jour effectif = 1 journée de travail complète (8 heures)
- Durée calendaire ≈ 2x durée effective (développement temps partiel)
- Les estimations incluent une marge de sécurité de ~20%

---

## Phase 1 : Conception et Préparation
**Durée totale : 20 jours effectifs (≈ 4 semaines calendaires)**

### 1.1 Finalisation du Cahier des Charges (3 jours)

#### 1.1.1 Revue et validation des spécifications fonctionnelles (1 jour)
- Relecture complète du cahier des charges
- Vérification de la cohérence entre sections
- Validation des exigences avec les parties prenantes
- Identification des ambiguïtés ou contradictions
- **Dépendances:** Aucune
- **Livrable:** Document validé avec changelog des modifications

#### 1.1.2 Priorisation des fonctionnalités pour MVP (1 jour)
- Classification MoSCoW (Must, Should, Could, Won't)
- Identification du périmètre minimal viable
- Définition des critères d'acceptation Phase 1
- Planification des fonctionnalités Phase 2/3
- **Dépendances:** 1.1.1
- **Livrable:** Backlog produit priorisé

#### 1.1.3 Documentation des user stories (1 jour)
- Rédaction des user stories principales
- Critères d'acceptation détaillés
- Scénarios de test utilisateur
- Maquettes de flux utilisateur
- **Dépendances:** 1.1.2
- **Livrable:** 20-30 user stories documentées

### 1.2 Design UI/UX avec Images Libres de Droits (7 jours)

#### 1.2.1 Maquettes haute-fidélité (7 jours)
- Design system (couleurs, typographie, composants)
- Maquettes desktop pour pages principales
- Maquettes mobile pour pages principales
- États interactifs (hover, focus, disabled)
- **Dépendances:** 1.2.2
- **Livrable:** Fichier Figma complet avec design system

### 1.3 Architecture Technique Détaillée (6 jours)

#### 1.3.1 Conception de l'architecture globale (1.5 jours)
- Diagrammes d'architecture (C4 model)
- Choix entre Blazor Server vs WebAssembly
- Architecture microservices vs monolithe
- Stratégie de déploiement cloud
- **Dépendances:** 1.1.1
- **Livrable:** Document d'architecture avec diagrammes

#### 1.3.2 Modélisation de la base de données (1.5 jours)
- Schéma entité-relation complet
- Tables, relations, contraintes
- Index pour optimisation (millions de modèles)
- Stratégie de partitionnement si nécessaire
- Scripts de création de schéma
- **Dépendances:** 1.3.1
- **Livrable:** Schéma DB + scripts SQL/migrations

#### 1.3.3 Conception des API endpoints (1 jour)
- Spécification OpenAPI/Swagger
- Définition de tous les endpoints REST
- DTOs (requêtes et réponses)
- Codes d'erreur standardisés
- **Dépendances:** 1.3.2
- **Livrable:** Spec OpenAPI complète

#### 1.3.4 Conception de la sécurité (1 jour)
- Architecture d'authentification JWT
- Stratégie de chiffrement (noms utilisateurs)
- Configuration HTTPS/TLS
- Plan de gestion des secrets
- Stratégie RGPD et conformité
- **Dépendances:** 1.3.1
- **Livrable:** Document de sécurité détaillé

#### 1.3.5 Stratégie de tests (1 jour)
- Approche TDD pour le projet
- Frameworks de test (xUnit, Moq, etc.)
- Structure des projets de tests
- Stratégie de couverture de code
- Tests d'intégration et E2E
- **Dépendances:** 1.3.3
- **Livrable:** Plan de tests et conventions

### 1.4 Sélection et Vérification des Packages (2 jours)

#### 1.4.1 Identification des packages nécessaires (0.5 jour)
- Liste exhaustive des besoins par domaine
  - UI: MudBlazor vs Tailwind CSS
  - Base de données: Entity Framework Core
  - Authentification: ASP.NET Core Identity
  - Cache: Redis
  - Logging: Serilog
  - Tests: xUnit, Moq, FluentAssertions
  - Images: ImageSharp ou SkiaSharp
- **Dépendances:** 1.3.1
- **Livrable:** Liste catégorisée de packages

#### 1.4.2 Évaluation et validation des packages (0.5 jours)
- Pour chaque package candidat:
  - Vérification de la licence (MIT, Apache 2.0, BSD)
  - Activité du projet (commits, issues, releases)
  - Qualité de la documentation
  - Taille de la communauté
  - Vulnérabilités connues (audit sécurité)
  - Compatibilité .NET 10
- Comparaison alternatives si plusieurs options
- **Dépendances:** 1.4.1
- **Livrable:** Tableau comparatif avec décisions

#### 1.4.3 Vérification des licences (0.5 jour)
- Audit approfondi des licences
- Vérification des dépendances transitives
- Documentation des obligations (attribution, etc.)
- Validation légale si nécessaire
- **Dépendances:** 1.4.2
- **Livrable:** Rapport de conformité des licences

#### 1.4.4 Documentation des dépendances retenues (0.5 jour)
- Liste finale avec versions
- Justification de chaque choix
- Plan de mise à jour
- Alternatives de fallback
- **Dépendances:** 1.4.3
- **Livrable:** Document de dépendances approuvées

### 1.5 Configuration de l'Environnement de Développement (1.0 jours)

#### 1.5.1 Setup des outils de développement (0.25 jour)
- Configuration git et conventions
- **Dépendances:** Aucune
- **Livrable:** Guide d'installation pour l'équipe

#### 1.5.2 Création de la structure de solution .NET (0.5 jour)
- Création des projets (API, Blazor, Shared, Tests)
- Configuration .editorconfig
- Configuration StyleCop et analyzers
- Setup CI/CD de base (GitHub Actions)
- Configuration SonarQube local
- **Dépendances:** 1.4.4
- **Livrable:** Solution .NET fonctionnelle avec structure

#### 1.5.3 Configuration des environnements (0.25 jour)
- Environnements Dev, Staging, Production
- Configuration appsettings par environnement
- Setup base de données locale (PostgreSQL/SQL Server)
- Configuration Docker local si nécessaire
- **Dépendances:** 1.5.2
- **Livrable:** Environnements configurés et documentés

---

## Phase 2 : Développement Backend
**Durée totale : 40 jours effectifs (≈ 16-20 semaines calendaires)**

### 2.1 Infrastructure et Configuration de Base (3 jours)

#### 2.1.1 Setup du projet API ASP.NET Core (0.5 jour)
- Création projet ASP.NET Core Web API .NET 10
- Configuration Program.cs et Startup
- Configuration Swagger/OpenAPI
- Setup CORS
- Configuration logging Serilog
- **Dépendances:** Phase 1
- **Livrable:** API fonctionnelle "Hello World"

#### 2.1.2 Configuration Entity Framework Core (1 jours)
- Setup DbContext et connexion
- Configuration des entités de base
- Migrations initiales
- Seed data pour développement
- **Dépendances:** 2.1.1
- **Livrable:** Base de données initialisée

#### 2.1.3 Configuration Redis et cache distribué (1 jour)
- Installation et configuration Redis
- Integration avec ASP.NET Core
- Configuration des politiques de cache
- **Dépendances:** 2.1.1
- **Livrable:** Cache opérationnel

#### 2.1.4 Middleware et pipeline HTTP (0.5 jour)
- Middleware de gestion d'erreurs globale
- Middleware de logging des requêtes
- Configuration rate limiting
- Configuration HTTPS strict
- Filtrage des logs (credentials)
- **Dépendances:** 2.1.1
- **Livrable:** Pipeline HTTP sécurisé et robuste

### 2.2 Authentification et Gestion Utilisateurs (3 jours)

#### 2.2.1 Configuration ASP.NET Core Identity (0.5 jour - TDD)
- Tests: Configuration Identity avec users
- Implémentation: Setup Identity avec EF Core
- Tests: Validation des contraintes
- Implémentation: Configuration des options (password policy)
- **Dépendances:** 2.1.2
- **Livrable:** Identity configuré avec tests

#### 2.2.2 Implémentation JWT (0.5 jours - TDD)
- Tests: Génération de tokens JWT
- Implémentation: Service de génération JWT
- Tests: Validation et expiration tokens
- Implémentation: Middleware de validation JWT
- Tests: Refresh tokens
- Implémentation: Gestion refresh tokens
- **Dépendances:** 2.2.1
- **Livrable:** Authentification JWT complète avec tests

#### 2.2.3 Chiffrement des noms d'utilisateurs (0.5 jour - TDD)
- Tests: Chiffrement AES-256
- Implémentation: Service de chiffrement
- Tests: Déchiffrement et edge cases
- Implémentation: Intégration avec Identity
- Tests: Performance avec volumes
- **Dépendances:** 2.2.1
- **Livrable:** Noms utilisateurs sécurisés

#### 2.2.4 Endpoints d'authentification (0.5 jours - TDD)
- Tests + Implémentation: POST /auth/register
- Tests + Implémentation: POST /auth/login
- Tests + Implémentation: POST /auth/refresh 
- Tests + Implémentation: POST /auth/logout 
- Tests + Implémentation: POST /auth/change-password
- Tests + Implémentation: POST /auth/forgot-password 
- **Dépendances:** 2.2.2, 2.2.3
- **Livrable:** API auth complète avec tests 80%+

#### 2.2.5 Gestion des utilisateurs (1.0 jours - TDD)
- Tests + Implémentation: GET /users/account
- Tests + Implémentation: PUT /users/account
- Tests + Implémentation: DELETE /users/account
- Tests + Implémentation: RGPD export données (0.75 jour)
- **Dépendances:** 2.2.4
- **Livrable:** Gestion utilisateurs conforme RGPD

### 2.3 Moteur de Recherche Textuelle (3 jours)

#### 2.3.1 Setup Elasticsearch/Azure Cognitive Search (0.5 jour)
- Installation et configuration Elasticsearch
- Configuration des index
- Mapping des champs de recherche
- Configuration des analyzers (multilingue)
- **Dépendances:** 2.1.2
- **Livrable:** Moteur de recherche opérationnel

#### 2.3.2 Indexation des modèles 3D (1 jours - TDD)
- Tests: Service d'indexation
- Implémentation: Indexation initiale bulk
- Tests: Indexation incrémentale (add/update/delete)
- Implémentation: Job d'indexation en background
- Tests: Gestion des erreurs d'indexation
- **Dépendances:** 2.3.1
- **Livrable:** Pipeline d'indexation automatique

#### 2.3.3 API de recherche textuelle (1 jours - TDD)
- Tests + Implémentation: GET /search?q=... (0.8 jour)
  - Recherche full-text
  - Scoring et pertinence
- Tests + Implémentation: Filtres avancés (0.6 jour)
  - Catégorie, matériaux, dimensions
  - Tri (popularité, date, prix)
- Tests + Implémentation: Auto-complétion (0.4 jour)
- Tests + Implémentation: Pagination cursor-based (0.2 jour)
- **Dépendances:** 2.3.2
- **Livrable:** API de recherche performante (<100ms)

#### 2.3.4 Optimisation pour millions de modèles (0.5 jour)
- Configuration index avec sharding
- Tests de charge (simulation 1M+ modèles)
- Tuning des requêtes
- Configuration cache des résultats fréquents
- **Dépendances:** 2.3.3
- **Livrable:** Recherche scalable <50ms

### 2.4 Recherche par Image avec IA (2.5 jours)

#### 2.4.1 Configuration Anthropic (0.5 jour)
- Création ressource Azure
- Configuration des clés API
- Tests de connexion
- Gestion des quotas
- **Dépendances:** 2.1.1
- **Livrable:** Service IA opérationnel

#### 2.4.2 Service de compression d'images (0.5 jour - TDD)
- Tests: Compression automatique au upload
- Implémentation: ImageSharp/SkiaSharp
- Tests: Conversion en WebP + fallback JPG
- Implémentation: Génération de thumbnails
- Tests: Optimisation qualité/taille
- Tests: Gestion EXIF et métadonnées
- **Dépendances:** 2.1.1
- **Livrable:** Images optimisées automatiquement

#### 2.4.3 Upload et analyse d'images (1 jours - TDD)
- Tests + Implémentation: POST /search/image (0.5 jour)
  - Validation format (JPG, PNG, HEIC)
  - Limite 10MB
- Tests + Implémentation: Compression post-upload (0.3 jour)
- Tests + Implémentation: Extraction features IA (0.4 jour)
- Tests + Implémentation: Scan antivirus (0.3 jour)
- **Dépendances:** 2.4.1, 2.4.2
- **Livrable:** Upload d'images sécurisé

#### 2.4.4 Matching et résultats (0.5 jour - TDD)
- Tests: Comparaison features visuelles
- Implémentation: Algorithme de similarité
- Tests: Scoring et ranking des résultats
- Implémentation: Cache des embeddings
- Tests: Performance (<3s par recherche)
- **Dépendances:** 2.4.3
- **Livrable:** Recherche par image fonctionnelle

### 2.5 Gestion des Commandes (3 jours)

#### 2.5.1 CRUD des commandes (0.5 jours - TDD)
- Tests + Implémentation: POST /orders
  - Validation complète des données
  - Calcul coût total
  - Génération OrderNumber unique
- Tests + Implémentation: GET /orders [User]
- Tests + Implémentation: GET /orders/{id}
- Tests + Implémentation: PUT /orders/{id}/status [Admin]
- Tests + Implémentation: GET /orders [Admin - toutes]
- **Dépendances:** 2.2.4, 2.5.1
- **Livrable:** API commandes complète

#### 2.5.2 Gestion des matériaux (0.5 jours - TDD)
- Tests + Implémentation: CRUD matériaux [Admin]
  - GET /admin/materials
  - POST /admin/materials
  - PUT /admin/materials/{id}
  - DELETE /admin/materials/{id}
  - PATCH /admin/materials/{id}/toggle-status
- Tests + Implémentation: GET /materials [Public] 
- **Dépendances:** 2.1.2
- **Livrable:** Gestion matériaux complète

#### 2.5.3 Gestion des sources de modèles (0.5 jours - TDD)
- Tests + Implémentation: CRUD sources [Admin]
  - GET /admin/model-sources
  - POST /admin/model-sources
  - PUT /admin/model-sources/{id}
  - DELETE /admin/model-sources/{id}
  - PATCH /admin/model-sources/{id}/toggle-status
- Tests + Implémentation: POST /admin/model-sources/{id}/sync
- Tests + Implémentation: GET /admin/model-sources/{id}/stats
- **Dépendances:** 2.1.2, 2.5.1
- **Livrable:** Configuration sources externe

### 2.6 Système de Notification Email (3 jours)

#### 2.6.1 Configuration Serveur Envoi Email (0.5 jour)
- Création serveur d'Envoi d'email
- Configuration clés API
- Configuration domaine et SPF/DKIM
- Vérification emails
- **Dépendances:** 2.1.1
- **Livrable:** Service email opérationnel

#### 2.6.2 Service de notification email (1 jours - TDD)
- Tests: Template email HTML
- Implémentation: Générateur de templates
- Tests: Envoi email nouvelle commande à admin
- Implémentation: Service SendNewOrderNotificationToAdmin
- Tests: Envoi email changement statut au client
- Implémentation: Service SendOrderStatusUpdateToCustomer
- Tests: Gestion erreurs d'envoi
- Tests: Rate limiting emails
- **Dépendances:** 2.7.1
- **Livrable:** Service notifications robuste

#### 2.6.3 Intégration avec workflow commandes (1 jour - TDD)
- Tests: Notification auto à création commande
- Implémentation: Hook dans OrderService.Create
- Tests: Notification à chaque changement statut
- Implémentation: Hook dans OrderService.UpdateStatus
- Tests: Logs et monitoring des emails
- **Dépendances:** 2.6.1, 2.7.2
- **Livrable:** Notifications automatiques fonctionnelles

### 2.7 Tests Unitaires Backend (3 jours intégrés en TDD)

**Note:** Les tests sont développés en TDD tout au long du développement (intégrés dans estimations ci-dessus). Cette section couvre la complétion finale de la couverture.

#### 2.7.1 Complétion couverture de code (0.5 jours)
- Analyse de couverture actuelle
- Identification des gaps (<70%)
- Ajout tests manquants pour atteindre 80%+
- Tests des edge cases
- **Dépendances:** Toutes les sous-sections de Phase 2
- **Livrable:** Couverture ≥80%

#### 2.7.2 Tests d'intégration API (0.5 jours)
- Tests end-to-end des flows principaux
- Tests avec base de données réelle
- Tests d'authentification intégrée
- Tests de performance (charge basique)
- **Dépendances:** 2.8.1
- **Livrable:** Suite de tests d'intégration

#### 2.7.3 Setup CI/CD avec tests automatiques (1 jour)
- Configuration GitHub Actions
- Exécution tests à chaque commit
- Rapports de couverture automatiques
- Quality gates (SonarQube)
- **Dépendances:** 2.8.2
- **Livrable:** Pipeline CI/CD opérationnel

#### 2.7.4 Documentation API (1 jour)
- Finalisation Swagger/OpenAPI
- Exemples de requêtes/réponses
- Documentation des codes d'erreur
- Guide d'utilisation API
- **Dépendances:** Toutes les sous-sections de Phase 2
- **Livrable:** Documentation API complète

---

## Phase 3 : Développement Frontend Web Blazor
**Durée totale : 30 jours effectifs (≈ 12-15 semaines calendaires)**

### 3.1 Setup et Configuration Blazor (1 jours)

#### 3.1.1 Création projet Blazor .NET 10 (0.25 jour)
- Choix Blazor WebAssembly vs Server (décision phase 1)
- Création du projet Blazor
- Configuration appsettings
- Configuration connexion API
- **Dépendances:** Phase 1, 2.1.1
- **Livrable:** Projet Blazor fonctionnel

#### 3.1.2 Configuration MudBlazor ou Tailwind CSS (0.25 jour)
- Installation package UI choisi
- Configuration thème et styles
- Setup composants de base
- Configuration responsive design
- **Dépendances:** 3.1.1
- **Livrable:** UI framework intégré

#### 3.1.3 Configuration bibliothèque partagée (0.25 jour)
- Création projet Print3DFinder.Shared
- Migration DTOs depuis backend
- Configuration références
- Validation compilation croisée
- **Dépendances:** 3.1.1, 2.1.1
- **Livrable:** Bibliothèque partagée fonctionnelle

### 3.2 Services et État Application (3 jours)

#### 3.2.1 Service client API HTTP (1 jour)
- Implémentation HttpClient configuré
- Gestion des headers (JWT)
- Intercepteurs pour authentification
- Gestion des erreurs HTTP
- **Dépendances:** 3.1.1
- **Livrable:** Client API robuste

#### 3.2.2 Service d'authentification (1 jour)
- Gestion du token JWT côté client
- Stockage sécurisé (localStorage)
- Gestion refresh token
- Auto-déconnexion à expiration
- **Dépendances:** 3.2.1, 2.2.4
- **Livrable:** Auth client fonctionnelle

#### 3.2.3 Gestion d'état global (1 jour)
- State container pour données partagées
- Gestion utilisateur connecté
- Gestion panier/commande en cours
- Event bus pour communication composants
- **Dépendances:** 3.2.2
- **Livrable:** State management centralisé

### 3.3 Pages d'Authentification (1.5 jours)

#### 3.3.1 Page de connexion (0.5 jour)
- Composant Login.razor
- Formulaire avec validation
- Gestion erreurs (messages explicites)
- Redirection post-connexion
- Tests manuels
- **Dépendances:** 3.2.2, 1.2.3
- **Livrable:** Page login fonctionnelle

#### 3.3.2 Page d'inscription (0.5 jour)
- Composant Register.razor
- Formulaire multi-étapes si besoin
- Validation côté client (FluentValidation)
- Confirmation email workflow
- Tests manuels
- **Dépendances:** 3.2.2
- **Livrable:** Page register fonctionnelle

#### 3.3.3 Pages de récupération mot de passe (0.5 jour)
- Composant ForgotPassword.razor
- Composant ResetPassword.razor
- Workflow email de reset
- Tests du flow complet
- **Dépendances:** 3.2.2
- **Livrable:** Récupération mdp fonctionnelle

### 3.4 Interface de Recherche (3.5 jours)

#### 3.4.1 Barre de recherche textuelle (1.5 jours)
- Composant SearchBar.razor
- Auto-complétion en temps réel
- Gestion des suggestions
- Intégration avec API search
- Tests manuels
- **Dépendances:** 3.2.1, 2.3.3
- **Livrable:** Recherche textuelle fonctionnelle

#### 3.4.2 Upload et recherche par photo (1 jours)
- Composant ImageUpload.razor
- Drag & drop d'image
- Prévisualisation avant envoi
- Intégration avec API image search
- Gestion progression upload
- Messages d'erreur explicites
- Tests manuels
- **Dépendances:** 3.2.1, 2.4.3
- **Livrable:** Recherche photo fonctionnelle

#### 3.4.3 Filtres avancés (1 jours)
- Composant Filters.razor
- Filtres catégorie, matériaux, dimensions
- Filtres prix et popularité
- Application dynamique des filtres
- Persistance filtres (URL params)
- Tests manuels
- **Dépendances:** 3.4.1, 2.3.3
- **Livrable:** Filtres avancés fonctionnels

### 3.5 Affichage des Résultats (3 jours)

#### 3.5.1 Liste/Grille de résultats (1 jours)
- Composant SearchResults.razor
- Vue grille avec thumbnails
- Vue liste alternative
- Lazy loading images
- Affichage auteur/créateur
- Tests manuels
- **Dépendances:** 3.4.1, 2.5.1
- **Livrable:** Affichage résultats fonctionnel

#### 3.5.2 Tri et pagination (1 jour)
- Options de tri (pertinence, popularité, date, prix)
- Pagination cursor-based
- Infinite scroll optionnel
- Indicateur de chargement
- Tests manuels
- **Dépendances:** 3.5.1
- **Livrable:** Tri et pagination fonctionnels

#### 3.5.3 Page détails de modèle (1 jours)
- Composant ModelDetails.razor
- Galerie d'images (multiples angles)
- Affichage métadonnées (dimensions, auteur, licence)
- Affichage compatibilité matériaux
- Rapport d'analyse printabilité (Phase 1 - basique)
- Bouton "Commander l'impression"
- Tests manuels
- **Dépendances:** 3.5.1, 2.5.1
- **Livrable:** Page détails complète

### 3.6 Workflow de Commande (5 jours)

#### 3.6.1 Configuration impression (1 jours)
- Composant PrintConfiguration.razor
- Sélection matériau (liste dynamique depuis API)
- Sélection couleur
- Sélection qualité (Draft/Standard/High)
  - Note: Buse fixe 0.4mm en Phase 1
- Réglage infill (10-100%)
- Options post-traitement
- Estimation coût et temps en temps réel
- Tests manuels
- **Dépendances:** 3.5.3, 2.6.1, 2.6.2
- **Livrable:** Configuration impression fonctionnelle

#### 3.6.2 Récapitulatif commande (0.5 jours)
- Composant OrderSummary.razor
- Affichage complet de la configuration
- Détail des coûts (matériau, main d'œuvre, livraison)
- Formulaire adresse de livraison
- Validation données
- Tests manuels
- **Dépendances:** 3.6.1
- **Livrable:** Récapitulatif commande fonctionnel

#### 3.6.3 Confirmation et envoi (1 jours)
- Composant OrderConfirmation.razor
- Conditions générales de vente
- Bouton validation finale
- Intégration API POST /orders
- Affichage succès avec numéro commande
- Redirection vers suivi
- Tests du workflow complet
- **Dépendances:** 3.6.2, 2.6.1, 2.7.2
- **Livrable:** Workflow commande complet

### 3.7 Tableau de Bord Utilisateur (2 jours)

#### 3.7.1 Profil utilisateur (0.5 jour)
- Composant UserProfile.razor
- Affichage informations personnelles
- Formulaire modification profil
- Changement mot de passe
- Tests manuels
- **Dépendances:** 3.2.2, 2.2.5
- **Livrable:** Profil utilisateur fonctionnel

#### 3.7.2 Historique des commandes (1 jours)
- Composant OrderHistory.razor
- Liste des commandes avec statuts
- Filtres par statut et date
- Détails commande au clic
- Suivi en temps réel
- Tests manuels
- **Dépendances:** 3.2.1, 2.6.1
- **Livrable:** Historique commandes fonctionnel

#### 3.7.3 Favoris et préférences (0.5 jour)
- Composant Favorites.razor (si implémenté backend)
- Liste des modèles favoris
- Paramètres de notification
- Tests manuels
- **Dépendances:** 3.7.1
- **Livrable:** Gestion favoris fonctionnelle

### 3.8 Panneau Administrateur (2.5 jours)

#### 3.8.1 Dashboard admin (1 jour)
- Composant AdminDashboard.razor
- Statistiques clés (commandes, revenus, utilisateurs)
- Graphiques (recharts ou similar)
- Indicateurs temps réel
- Tests manuels
- **Dépendances:** 3.2.2, 2.6.1
- **Livrable:** Dashboard admin fonctionnel

#### 3.8.2 Gestion des commandes (0.5 jours)
- Composant AdminOrders.razor
- Liste toutes commandes avec filtres
- Changement de statut
- Ajout notes internes
- Notification email lors changements
- Tests manuels
- **Dépendances:** 3.8.1, 2.6.1, 2.7.2
- **Livrable:** Gestion commandes admin

#### 3.8.3 Gestion des matériaux (0.5 jour)
- Composant AdminMaterials.razor
- Liste, ajout, modification, suppression
- Activation/désactivation
- Gestion couleurs disponibles
- Tests manuels
- **Dépendances:** 3.8.1, 2.6.2
- **Livrable:** Gestion matériaux admin

#### 3.8.4 Gestion des sources de modèles (0.5 jours)
- Composant AdminModelSources.razor
- Liste, ajout, modification, suppression sources
- Configuration sync et rate limiting
- Déclenchement sync manuel
- Affichage statistiques par source
- Tests manuels
- **Dépendances:** 3.8.1, 2.6.3
- **Livrable:** Gestion sources admin

### 3.9 Tests End-to-End Frontend (2 jours)

#### 3.9.1 Configuration Playwright (0.5 jour)
- Installation Playwright
- Configuration tests E2E
- Setup fixtures et helpers
- **Dépendances:** 3.1.1
- **Livrable:** Framework E2E prêt

#### 3.9.2 Tests des parcours utilisateurs (1.5 jours)
- Test: Inscription → Connexion (0.3 jour)
- Test: Recherche → Détails → Commande (0.5 jour)
- Test: Admin - Gestion commandes (0.3 jour)
- Test: Admin - Gestion matériaux et sources (0.4 jour)
- **Dépendances:** 3.9.1, toutes sections 3.x
- **Livrable:** Suite tests E2E complète

---

## Phase 4 : Tests et Optimisations
**Durée totale : 20 jours effectifs (≈ 8-10 semaines calendaires)**

### 4.1 Complétion de la Couverture de Tests (2.75 jours)

#### 4.1.1 Analyse de couverture globale (0.25 jour)
- Rapport de couverture backend
- Rapport de couverture frontend (si applicable)
- Identification des gaps critiques
- Priorisation des tests à ajouter
- **Dépendances:** Phase 2, Phase 3
- **Livrable:** Rapport d'analyse de couverture

#### 4.1.2 Ajout tests unitaires manquants (1 jours)
- Backend: Complétion à 80%+ (1 jour)
- Frontend: Tests composants critiques (1 jour)
- Tests edge cases
- **Dépendances:** 4.1.1
- **Livrable:** Couverture ≥80%

#### 4.1.3 Tests d'intégration supplémentaires (1 jour)
- Workflows complexes
- Cas multi-utilisateurs
- Tests de régression
- **Dépendances:** 4.1.2
- **Livrable:** Suite complète tests intégration

#### 4.1.4 Validation quality gates (0.5 jour)
- Vérification SonarQube: Note A/B
- Vérification complexité cyclomatique <10
- Vérification duplication <3%
- Résolution des code smells critiques
- **Dépendances:** 4.1.3
- **Livrable:** Quality gates validés

### 4.2 Tests de Charge et Performance (5 jours)

#### 4.2.1 Setup environnement de tests de charge (1 jour)
- Installation k6 ou JMeter
- Configuration environnement de test
- Préparation données de test (1M+ modèles)
- Scripts de génération de charge
- **Dépendances:** Phase 2
- **Livrable:** Environnement tests charge prêt

#### 4.2.2 Tests de performance API (2 jours)
- Test: Recherche textuelle (latence <100ms) (0.5 jour)
- Test: Recherche par image (latence <3s) (0.5 jour)
- Test: CRUD opérations (latence <50ms) (0.3 jour)
- Test: Charge simultanée (1000 users) (0.4 jour)
- Test: Requêtes sur 1M+ modèles (0.3 jour)
- **Dépendances:** 4.2.1, 2.3.4
- **Livrable:** Rapports de performance API

#### 4.2.3 Optimisations backend (1.5 jours)
- Optimisation requêtes SQL lentes
- Configuration cache Redis stratégique
- Tuning Elasticsearch
- Optimisation sérialisation JSON
- Ajout index DB manquants
- **Dépendances:** 4.2.2
- **Livrable:** API optimisée

#### 4.2.4 Tests de performance frontend (0.5 jour)
- Lighthouse audit (performance, SEO, a11y)
- Tests de chargement initial (<2s)
- Tests de rendering (FCP, LCP)
- Tests sur connexions lentes
- **Dépendances:** Phase 3
- **Livrable:** Rapport performance frontend

### 4.3 Tests de Sécurité (2.5 jours)

#### 4.3.1 Configuration environnement de tests sécurité (0.5 jour)
- Installation OWASP ZAP ou Burp Suite
- Configuration SSL/TLS test server
- Préparation scénarios d'attaque
- **Dépendances:** Phase 2, Phase 3
- **Livrable:** Environnement tests sécurité

#### 4.3.2 Tests HTTPS et TLS (0.25 jour)
- Validation certificat SSL
- Test HSTS (Strict-Transport-Security)
- Test redirection HTTP → HTTPS
- Test TLS 1.3 configuration
- Scan vulnérabilités SSL (testssl.sh)
- **Dépendances:** 4.3.1
- **Livrable:** Rapport conformité HTTPS

#### 4.3.3 Tests d'authentification (0.25 jours)
- Test force brute (rate limiting)
- Test expiration tokens JWT
- Test refresh tokens
- Test XSS (injection scripts)
- Test CSRF (tokens anti-forgery)
- Test injection SQL (parameterized queries)
- **Dépendances:** 4.3.1, 2.2.4
- **Livrable:** Rapport sécurité authentification

#### 4.3.4 Tests de protection des données (0.25 jour)
- Validation chiffrement noms utilisateurs
- Test pas de credentials dans logs
- Test masquage emails dans logs
- Test RGPD (export, suppression données)
- Test permissions (autorisation rôles)
- **Dépendances:** 4.3.3, 2.2.3
- **Livrable:** Rapport conformité RGPD

#### 4.3.5 Tests upload de fichiers (0.25 jour)
- Test validation formats fichiers
- Test limites de taille (10MB/50MB)
- Test scan antivirus (simulation malware)
- Test injection via nom de fichier
- Test path traversal
- **Dépendances:** 4.3.1, 2.4.3, 2.5.2
- **Livrable:** Rapport sécurité uploads

#### 4.3.6 Audit de sécurité global (1 jour)
- Scan OWASP Top 10
- Audit dépendances (vulnérabilités connues)
- Revue configuration serveurs
- Tests de pénétration basiques
- Documentation recommandations
- **Dépendances:** 4.3.2, 4.3.3, 4.3.4, 4.3.5
- **Livrable:** Rapport d'audit complet

### 4.4 Corrections de Bugs (2.25 jours)

#### 4.4.1 Triage et priorisation des bugs (0.25 jour)
- Revue backlog bugs
- Classification (critique, majeur, mineur)
- Priorisation selon impact
- Assignment des bugs
- **Dépendances:** 4.1, 4.2, 4.3
- **Livrable:** Backlog bugs priorisé

#### 4.4.2 Corrections bugs critiques (1 jours)
- Bugs de sécurité
- Bugs bloquants fonctionnalité
- Bugs avec perte de données
- Tests de régression post-fix
- **Dépendances:** 4.4.1
- **Livrable:** Bugs critiques résolus

#### 4.4.3 Corrections bugs majeurs/mineurs (1 jour)
- Bugs d'UX importants
- Bugs de performance
- Bugs cosmétiques prioritaires
- Tests de régression post-fix
- **Dépendances:** 4.4.2
- **Livrable:** Backlog bugs nettoyé

### 4.5 Optimisations (1.5 jours)

#### 4.5.1 Optimisations base de données (0.25 jour)
- Ajout index manquants
- Optimisation requêtes N+1
- Configuration paramètres PostgreSQL
- Stratégie de vacuum et maintenance
- **Dépendances:** 4.2.2
- **Livrable:** DB optimisée

#### 4.5.2 Optimisations cache (0.25 jour)
- Configuration cache distribué Redis
- Stratégie de cache par feature
- Cache des résultats recherche fréquents
- Invalidation intelligente du cache
- **Dépendances:** 4.2.2
- **Livrable:** Stratégie cache efficace

#### 4.5.3 Optimisations frontend (1 jour)
- Lazy loading composants
- Code splitting Blazor
- Compression assets (images, CSS, JS)
- Service worker / PWA (optionnel)
- **Dépendances:** 4.2.4
- **Livrable:** Frontend optimisé

---

## Phase 5 : Déploiement et Lancement
**Durée totale : 10 jours effectifs (≈ 4-5 semaines calendaires)**

### 5.1 Configuration Environnement Production (3 jours)

#### 5.1.1 Provisioning infrastructure Azure/AWS (1 jour)
- Création ressources cloud
  - App Service / EC2
  - Base de données managée
  - Redis managé
  - Blob Storage / S3
  - CDN
- Configuration réseau et sécurité
- Configuration backup automatique
- **Dépendances:** Phase 4
- **Livrable:** Infrastructure cloud provisionnée

#### 5.1.2 Configuration DNS et certificats SSL (0.5 jour)
- Achat/configuration domaine
- Génération certificats SSL (Let's Encrypt)
- Configuration DNS (A, CNAME records)
- Configuration CDN
- **Dépendances:** 5.1.1
- **Livrable:** Domaine HTTPS fonctionnel

#### 5.1.3 Configuration secrets et variables d'environnement (0.5 jour)
- Azure Key Vault / AWS Secrets Manager
- Configuration variables production
- Rotation clés API
- Configuration connection strings
- **Dépendances:** 5.1.1
- **Livrable:** Secrets sécurisés

#### 5.1.4 Configuration monitoring et logging (1 jour)
- Application Insights / CloudWatch
- Configuration alertes (erreurs, performance)
- Configuration dashboards
- Log aggregation (Serilog → Azure/ELK)
- Uptime monitoring (Pingdom/UptimeRobot)
- **Dépendances:** 5.1.1
- **Livrable:** Monitoring opérationnel

### 5.2 Déploiement en Production (1.25 jours)

#### 5.2.1 Migration base de données production (0.25 jour)
- Application migrations EF Core
- Seed data initial production
- Validation intégrité données
- Backup pré-déploiement
- **Dépendances:** 5.1.1, 5.1.3
- **Livrable:** DB production initialisée

#### 5.2.2 Déploiement backend API (0.25 jour)
- Build production API
- Déploiement via CI/CD pipeline
- Configuration CORS production
- Tests smoke post-déploiement
- **Dépendances:** 5.2.1, 5.1.3
- **Livrable:** API production déployée

#### 5.2.3 Déploiement frontend Blazor (0.25 jour)
- Build production Blazor
- Déploiement via CI/CD pipeline
- Configuration variables production
- Tests smoke post-déploiement
- **Dépendances:** 5.2.2
- **Livrable:** Frontend production déployé

#### 5.2.4 Tests end-to-end en production (0.5 jour)
- Tests parcours utilisateur complets
- Tests de tous les endpoints critiques
- Validation emails de notification
- Validation uploads fichiers
- **Dépendances:** 5.2.3
- **Livrable:** Production validée fonctionnelle

### 5.3 Configuration CDN et Performance (1 jour)

#### 5.3.1 Configuration Azure CDN / CloudFront (0.5 jour)
- Configuration règles de cache
- Configuration compression (gzip/brotli)
- Configuration headers HTTP
- Configuration purge automatique
- **Dépendances:** 5.2.3
- **Livrable:** CDN optimisé

#### 5.3.2 Optimisation livraison assets (0.5 jour)
- Configuration cache browser
- Configuration CDN pour images
- Configuration CDN pour fichiers 3D
- Tests performance global (Lighthouse)
- **Dépendances:** 5.3.1
- **Livrable:** Performance production validée

### 5.4 Configuration Emails de Notification (1 jour)

#### 5.4.1 Configuration domaine email production (0.3 jour)
- Configuration SPF, DKIM, DMARC
- Vérification SendGrid production
- Tests d'envoi emails
- **Dépendances:** 5.1.2
- **Livrable:** Emails production opérationnels

#### 5.4.2 Configuration templates emails finaux (0.4 jour)
- Finalisation design emails HTML
- Tests rendu sur clients email (Gmail, Outlook, etc.)
- Configuration unsubscribe links
- **Dépendances:** 5.4.1
- **Livrable:** Templates emails finalisés

#### 5.4.3 Tests workflow notifications complet (0.3 jour)
- Test notification admin nouvelle commande
- Test notifications client changement statut
- Test gestion erreurs d'envoi
- Validation logs des emails
- **Dépendances:** 5.4.2, 5.2.4
- **Livrable:** Notifications validées en prod

### 5.5 Préparation Lancement Beta (2 jours)

#### 5.5.1 Documentation utilisateur (1 jour)
- Guide utilisateur PDF/web
- Tutoriels vidéo (optionnel mais recommandé)
- FAQ
- Page "Contact / Support"
- **Dépendances:** Phase 3
- **Livrable:** Documentation utilisateur complète

#### 5.5.2 Préparation marketing (0.5 jour)
- Page landing page
- Email aux premiers beta testers
- Contenu blog (optionnel)
- **Dépendances:** 5.5.1
- **Livrable:** Matériel marketing prêt

#### 5.5.3 Plan de contingence (0.5 jour)
- Procédure de rollback
- Contact support d'urgence
- Procédure d'escalade bugs critiques
- Backup et restauration
- **Dépendances:** 5.2.4
- **Livrable:** Plan de contingence documenté

### 5.6 Lancement Beta (1 jour)

#### 5.6.1 Lancement contrôlé (0.3 jour)
- Annonce publique
- Ouverture accès beta testers
- Monitoring intensif (première heure)
- **Dépendances:** 5.5.2, 5.5.3
- **Livrable:** Application en beta publique

#### 5.6.2 Support utilisateurs jour 1 (0.4 jour)
- Réponses questions utilisateurs
- Hotfix bugs mineurs si nécessaire
- Monitoring des métriques
- **Dépendances:** 5.6.1
- **Livrable:** Support actif

#### 5.6.3 Rapport post-lancement (0.3 jour)
- Métriques jour 1 (inscriptions, recherches, commandes)
- Bugs identifiés et priorisés
- Feedback utilisateurs consolidé
- Plan d'action semaine 1
- **Dépendances:** 5.6.2
- **Livrable:** Rapport post-lancement

### 5.7 Collecte de Feedback (semaines suivantes - non estimé)

Cette section se poursuit sur plusieurs semaines après le lancement.

#### 5.7.1 Mise en place outils feedback
- Google Analytics / Matomo
- Hotjar ou similar (heatmaps, recordings)
- Formulaire feedback in-app
- Monitoring satisfaction (NPS)
- **Livrable:** Outils analytics déployés

#### 5.7.2 Analyse et itération
- Revue hebdomadaire des métriques
- Analyse des points de friction
- Priorisation améliorations
- Itération continue
- **Livrable:** Backlog priorisé pour itérations

---

## 📊 Récapitulatif des Estimations

### Par Phase (jours effectifs)

| Phase | Durée Effective | Durée Calendaire (temps partiel) |
|-------|----------------|----------------------------------|
| Phase 1: Conception et Préparation | 20 jours | 8-10 semaines |
| Phase 2: Développement Backend | 40 jours | 16-20 semaines |
| Phase 3: Développement Frontend | 30 jours | 12-15 semaines |
| Phase 4: Tests et Optimisations | 20 jours | 8-10 semaines |
| Phase 5: Déploiement et Lancement | 10 jours | 4-5 semaines |
| **TOTAL** | **120 jours** | **48-60 semaines** |

### Durée Totale

- **Jours effectifs:** 120 jours (24 semaines à temps plein)
- **Durée calendaire (temps partiel ~50%):** 48-60 semaines (12-15 mois)
- **Marge de sécurité incluse:** ~20% dans chaque estimation

### Répartition du Temps

| Catégorie | Jours | Pourcentage |
|-----------|-------|-------------|
| Conception & Architecture | 20 | 17% |
| Développement Backend | 40 | 33% |
| Développement Frontend | 30 | 25% |
| Tests & Qualité | 20 | 17% |
| Déploiement | 10 | 8% |

---

## 🎯 Chemin Critique

### Dépendances Critiques

Le chemin critique du projet (séquence de tâches qui détermine la durée minimale):

1. **Phase 1 complète** → Bloque tout le reste
2. **Phase 2.2 (Authentification)** → Bloque toute l'application (backend et frontend)
3. **Phase 2.5 (Modèles 3D)** → Bloque recherche et commandes
4. **Phase 2.6 (Commandes)** → Bloque workflow commande frontend
5. **Phase 3.2 (Services client)** → Bloque tout le frontend
6. **Phase 4.3 (Tests sécurité)** → Bloque déploiement production

### Tâches Parallélisables

Certaines tâches peuvent être développées en parallèle (si équipe multiple):
- Phase 2.3 (Recherche) + Phase 2.4 (IA Image) - indépendantes
- Phase 2.7 (Notifications) peut démarrer après 2.6.1
- Phase 3.7 (Dashboard User) + Phase 3.8 (Dashboard Admin) - après 3.2
- Phase 4.1 (Tests) + Phase 4.2 (Performance) - partiellement parallèle

---

## ⚠️ Risques et Facteurs d'Incertitude

### Risques Techniques (Impact sur Estimations)

| Risque | Impact Potentiel | Mitigation |
|--------|------------------|------------|
| Complexité intégration IA (recherche image) | +2-3 jours | POC dès Phase 1 |
| Performance recherche 1M+ modèles | +2-4 jours | Tests de charge tôt (Phase 2) |
| Bugs complexes difficiles à reproduire | +3-5 jours | Logs détaillés, monitoring |
| Problèmes infrastructure cloud | +1-2 jours | Infrastructure as Code, tests staging |
| Migration Blazor WebAssembly vs Server | +2-3 jours | Décision architecturale Phase 1 |

### Facteurs de Variabilité

- **Expérience du développeur avec .NET 10 / Blazor:** ±20-30% sur Phase 3
- **Qualité de la documentation des packages externes:** ±10-15% global
- **Disponibilité réelle temps partiel:** ±20-40% sur durée calendaire
- **Charge de travail parallèle (autres responsabilités):** Variable imprévisible

### Recommandations

1. **Buffer de temps:** Prévoir 20-25% de temps additionnel pour imprévus
2. **Sprints courts:** Travailler en sprints de 1-2 semaines pour meilleure visibilité
3. **Revue régulière:** Ajuster estimations après chaque phase
4. **Priorisation stricte:** Respecter le MVP et reporter features non-critiques
5. **Documentation continue:** Ne pas négliger la documentation (coût faible, valeur haute)

---

## 📝 Notes et Conventions

### Approche TDD (Test-Driven Development)

Toutes les estimations backend incluent le temps pour écrire les tests **avant** le code de production. Ratio temps tests/implémentation ≈ 40/60.

### Temps de Révision et Refactoring

Inclus dans les estimations (+15-20% par tâche) pour:
- Revue de code (même en solo: relecture le lendemain)
- Refactoring pour améliorer qualité
- Corrections suite à analyse statique (SonarQube)

### Temps de Documentation

Documentation technique (comments XML, README, guides) incluse dans estimations (≈5-10% du temps développement).

### Temps de Déploiement et Configuration

Setup initial environnements et CI/CD prend du temps mais réduit coût futur. Investi en Phase 1 et 2.

---

**Document rédigé le:** 18 décembre 2025  
**Version:** 1.0  
**Auteur:** Équipe Print3D Finder  
**Prochaine révision:** Après Phase 1 (ajustement selon réalité terrain)

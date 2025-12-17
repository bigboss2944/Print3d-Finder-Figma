# Cahier des Charges - Print3D Finder

## 1. Présentation du Projet

### 1.1 Contexte
Print3D Finder est une plateforme de recherche et d'impression de modèles 3D permettant aux utilisateurs de rechercher des objets à imprimer en 3D via une interface web et mobile, puis de commander leur impression auprès d'un service d'impression professionnel.

### 1.2 Objectif
Fournir une solution complète permettant aux utilisateurs de :
- Rechercher des modèles 3D via une barre de recherche textuelle ou une recherche par photo
- Visualiser et analyser les modèles disponibles
- Vérifier la compatibilité d'impression (matériaux, dimensions)
- Soumettre des demandes d'impression sécurisées

### 1.3 Portée du Projet
Le projet est développé par un développeur solo et se déroule en deux phases principales :
- **Phase 1 - Application Web** : Développée avec Blazor .NET 10 (priorité initiale)
- **Phase 2 - Application Mobile** : Développée avec .NET MAUI (développement ultérieur)

Ce document se concentre principalement sur la phase 1 (Application Web), avec des spécifications pour la phase 2 (Mobile) qui sera développée après la mise en production de l'application web.

## 2. Spécifications Fonctionnelles

### 2.1 Authentification et Sécurité des Utilisateurs

#### 2.1.1 Gestion des Comptes Utilisateurs
- **Inscription sécurisée** :
  - Nom d'utilisateur sécurisé (chiffrement et hachage)
  - Adresse email valide et vérifiée
  - Mot de passe robuste avec critères de sécurité (minimum 8 caractères, majuscules, minuscules, chiffres, caractères spéciaux)
  - Confirmation d'email obligatoire
  
- **Connexion sécurisée** :
  - **Connexion HTTPS obligatoire** (TLS 1.3) pour toutes les communications
  - Authentification via JWT (JSON Web Tokens)
  - Support de l'authentification à deux facteurs (2FA) optionnelle
  - Limitation des tentatives de connexion pour prévenir les attaques par force brute
  - Session sécurisée avec token d'expiration

#### 2.1.2 Protection des Données Personnelles
- **Conformité RGPD** :
  - Consentement explicite pour la collecte de données
  - Droit à l'oubli et suppression des données
  - Export des données personnelles
  - Politique de confidentialité claire

- **Sécurité des noms d'utilisateurs** :
  - Chiffrement des noms d'utilisateurs en base de données
  - Hashage avec algorithme bcrypt ou Argon2
  - Protection contre les injections SQL
  - Validation et sanitisation des entrées utilisateur
  - Pas d'affichage des noms d'utilisateurs complets dans les URLs

### 2.2 Fonctionnalités de Recherche

#### 2.2.1 Recherche Textuelle
- **Barre de recherche intelligente** :
  - Auto-complétion des requêtes
  - Suggestions de recherche basées sur l'historique
  - Recherche par mots-clés (nom, catégorie, tags)
  - Filtres avancés :
    - Catégorie (décoration, gadgets, jouets, art, utilitaire, mode)
    - Niveau de complexité
    - Taille du modèle
    - Type de fichier (STL, OBJ, 3MF)
    - Popularité (nombre de téléchargements, notes)

#### 2.2.2 Recherche par Photo
- **Upload et analyse d'image** :
  - Upload depuis la galerie (mobile) ou explorateur de fichiers (web)
  - Prise de photo directe (mobile uniquement)
  - Formats acceptés : JPG, PNG, HEIC
  - Taille maximale : 10 MB (avant compression)
  - **Compression automatique des images** :
    - Compression côté serveur après upload
    - Format de sortie : WebP (fallback JPG pour compatibilité)
    - Qualité ajustée selon usage (recherche: 80%, miniatures: 70%)
    - Réduction automatique si > 2048px sur le côté le plus long
    - Optimisation pour réduire la bande passante et le stockage
  
- **Reconnaissance visuelle** :
  - Analyse d'image par IA pour identifier l'objet
  - Extraction des caractéristiques visuelles
  - Correspondance avec la base de données de modèles 3D
  - Affichage des résultats par pertinence

### 2.3 Visualisation des Modèles 3D

**Note Version 1** : La visualisation 3D interactive n'est pas incluse dans la version 1 de l'application. Cependant, les considérations techniques et matérielles pour son développement futur sont prises en compte dans l'architecture.

#### 2.3.1 Galerie de Résultats
- Affichage en grille avec miniatures (images statiques)
- Vue liste alternative
- Pagination ou scroll infini
- Tri par :
  - Pertinence
  - Popularité
  - Note des utilisateurs
  - Date d'ajout
  - Prix d'impression estimé

#### 2.3.2 Page de Détails du Modèle
- **Visualisation du modèle (Version 1)** :
  - Images statiques du modèle (multiples angles)
  - Visualisation des dimensions en format texte
  - Aperçu 2D du modèle

- **Visualisation 3D interactive (Version 2 - Développement ultérieur)** :
  - Rotation 360° du modèle
  - Zoom avant/arrière
  - Affichage en mode wireframe optionnel
  - **Considérations architecturales** :
    - Support navigateur : WebGL 2.0 requis
    - Librairie recommandée : Three.js ou Babylon.js
    - Format de fichiers optimisé : glTF 2.0 pour le web
    - Hébergement des modèles : CDN pour performance
    - Limitations : Taille max 10MB par modèle pour rendu web

- **Informations du modèle** :
  - **Auteur/Créateur** : Affichage du nom de l'auteur/créateur du modèle
  - Nom et description
  - Créateur / Source
  - Licence (CC BY, CC BY-SA, usage commercial, etc.)
  - Dimensions (L x l x h)
  - Poids estimé du modèle imprimé
  - Temps d'impression approximatif
  - Complexité d'impression
  - Nombre de pièces
  - Support requis (oui/non)

### 2.4 Analyse de Printabilité

#### 2.4.1 Vérification Automatique
Le système doit analyser automatiquement chaque modèle sélectionné pour déterminer :

- **Compatibilité matériau** :
  - PLA (recommandé pour objets décoratifs)
  - ABS (objets résistants à la chaleur)
  - PETG (usage extérieur, alimentaire)
  - TPU/Flexible (objets souples)
  - Résine (haute précision)

- **Vérification des dimensions** :
  - Comparaison avec le volume d'impression disponible
  - Possibilité de découpage en plusieurs parties si trop grand
  - Suggestion d'échelle optimale

- **Estimation des coûts** :
  - Calcul du volume de matière nécessaire
  - Temps d'impression estimé
  - Prix total incluant matériaux, électricité, main d'œuvre

> **Note Phase 1** : L'analyse structurelle avancée (détection des surfaces non supportées, calcul de stabilité, identification des zones nécessitant des supports, épaisseur des parois) sera développée dans une **Phase 3 future** après la mise en production. La Phase 1 se concentre sur les vérifications de base (matériaux, dimensions, coûts).

#### 2.4.2 Rapport d'Analyse
Affichage d'un rapport détaillé comprenant :
- ✅ Statut : Imprimable / Non imprimable / Modifications nécessaires
- Matériaux compatibles
- Dimensions finales
- Estimation du temps d'impression
- Prix total estimé
- Recommandations et avertissements

### 2.5 Processus de Commande d'Impression

#### 2.5.1 Configuration de la Commande
L'utilisateur peut personnaliser :
- **Matériau** : Choix parmi les matériaux compatibles
- **Couleur** : Sélection de couleur (selon disponibilité)
- **Buse d'impression** : **Fixe à 0.4mm pour la Phase 1** (gestion et sélection de buses → Phase 3)
- **Qualité d'impression** (avec buse 0.4mm fixe) :
  - Brouillon (0.3mm) - rapide, moins détaillé
  - Standard (0.2mm) - équilibre qualité/temps
  - Haute qualité (0.15mm) - détails fins, plus long
- **Options additionnelles** :
  - Remplissage (10% à 100%)
  - Post-traitement (ponçage, peinture)
  - Supports amovibles
  - Échelle personnalisée

#### 2.5.2 Récapitulatif et Validation
- Aperçu final du modèle configuré
- Détail des coûts :
  - Matériau
  - Main d'œuvre
  - Post-traitement
  - Livraison
  - Total TTC
- Délai de production estimé
- Adresse de livraison
- Conditions générales de vente

#### 2.5.3 Envoi de la Demande
Une fois validée, la demande est transmise au gestionnaire d'impressions avec :
- Fichier 3D du modèle
- Paramètres de configuration
- Informations client (chiffrées)
- Référence de commande unique

**Notification automatique à l'imprimeur** :
- **Email immédiat** envoyé à l'administrateur/imprimeur lors de la réception d'une nouvelle demande
- Contenu de l'email :
  - Référence de commande
  - Nom du modèle
  - Matériau et configuration choisis
  - Informations client (nom, email, adresse)
  - Lien direct vers le tableau de bord pour traiter la commande
  - Date et heure de la demande

### 2.6 Gestion des Commandes (Utilisateur)

#### 2.6.1 Suivi des Commandes
- **Statuts de commande** :
  - En attente de validation
  - En cours de préparation
  - En impression
  - Post-traitement
  - Prêt à l'expédition
  - Expédié
  - Livré

- **Notifications** :
  - Email à chaque changement de statut
  - Notifications push (mobile)
  - Estimation de livraison mise à jour

#### 2.6.2 Historique
- Liste de toutes les commandes passées
- Possibilité de re-commander un modèle
- Téléchargement des factures
- Évaluation et commentaires post-livraison

### 2.7 Tableau de Bord Administrateur

#### 2.7.1 Gestion des Commandes
- Liste de toutes les commandes en temps réel
- **Réception d'emails de notification** pour chaque nouvelle commande
- Filtres par statut, date, client
- Actions :
  - Accepter/Refuser une commande
  - Modifier le statut
  - Ajouter des notes internes
  - Contacter le client

#### 2.7.2 Gestion des Modèles
- Ajout/Suppression de modèles dans la base
- Modération des uploads utilisateurs (fonctionnalité future)
- Statistiques de popularité
- Gestion des catégories et tags

#### 2.7.3 Gestion des Matériaux
**L'administrateur peut gérer les matériaux disponibles pour l'impression** :
- **Liste des matériaux** :
  - Vue d'ensemble de tous les matériaux configurés
  - Informations : nom, type (PLA, ABS, PETG, résine, etc.), couleurs disponibles, prix/gramme
  - Statut (actif/inactif)
  - Stock disponible
- **Ajout de matériaux** :
  - Nom du matériau
  - Type et propriétés techniques
  - Couleurs disponibles (sélection multiple)
  - Prix au gramme ou au cm³
  - Température d'impression recommandée
  - Description et cas d'usage
  - Photo/icône du matériau
- **Modification de matériaux** :
  - Mise à jour des prix
  - Ajout/suppression de couleurs
  - Modification des propriétés
  - Désactivation temporaire si rupture de stock
- **Suppression de matériaux** :
  - Vérification des commandes en cours utilisant ce matériau
  - Archivage plutôt que suppression définitive

#### 2.7.4 Gestion des Sources de Modèles 3D
**L'administrateur peut configurer les sites web interrogés pour récupérer les modèles** :
- **Liste des sources actives** :
  - Vue d'ensemble des sites configurés (Thingiverse, MyMiniFactory, Cults3D, etc.)
  - Statut (actif/inactif/erreur)
  - Nombre de modèles indexés par source
  - Dernière synchronisation
  - Performance (temps de réponse moyen)
- **Ajout de sources** :
  - URL du site ou API
  - Nom et description
  - Type d'accès (API, scraping avec respect du robots.txt)
  - Clé API si nécessaire
  - Fréquence de synchronisation
  - Filtres (catégories à inclure/exclure)
  - Priorité dans les résultats de recherche
- **Configuration des sources** :
  - Activation/désactivation temporaire
  - Modification de la fréquence de sync
  - Ajustement des filtres
  - Configuration du rate limiting
  - Gestion des quotas API
- **Monitoring des sources** :
  - Logs de synchronisation
  - Erreurs et alertes
  - Statistiques d'utilisation
  - Qualité des résultats (retours utilisateurs)
- **Sécurité et conformité** :
  - Respect des conditions d'utilisation de chaque site
  - Vérification des licences des modèles
  - Attribution correcte des sources
  - Respect du RGPD et des droits d'auteur

#### 2.7.6 Gestion des Utilisateurs
- Liste des utilisateurs inscrits
- Modération (bannissement, suspension)
- Gestion des rôles (utilisateur, administrateur)
- Statistiques d'utilisation

#### 2.7.7 Statistiques et Rapports
- Nombre de recherches par jour/mois
- Modèles les plus demandés
- Chiffre d'affaires
- Taux de conversion
- Temps moyen d'impression

### 2.8 Profil Utilisateur

- Informations personnelles modifiables
- Adresse(s) de livraison
- Moyens de paiement enregistrés
- Préférences de notification
- Historique de recherche
- Modèles favoris
- Paramètres de confidentialité

## 3. Spécifications Techniques

### 3.1 Architecture Globale

#### 3.1.0 Politique de Dépendances et Ressources

**Packages et Librairies** :
- **Tous les packages utilisés doivent être open-source et activement maintenus**
- Critères de sélection :
  - Licence permissive (MIT, Apache 2.0, BSD)
  - Maintenance active (commits récents, issues résolues)
  - Communauté active et documentation complète
  - Support de .NET 10
  - Audit de sécurité régulier (pas de vulnérabilités connues)
- Exemples de packages approuvés :
  - **Frontend** : MudBlazor (MIT), Tailwind CSS (MIT)
  - **Backend** : Serilog (Apache 2.0), FluentValidation (Apache 2.0)
  - **Images** : ImageSharp (Apache 2.0), SkiaSharp (MIT)
  - **Tests** : xUnit (Apache 2.0), Moq (BSD)
  - **Base de données** : Entity Framework Core (MIT), Npgsql (PostgreSQL License)

**Images et Ressources Visuelles** :
- **Toutes les images utilisées doivent être libres de droits**
- Sources autorisées :
  - Unsplash (licence Unsplash - usage commercial autorisé)
  - Pexels (licence Pexels - usage commercial autorisé)
  - Pixabay (licence Pixabay - usage commercial autorisé)
  - Icons8 (gratuit avec attribution ou licence payante)
  - FontAwesome Free (licence CC BY 4.0 pour icons)
  - Illustrations générées par IA (MidJourney, DALL-E avec licence commerciale)
- **Attribution requise** selon la licence utilisée
- Pas d'images issues de sites payants sans licence appropriée
- Vérification systématique de la licence avant utilisation

#### 3.1.1 Application Web
- **Framework** : Blazor Server ou Blazor WebAssembly (.NET 10)
- **Langage** : C# 12
- **Interface utilisateur** : Blazor Components + Tailwind CSS ou MudBlazor
- **Authentification** : ASP.NET Core Identity + JWT
- **API** : ASP.NET Core Web API (.NET 10)

#### 3.1.2 Application Mobile
- **Framework** : .NET MAUI (.NET 10)
- **Plateformes cibles** :
  - Android 7.0+ (API 24+)
  - iOS 13+
- **Interface utilisateur** : XAML + MAUI Community Toolkit
- **Authentification** : Même système JWT que l'application web
- **Fonctionnalités natives** :
  - Caméra pour recherche par photo
  - Galerie photo
  - Notifications push
  - Géolocalisation (pour livraison)

### 3.2 Backend et Infrastructure

#### 3.2.1 API REST
- **Architecture** : RESTful API avec ASP.NET Core 10
- **Documentation** : Swagger/OpenAPI
- **Versioning** : API versionnée (v1, v2...)
- **Format d'échange** : JSON
- **Authentification** : Bearer Token (JWT)
- **Rate Limiting** : Protection contre les abus

#### 3.2.2 Base de Données
- **SGBD Principal** : PostgreSQL 16+ ou SQL Server 2022
- **ORM** : Entity Framework Core 10
- **Schéma de données** :
  - Tables : Users, Models, Orders, Categories, Materials, ModelSources, Reviews
  - Relations : One-to-Many, Many-to-Many avec tables de jointure
  - Index optimisés pour les requêtes de recherche
- **Optimisation pour millions de modèles** :
  - **La base de données doit gérer efficacement plusieurs millions de résultats avec latence et temps de réponse minimaux**
  - Indexation avancée (B-tree, GIN pour recherche full-text PostgreSQL)
  - Index composites pour tri par popularité (rating + downloads)
  - Index partiels pour filtres courants (is_active = true)
  - Pagination cursor-based (éviter OFFSET sur grandes tables)
  - Partitionnement des tables si >10M records (par année/catégorie)
  - Mise en cache Redis pour requêtes fréquentes
  - Elasticsearch/Azure Search pour recherche ultra-rapide (<20ms)
  - Projections SELECT pour éviter surcharge mémoire
  - Monitoring des requêtes lentes (>50ms)
  - **Métriques de performance attendues** :
    - Recherche simple (nom exact) : <50ms pour 10M+ modèles
    - Recherche textuelle (pg_trgm) : <100ms pour 10M+ modèles
    - Recherche Elasticsearch : <20ms pour 100M+ documents
    - Pagination : temps constant O(1) indépendant du numéro de page

#### 3.2.3 Stockage de Fichiers
- **Fichiers 3D** : Azure Blob Storage ou AWS S3
- **Images** : CDN pour les miniatures et aperçus
- **Format de stockage** :
  - Modèles 3D : STL, OBJ, 3MF (compressés)
  - Images : WebP pour optimisation, fallback JPG/PNG

#### 3.2.4 Moteur de Recherche
- **Recherche textuelle** : 
  - Elasticsearch ou Azure Cognitive Search
  - Full-text search avec scoring
  - Filtres et facettes
  - Suggestions et auto-complétion

- **Recherche par image** :
  - Azure Computer Vision ou Google Cloud Vision API
  - Modèle ML personnalisé (TensorFlow/PyTorch) si budget permet
  - Extraction de features visuelles
  - Comparaison par similarité

#### 3.2.5 Analyse de Modèles 3D
**Phase 1** (Analyse de base) :
- **Paramètres analysés** :
  - Volume imprimable et dimensions
  - Calcul du volume de matière nécessaire
  - Estimation du temps d'impression
  - Vérification compatibilité avec volume d'impression

**Phase 3** (Analyse structurelle avancée et gestion des buses - développement futur) :
- **Librairies** :
  - OpenCascade ou CGAL pour analyse géométrique
  - Slic3r API ou PrusaSlicer pour simulation de slicing
- **Paramètres analysés** :
  - Zones non supportées (overhangs)
  - Épaisseur des parois
  - Détection des surfaces critiques
  - Stabilité structurelle
  - Calcul automatique des supports nécessaires
- **Gestion des buses d'impression** :
  - CRUD complet pour différentes buses (0.2mm, 0.4mm, 0.6mm, 0.8mm, 1.0mm)
  - Sélection de buse par l'utilisateur en fonction de la qualité souhaitée
  - Calcul de la durée d'impression et consommation de plastique selon la buse choisie
  - Configuration des paramètres avancés (hauteur de couche, vitesse, matériaux abrasifs)
  - Impact de la buse sur la qualité finale et le temps d'impression

> **Note** : L'analyse structurelle complète et la gestion des buses seront implémentées après la mise en production de la Phase 1, permettant de se concentrer initialement sur les fonctionnalités essentielles. La Phase 1 utilise une buse fixe de 0.4mm pour toutes les impressions.

### 3.3 Sécurité

#### 3.3.1 Authentification et Autorisation
- **HTTPS obligatoire** :
  - **Toutes les communications doivent utiliser HTTPS (TLS 1.3)**
  - Redirection automatique HTTP vers HTTPS
  - Certificat SSL/TLS valide et à jour
  - HSTS (HTTP Strict Transport Security) activé
- **Hashage des mots de passe** : bcrypt ou Argon2id
- **Tokens JWT** :
  - Expiration : 1 heure (access token)
  - Refresh token : 30 jours
  - Stockage sécurisé (HttpOnly cookies pour web, Secure Storage pour mobile)
- **Rôles et permissions** :
  - User (utilisateur standard)
  - Admin (administrateur/imprimeur)
  - Super Admin (gestion complète)

#### 3.3.2 Protection des Données
- **Chiffrement** :
  - **Données en transit : HTTPS/TLS 1.3 obligatoire pour toutes les requêtes**
  - Données au repos : AES-256
  - Noms d'utilisateurs : chiffrement avec clé secrète côté serveur
- **RGPD** :
  - Consentement explicite
  - Droit à l'oubli implémenté
  - Logs d'accès et de modifications
  - Durée de conservation limitée
- **Sécurité des logs** :
  - **Les credentials (mots de passe, tokens, clés API) ne doivent JAMAIS apparaître dans les logs**
  - Filtrage automatique des données sensibles avant logging
  - Masquage des informations personnelles (emails partiels, ex: u***@example.com)
  - Logs des échecs d'authentification sans détails sensibles
  - Rotation et archivage sécurisé des logs

#### 3.3.3 Validation et Sanitisation
- **Validation des entrées** :
  - FluentValidation pour règles métier
  - DataAnnotations pour modèles
  - Whitelist pour upload de fichiers
- **Protection contre les attaques** :
  - SQL Injection : Parameterized queries (EF Core)
  - XSS : Encodage automatique (Blazor)
  - CSRF : Anti-forgery tokens
  - DDoS : Rate limiting et throttling

#### 3.3.4 Upload de Fichiers Sécurisé
- **Validation** :
  - Vérification du type MIME
  - Scan antivirus des fichiers uploadés
  - Taille maximale : 50 MB pour modèles 3D, 10 MB pour images (avant compression)
  - Formats autorisés uniquement
- **Compression automatique des images** :
  - Compression côté serveur immédiatement après upload
  - Librairie recommandée : ImageSharp ou SkiaSharp
  - Conversion en WebP pour stockage optimal (avec fallback JPG)
  - Génération de multiples résolutions (thumbnails, preview, full)
  - Conservation EXIF minimale (sans données GPS sensibles)
- **Isolation** :
  - Stockage séparé du serveur web
  - Noms de fichiers aléatoires (GUID)
  - Pas d'exécution de code depuis uploads

### 3.4 Performance et Scalabilité

#### 3.4.1 Optimisations
- **Caching** :
  - Redis pour cache distribué
  - Cache des résultats de recherche fréquents
  - Cache des images et miniatures (CDN)
- **Pagination** :
  - Résultats limités par page (20-50 items)
  - Lazy loading des images
  - Infinite scroll sur mobile

#### 3.4.2 Infrastructure
- **Hébergement** :
  - Cloud : Azure App Service ou AWS Elastic Beanstalk
  - Base de données : Azure SQL Database ou AWS RDS
  - CDN : Azure CDN ou CloudFront
- **Monitoring** :
  - Application Insights ou AWS CloudWatch
  - Logs centralisés (Serilog + Seq ou ELK Stack)
  - Alertes sur erreurs critiques

### 3.5 Compatibilité et Responsive Design

#### 3.5.1 Application Web
- **Navigateurs supportés** :
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+
- **Responsive** :
  - Mobile-first design
  - Breakpoints : 320px, 768px, 1024px, 1440px
  - Interface adaptée tactile et souris

#### 3.5.2 Application Mobile
- **Android** :
  - Version minimum : Android 7.0 (API 24)
  - Target : Android 14 (API 34)
- **iOS** :
  - Version minimum : iOS 13
  - Target : iOS 17

## 4. Exigences Non Fonctionnelles

### 4.1 Performance
- Temps de chargement initial : < 2 secondes
- Temps de recherche textuelle : < 500ms
- Temps de recherche par image : < 3 secondes
- Temps d'analyse de modèle 3D : < 10 secondes

### 4.2 Disponibilité
- Uptime : 99.9% (SLA)
- Maintenance planifiée : horaires de faible trafic
- Backup quotidien de la base de données
- Plan de reprise d'activité (DRP)

### 4.3 Scalabilité
- Support de 1000 utilisateurs simultanés (phase 1)
- Architecture évolutive pour 10000+ utilisateurs
- Auto-scaling selon la charge
- Load balancing multi-instances

### 4.4 Accessibilité
- Conformité WCAG 2.1 niveau AA
- Support des lecteurs d'écran
- Navigation au clavier
- Contrastes de couleurs adaptés
- Taille de texte ajustable

### 4.5 Maintenabilité et Qualité du Code

#### 4.5.1 Approche Test-Driven Development (TDD)
**Le projet suit une approche TDD** : les tests sont écrits tout au long du développement, pas seulement à la fin.

- **Cycle TDD** :
  1. **Red** : Écrire un test qui échoue
  2. **Green** : Écrire le code minimal pour faire passer le test
  3. **Refactor** : Améliorer le code tout en gardant les tests verts

- **Tests unitaires** :
  - Couverture minimale : 70%
  - Objectif : 80%+
  - Écrits avant ou en parallèle du code de production
  - Outils : xUnit, NUnit ou MSTest pour .NET
  - Mocking : Moq ou NSubstitute
  - Tests rapides (< 100ms par test)

- **Tests d'intégration** :
  - Tests des interactions entre composants
  - Tests des API endpoints
  - Tests de la base de données (avec DB en mémoire ou conteneur)
  - Tests des services externes (avec mocks ou stubs)

- **Tests end-to-end** :
  - Tests de scénarios utilisateur complets
  - Outils : Playwright ou Selenium pour Blazor
  - Tests critiques du parcours utilisateur

#### 4.5.2 Qualité et Documentation
- Code commenté et documenté (XML comments pour API publiques)
- Revues de code systématiques
- Analyse statique du code (Roslyn analyzers, SonarQube)
- CI/CD avec GitHub Actions ou Azure DevOps
- Déploiement automatisé
- Pipeline CI incluant :
  - Compilation
  - Exécution de tous les tests
  - Analyse de couverture de code
  - Analyse de sécurité (SAST)
  - Validation avant merge

#### 4.5.3 Standards de Qualité du Code

**Le code doit respecter les standards de qualité suivants** :

##### 4.5.3.1 Conventions de Codage

**Standards C# / .NET** :
- Suivre les [conventions de codage Microsoft C#](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Utiliser les [conventions de nommage .NET](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines)
- Respecter les principes SOLID
- Appliquer les patterns de conception appropriés

**Règles de nommage** :
- **Classes** : PascalCase (ex: `UserService`, `OrderController`)
- **Interfaces** : I + PascalCase (ex: `IEmailService`, `IRepository`)
- **Méthodes** : PascalCase (ex: `GetUserById`, `ProcessOrder`)
- **Variables locales** : camelCase (ex: `userId`, `orderTotal`)
- **Constantes** : PascalCase (ex: `MaxFileSize`, `DefaultTimeout`)
- **Champs privés** : _camelCase (ex: `_logger`, `_dbContext`)

**Organisation du code** :
- Maximum 300 lignes par fichier
- Maximum 50 lignes par méthode
- Maximum 5 paramètres par méthode
- Complexité cyclomatique < 10
- Pas de code dupliqué (DRY principle)

##### 4.5.3.2 Documentation du Code

**Commentaires XML obligatoires** pour :
```csharp
/// <summary>
/// Crée une nouvelle commande d'impression 3D.
/// </summary>
/// <param name="request">Les détails de la commande à créer</param>
/// <returns>La commande créée avec son identifiant unique</returns>
/// <exception cref="ValidationException">Si les données de la commande sont invalides</exception>
/// <exception cref="NotFoundException">Si le modèle 3D n'existe pas</exception>
public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
{
    // Implémentation
}
```

**Commentaires dans le code** :
- Expliquer le "pourquoi", pas le "quoi"
- Documenter les algorithmes complexes
- Expliquer les décisions techniques importantes
- Marquer les TODOs avec date et responsable

##### 4.5.3.3 Analyse Statique du Code

**Outils obligatoires** :
- **StyleCop Analyzers** : Vérification des conventions de style
- **Roslyn Analyzers** : Analyse de code .NET
- **SonarQube / SonarCloud** : Analyse de qualité et sécurité
- **Code Coverage** : Couverture de tests (minimum 70%)

**Configuration .editorconfig** :
```ini
# Conventions de codage C#
[*.cs]
indent_style = space
indent_size = 4
trim_trailing_whitespace = true

# Règles de nommage
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.severity = warning
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.symbols = interface
dotnet_naming_rule.interfaces_should_be_prefixed_with_i.style = begins_with_i

# Règles de style
csharp_prefer_braces = true:warning
csharp_prefer_simple_using_statement = true:suggestion
dotnet_sort_system_directives_first = true
```

##### 4.5.3.4 Métriques de Qualité

**Seuils minimums requis** :
- **Couverture de code** : ≥ 70% (objectif 80%+)
- **Complexité cyclomatique** : < 10 par méthode
- **Maintenabilité** : Indice ≥ 70 (sur 100)
- **Duplication** : < 3% du code
- **Bugs critiques** : 0
- **Vulnérabilités** : 0
- **Code smells majeurs** : < 5

**Évaluation SonarQube** :
- Note globale : A ou B minimum
- Fiabilité : A minimum
- Sécurité : A minimum
- Maintenabilité : A ou B minimum
- Couverture : ≥ 70%
- Duplications : < 3%

##### 4.5.3.5 Revues de Code

**Processus de revue obligatoire** :
- Toute Pull Request doit être revue par au moins un autre développeur (auto-revue pour solo dev)
- Checklist de revue :
  - ✅ Le code respecte les conventions de nommage
  - ✅ Les tests sont présents et passent
  - ✅ Pas de code commenté laissé inutilement
  - ✅ Pas de secrets ou credentials en dur
  - ✅ Documentation XML présente
  - ✅ Gestion d'erreurs appropriée
  - ✅ Performance acceptable
  - ✅ Pas de code dupliqué
  - ✅ Principes SOLID respectés

**Critères de validation** :
- Tous les tests passent (unitaires, intégration, e2e)
- Couverture de code maintenue ou améliorée
- Pas de nouvelles violations de qualité
- Documentation à jour
- CHANGELOG.md mis à jour si nécessaire

##### 4.5.3.6 Gestion des Dépendances

**Vérification des packages** :
- Audit de sécurité automatique (`dotnet list package --vulnerable`)
- Mise à jour régulière des packages (avec tests de non-régression)
- Suppression des packages inutilisés
- Vérification des licences (uniquement MIT, Apache 2.0, BSD)

##### 4.5.3.7 Refactoring Continu

**Pratiques de refactoring** :
- Refactoring régulier du code legacy
- Élimination de la dette technique
- Amélioration continue de la qualité
- Application des principes Clean Code
- Simplification des structures complexes

##### 4.5.3.8 Performance et Optimisation

**Bonnes pratiques** :
- Profiling régulier du code
- Optimisation des requêtes base de données
- Utilisation appropriée du cache
- Async/await correctement utilisé
- Pas de blocking calls dans le code async
- Memory leaks détectés et corrigés

### 4.6 Expérience Utilisateur (UX)

#### 4.6.1 Messages d'Erreur
Les messages d'erreur doivent être **suffisamment explicites** pour guider l'utilisateur :

- **Messages clairs et actionnables** :
  - ❌ Mauvais : "Erreur 500"
  - ✅ Bon : "Impossible de traiter votre demande. Veuillez réessayer dans quelques instants."
  
  - ❌ Mauvais : "Validation failed"
  - ✅ Bon : "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."

- **Catégories de messages** :
  - **Erreurs de validation** : Indiquer précisément quel champ est incorrect et pourquoi
    - Ex: "L'adresse email n'est pas valide. Veuillez vérifier le format (exemple@domaine.com)"
  
  - **Erreurs d'authentification** : 
    - Ex: "Email ou mot de passe incorrect. Veuillez vérifier vos identifiants."
    - Lien vers récupération de mot de passe si applicable
  
  - **Erreurs de fichier** :
    - Ex: "Le fichier est trop volumineux (15 MB). La taille maximale autorisée est de 10 MB."
    - Ex: "Format de fichier non supporté. Formats acceptés : JPG, PNG, HEIC"
  
  - **Erreurs serveur** :
    - Ex: "Une erreur temporaire s'est produite. Notre équipe a été notifiée. Veuillez réessayer."
    - Référence d'erreur pour support : "Réf: ERR-2024-XXXXX"
  
  - **Erreurs de connexion** :
    - Ex: "Impossible de se connecter au serveur. Vérifiez votre connexion internet."

- **Bonnes pratiques** :
  - Éviter le jargon technique pour l'utilisateur final
  - Proposer une solution ou action corrective
  - Utiliser un ton empathique et non accusateur
  - Logger les détails techniques en backend (sans exposer de données sensibles)
  - Afficher une icône appropriée (⚠️ avertissement, ❌ erreur, ℹ️ information)

## 5. Workflow Utilisateur Complet

### 5.1 Parcours Utilisateur Type

1. **Inscription/Connexion**
   - L'utilisateur créé un compte avec nom d'utilisateur sécurisé
   - Vérification par email
   - Connexion sécurisée avec JWT

2. **Recherche de Modèle**
   - Option A : Saisie de texte (ex: "vase moderne")
   - Option B : Upload d'une photo de l'objet désiré
   - Application des filtres si nécessaire

3. **Exploration des Résultats**
   - Parcours de la galerie de modèles
   - Tri et filtrage
   - Sélection d'un modèle pour voir les détails

4. **Visualisation et Analyse**
   - Vue 3D interactive du modèle
   - Lecture des informations (dimensions, complexité)
   - Lancement de l'analyse de printabilité

5. **Rapport d'Analyse**
   - Consultation du rapport automatique
   - Vérification de la compatibilité (✅ Imprimable)
   - Révision des recommandations de matériaux et paramètres

6. **Configuration de l'Impression**
   - Sélection du matériau (PLA, ABS, PETG...)
   - Choix de la couleur
   - Réglage de la qualité d'impression
   - Options additionnelles (remplissage, post-traitement)

7. **Validation et Commande**
   - Vérification du récapitulatif
   - Acceptation du prix et du délai
   - Fourniture de l'adresse de livraison
   - Validation finale de la commande

8. **Transmission au Service d'Impression**
   - Envoi automatique des données au gestionnaire
   - Fichier 3D + paramètres + infos client
   - Notification de réception

9. **Suivi de Commande**
   - Réception de notifications à chaque étape
   - Consultation du statut en temps réel
   - Communication avec le service si nécessaire

10. **Réception et Évaluation**
    - Livraison du produit imprimé
    - Confirmation de réception
    - Évaluation et avis (optionnel)

## 6. Livrables Attendus

### 6.1 Applications - Phase 1 (Prioritaire)
- ✅ Application web Blazor (.NET 10) fonctionnelle avec connexion HTTPS
- ✅ API REST documentée avec authentification sécurisée
- ✅ Tableau de bord administrateur avec notifications email
- ✅ Système de notification email pour l'imprimeur

### 6.1.2 Applications - Phase 2 (Ultérieure)
- ⏳ Application mobile MAUI (Android & iOS) - Développement après Phase 1

### 6.2 Documentation
- ✅ Documentation utilisateur (guide d'utilisation)
- ✅ Documentation technique (architecture, API)
- ✅ Guide d'installation et de déploiement
- ✅ Procédures de maintenance

### 6.3 Tests
- ✅ Tests unitaires (backend) - **Développés en TDD tout au long du projet**
- ✅ Tests d'intégration (API) - **Approche TDD**
- ✅ Tests end-to-end (UI)
- ✅ Couverture de code > 70% (objectif 80%+)
- ✅ Rapports de tests automatisés
- ✅ Tests exécutés à chaque commit (CI/CD)

### 6.4 Sécurité
- ✅ Audit de sécurité
- ✅ Tests de pénétration
- ✅ Rapport de conformité RGPD

## 7. Planning et Jalons

**Note importante** : Les durées indiquées sont en **semaines de travail effectives**. 
Le développeur travaillant **en temps partiel** (~50% du temps), les durées calendaires réelles seront approximativement **doublées**.

### Phase 1 : Conception et Préparation
- **Durée** : 4 semaines effectives (≈ 8-10 semaines calendaires)
- Finalisation du cahier des charges
- Design UI/UX (maquettes) avec images libres de droits
- Architecture technique détaillée
- Sélection des packages open-source maintenus
- Configuration de l'environnement de développement

### Phase 2 : Développement Backend
- **Durée** : 8 semaines effectives (≈ 16-20 semaines calendaires)
- API REST avec authentification HTTPS/TLS 1.3
- Gestion des utilisateurs (sécurité des noms)
- Moteur de recherche textuelle
- Intégration recherche par image (IA)
- Compression automatique des images
- Analyse de modèles 3D
- Gestion des commandes
- **Système de notification email pour l'imprimeur**
- Tests unitaires en TDD tout au long du développement

### Phase 3 : Développement Frontend Web
- **Durée** : 6 semaines effectives (≈ 12-15 semaines calendaires)
- Application Blazor (.NET 10) avec packages open-source (MudBlazor/Tailwind CSS)
- Pages d'authentification (connexion HTTPS)
- Interface de recherche (texte + photo)
- Affichage avec images libres de droits (Unsplash, Pexels)
- Workflow de commande
- Tableau de bord utilisateur
- Panneau administrateur
- Tests end-to-end

### Phase 4 : Tests et Optimisations
- **Durée** : 4 semaines effectives (≈ 8-10 semaines calendaires)
- Tests unitaires et d'intégration (complétion de la couverture)
- Tests de charge et performance
- Tests de sécurité (HTTPS, authentification, logs)
- Corrections de bugs
- Optimisations
- Vérification licences des packages

### Phase 5 : Déploiement et Lancement
- **Durée** : 2 semaines effectives (≈ 4-5 semaines calendaires)
- Déploiement en production avec HTTPS
- Configuration CDN et monitoring
- Configuration des emails de notification
- Lancement beta
- Collecte de feedback

**Durée totale Phase 1-5** : 
- **24 semaines effectives** de travail
- **48-60 semaines calendaires** (environ 12-15 mois) en temps partiel

### Phase 6 : Développement Mobile (6 semaines) - **Phase ultérieure**
**Cette phase sera développée après la mise en production de l'application web**
- Application .NET MAUI
- Interface native Android/iOS
- Intégration caméra et galerie
- Synchronisation avec le backend
- Notifications push
- Tests sur différents appareils

## 8. Budget Prévisionnel

### 8.1 Ressources Humaines
**Développement Solo avec Temps Partiel** :

Le développeur travaillera **en temps partiel** sur ce projet, alternant avec d'autres responsabilités.

- **Estimation à temps plein** : 24 semaines (Phase 1-5)
  - Backend API (.NET 10) : 8 semaines
  - Frontend Blazor : 6 semaines
  - Conception et design : 4 semaines
  - Tests et déploiement : 6 semaines

- **Estimation réaliste (temps partiel ~50%)** : **48-60 semaines (environ 12-15 mois)**
  - Variations selon disponibilité du développeur
  - Buffer pour périodes de charge de travail élevée
  - Flexibilité nécessaire dans le planning

**Phase Mobile ultérieure** :
- Développeur Mobile MAUI : 6 semaines temps plein (12-15 semaines temps partiel)

**Note importante** : Le calendrier est flexible et s'adapte à la disponibilité du développeur. Il est recommandé de travailler par sprints courts (1-2 semaines) pour maintenir la progression régulière même en temps partiel.

### 8.2 Infrastructure (mensuel)
- Hébergement Cloud (Azure/AWS) : 200-500€
- Base de données managée : 100-300€
- CDN et stockage : 50-150€
- Services IA (Vision API) : 50-200€
- Certificats SSL et domaine : 20-50€
- **Total mensuel estimé** : 420-1200€

### 8.3 Outils et Licences
- Visual Studio Community (gratuit) ou Professional : 0-599€/an
- Compte développeur Apple (Phase Mobile) : 99€/an
- Compte développeur Google (Phase Mobile) : 25€ (unique)
- Outils de design (Figma gratuit ou Pro) : 0-144€/an
- Monitoring (Application Insights) : inclus Azure

## 9. Risques et Mitigation

### 9.1 Risques Techniques
| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Complexité de l'analyse 3D | Élevé | Moyen | POC précoce, librairies éprouvées |
| Performance de la recherche par image | Élevé | Moyen | Utiliser API cloud robuste |
| Compatibilité MAUI cross-platform | Moyen | Faible | Tests continus sur tous devices |
| Scalabilité backend | Élevé | Faible | Architecture cloud-native, auto-scaling |

### 9.2 Risques Sécurité
| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Fuite de données utilisateurs | Critique | Faible | Chiffrement, audits réguliers |
| Attaques DDoS | Élevé | Moyen | WAF, rate limiting, CDN |
| Upload de fichiers malveillants | Élevé | Moyen | Scan antivirus, validation stricte |
| Vol de tokens JWT | Élevé | Faible | HTTPS, expiration courte, refresh token |

### 9.3 Risques Projet
| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| Dépassement des délais | Moyen | Moyen | Planning avec marge, sprints agiles |
| Dépassement du budget | Moyen | Moyen | Suivi budgétaire hebdomadaire |
| Turnover équipe | Élevé | Faible | Documentation continue, pair programming |

## 10. Critères d'Acceptation

### 10.1 Fonctionnels - Phase 1 (Application Web)
- ✅ Inscription et connexion sécurisées avec **HTTPS obligatoire**
- ✅ Noms d'utilisateurs chiffrés en base de données
- ✅ **Affichage de l'auteur/créateur sur chaque modèle 3D**
- ✅ Recherche textuelle avec résultats pertinents (< 500ms)
- ✅ Recherche par photo opérationnelle (< 3s)
- ✅ **Base de données optimisée pour millions de modèles** (<50ms recherche, <100ms full-text)
- ✅ Visualisation de modèles avec images statiques multiples (Version 1)
- ⏳ Visualisation 3D interactive (Version 2 - développement ultérieur)
- ✅ **Compression automatique des images uploadées** (WebP + JPG fallback)
- ✅ Analyse de printabilité automatique de base (< 10s) - dimensions, matériaux, coûts
- ⏳ Analyse structurelle avancée (Phase 3 - développement ultérieur)
- ✅ Workflow de commande complet
- ✅ **Buse d'impression fixe à 0.4mm pour Phase 1** (gestion des buses → Phase 3)
- ✅ **Notifications email automatiques à l'imprimeur pour chaque nouvelle commande**
- ✅ Notifications par email aux utilisateurs
- ✅ **Messages d'erreur explicites et actionnables**
- ✅ Tableau de bord admin avec toutes fonctionnalités :
  - Gestion des commandes avec notifications email
  - **Gestion des matériaux** (ajout, modification, suppression, activation/désactivation)
  - **Gestion des sources de modèles 3D** (configuration des sites web interrogés)
  - Monitoring des synchronisations et statistiques des sources
  - Gestion des utilisateurs et rôles
- ✅ Application web Blazor .NET 10 déployée

### 10.1.2 Fonctionnels - Phase 2 (Application Mobile)
- ⏳ Application mobile MAUI (Android + iOS) publiée
- ⏳ Notifications push mobiles

### 10.2 Non Fonctionnels
- ✅ Temps de chargement < 2s
- ✅ Support de 1000 utilisateurs simultanés
- ✅ Uptime 99.9%
- ✅ Conformité RGPD complète
- ✅ Accessibilité WCAG 2.1 AA
- ✅ **Approche TDD : Tests écrits tout au long du développement**
- ✅ Couverture de tests > 70% (objectif 80%+)
- ✅ **Tous les packages utilisés sont open-source et maintenus activement**
- ✅ **Toutes les images sont libres de droits** (Unsplash, Pexels, Pixabay)
- ✅ **Code respectant les standards de qualité** :
  - Conventions de codage Microsoft C# / .NET
  - Complexité cyclomatique < 10
  - Pas de duplication de code (< 3%)
  - Documentation XML pour toutes les API publiques
- ✅ **Analyse statique du code** (StyleCop, Roslyn, SonarQube)
- ✅ **Métriques de qualité SonarQube** : Note A ou B minimum
- ✅ Documentation complète livrée
- ✅ Planning adapté au développement en temps partiel

### 10.4 Qualité du Code
- ✅ **Conventions de nommage respectées** (PascalCase, camelCase, _camelCase)
- ✅ **StyleCop Analyzers activé** : 0 violation
- ✅ **SonarQube Quality Gate passé** :
  - Fiabilité : A
  - Sécurité : A  
  - Maintenabilité : A ou B
  - Couverture : ≥ 70%
  - Duplication : < 3%
- ✅ **Revues de code systématiques** avec checklist validée
- ✅ **Pas de vulnérabilités** dans les dépendances
- ✅ **Configuration .editorconfig** appliquée
- ✅ **Refactoring continu** de la dette technique

### 10.3 Sécurité
- ✅ **Connexion HTTPS/TLS 1.3 obligatoire pour toutes les communications**
- ✅ **Aucun credential (mot de passe, token, clé API) dans les logs**
- ✅ Audit de sécurité passé sans faille critique
- ✅ Tests de pénétration validés
- ✅ Certificat SSL/TLS valide installé
- ✅ Redirection automatique HTTP vers HTTPS
- ✅ HSTS activé
- ✅ Mots de passe hashés avec Argon2/bcrypt
- ✅ Tokens JWT avec expiration
- ✅ Rate limiting configuré
- ✅ Scan antivirus sur uploads
- ✅ Filtrage automatique des données sensibles dans les logs

## 11. Maintenance et Évolutions Futures

### 11.1 Maintenance Corrective
- Corrections de bugs prioritaires : < 24h
- Corrections de bugs mineurs : < 1 semaine
- Mise à jour de sécurité : < 48h

### 11.2 Maintenance Évolutive
- Mise à jour .NET (versions mineures) : trimestrielle
- Mise à jour .NET (versions majeures) : annuelle
- Nouvelles fonctionnalités : planning trimestriel

### 11.3 Évolutions Futures Envisagées
- **Phase 2** :
  - Upload de modèles 3D par les utilisateurs
  - Marketplace de modèles (créateurs tiers)
  - Communauté (partage, likes, commentaires)
  - Configurateur 3D avancé (personnalisation de modèles)
  
- **Phase 3** :
  - **Analyse structurelle avancée des modèles 3D** (overhangs, supports, stabilité)
  - **Gestion complète des buses d'impression** avec sélection par l'utilisateur
  - Calcul précis durée/coût selon buse choisie (impact sur consommation plastique)
  - Intelligence artificielle pour recommandations personnalisées
  - AR (Réalité Augmentée) pour visualiser le modèle chez soi
  - Abonnement mensuel (impressions illimitées)
  - Programme de fidélité
  - Multi-langues (EN, ES, DE)

## 12. Conclusion

Ce cahier des charges définit l'ensemble des spécifications pour la réalisation de la plateforme Print3D Finder. Le projet combine :
- Une application web moderne avec **Blazor .NET 10**
- Une application mobile native avec **.NET MAUI**
- Un système de recherche avancé (texte + image)
- Une sécurité renforcée (chiffrement des noms d'utilisateurs, authentification robuste)
- Un workflow complet de la recherche à l'impression

Le respect de ces spécifications garantira la livraison d'une plateforme fiable, performante, sécurisée et conforme aux exigences RGPD, offrant une expérience utilisateur optimale sur web et mobile.

---

**Document rédigé le** : 17 décembre 2025  
**Version** : 1.0  
**Statut** : Approuvé  
**Prochaine révision** : Avant début Phase 2 (Développement Backend)

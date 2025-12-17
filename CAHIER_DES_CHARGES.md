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
Le projet comprend deux applications complémentaires :
- **Application Web** : Développée avec Blazor .NET 10
- **Application Mobile** : Développée avec .NET MAUI

## 2. Spécifications Fonctionnelles

### 2.1 Authentification et Sécurité des Utilisateurs

#### 2.1.1 Gestion des Comptes Utilisateurs
- **Inscription sécurisée** :
  - Nom d'utilisateur sécurisé (chiffrement et hachage)
  - Adresse email valide et vérifiée
  - Mot de passe robuste avec critères de sécurité (minimum 8 caractères, majuscules, minuscules, chiffres, caractères spéciaux)
  - Confirmation d'email obligatoire
  
- **Connexion sécurisée** :
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
  - Taille maximale : 10 MB
  
- **Reconnaissance visuelle** :
  - Analyse d'image par IA pour identifier l'objet
  - Extraction des caractéristiques visuelles
  - Correspondance avec la base de données de modèles 3D
  - Affichage des résultats par pertinence

### 2.3 Visualisation des Modèles 3D

#### 2.3.1 Galerie de Résultats
- Affichage en grille avec miniatures
- Vue liste alternative
- Pagination ou scroll infini
- Tri par :
  - Pertinence
  - Popularité
  - Note des utilisateurs
  - Date d'ajout
  - Prix d'impression estimé

#### 2.3.2 Page de Détails du Modèle
- **Visualisation 3D interactive** :
  - Rotation 360° du modèle
  - Zoom avant/arrière
  - Visualisation des dimensions
  - Affichage en mode wireframe optionnel

- **Informations du modèle** :
  - Nom et description
  - Créateur / Source
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

- **Analyse structurelle** :
  - Détection des surfaces non supportées
  - Calcul de la stabilité du modèle
  - Identification des zones nécessitant des supports
  - Épaisseur des parois (minimum 1mm recommandé)

- **Estimation des coûts** :
  - Calcul du volume de matière nécessaire
  - Temps d'impression estimé
  - Prix total incluant matériaux, électricité, main d'œuvre

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
- **Qualité d'impression** :
  - Brouillon (0.3mm) - rapide, moins détaillé
  - Standard (0.2mm) - équilibre qualité/temps
  - Haute qualité (0.1mm) - détails fins, plus long
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

#### 2.7.3 Gestion des Utilisateurs
- Liste des utilisateurs inscrits
- Modération (bannissement, suspension)
- Gestion des rôles (utilisateur, administrateur)
- Statistiques d'utilisation

#### 2.7.4 Statistiques et Rapports
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
  - Tables : Users, Models, Orders, Categories, Materials, Reviews
  - Relations : One-to-Many, Many-to-Many avec tables de jointure
  - Index optimisés pour les requêtes de recherche

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
- **Librairies** :
  - OpenCascade ou CGAL pour analyse géométrique
  - Slic3r API ou PrusaSlicer pour simulation de slicing
  - Calcul de volume, surface, bbox
- **Paramètres analysés** :
  - Volume imprimable
  - Zones non supportées
  - Épaisseur des parois
  - Overhangs critiques

### 3.3 Sécurité

#### 3.3.1 Authentification et Autorisation
- **Hashage des mots de passe** : bcrypt ou Argon2id
- **Tokens JWT** :
  - Expiration : 1 heure (access token)
  - Refresh token : 30 jours
  - Stockage sécurisé (HttpOnly cookies pour web, Secure Storage pour mobile)
- **Rôles et permissions** :
  - User (utilisateur standard)
  - Admin (administrateur)
  - Super Admin (gestion complète)

#### 3.3.2 Protection des Données
- **Chiffrement** :
  - Données en transit : TLS 1.3
  - Données au repos : AES-256
  - Noms d'utilisateurs : chiffrement avec clé secrète côté serveur
- **RGPD** :
  - Consentement explicite
  - Droit à l'oubli implémenté
  - Logs d'accès et de modifications
  - Durée de conservation limitée

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
  - Taille maximale : 50 MB pour modèles 3D, 10 MB pour images
  - Formats autorisés uniquement
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

### 4.5 Maintenabilité
- Code commenté et documenté
- Tests unitaires (couverture > 70%)
- Tests d'intégration
- CI/CD avec GitHub Actions ou Azure DevOps
- Déploiement automatisé

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

### 6.1 Applications
- ✅ Application web Blazor (.NET 10) fonctionnelle
- ✅ Application mobile MAUI (Android & iOS) fonctionnelle
- ✅ API REST documentée
- ✅ Tableau de bord administrateur

### 6.2 Documentation
- ✅ Documentation utilisateur (guide d'utilisation)
- ✅ Documentation technique (architecture, API)
- ✅ Guide d'installation et de déploiement
- ✅ Procédures de maintenance

### 6.3 Tests
- ✅ Tests unitaires (backend)
- ✅ Tests d'intégration (API)
- ✅ Tests end-to-end (UI)
- ✅ Rapports de tests

### 6.4 Sécurité
- ✅ Audit de sécurité
- ✅ Tests de pénétration
- ✅ Rapport de conformité RGPD

## 7. Planning et Jalons

### Phase 1 : Conception et Préparation (4 semaines)
- Finalisation du cahier des charges
- Design UI/UX (maquettes)
- Architecture technique détaillée
- Configuration de l'environnement de développement

### Phase 2 : Développement Backend (8 semaines)
- API REST avec authentification
- Gestion des utilisateurs (sécurité des noms)
- Moteur de recherche textuelle
- Intégration recherche par image (IA)
- Analyse de modèles 3D
- Gestion des commandes

### Phase 3 : Développement Frontend Web (6 semaines)
- Application Blazor (.NET 10)
- Pages d'authentification
- Interface de recherche (texte + photo)
- Visualisation 3D des modèles
- Workflow de commande
- Tableau de bord utilisateur
- Panneau administrateur

### Phase 4 : Développement Mobile (6 semaines)
- Application .NET MAUI
- Interface native Android/iOS
- Intégration caméra et galerie
- Synchronisation avec le backend
- Notifications push
- Tests sur différents appareils

### Phase 5 : Tests et Optimisations (4 semaines)
- Tests unitaires et d'intégration
- Tests de charge et performance
- Tests de sécurité
- Corrections de bugs
- Optimisations

### Phase 6 : Déploiement et Lancement (2 semaines)
- Déploiement en production
- Configuration CDN et monitoring
- Formation des administrateurs
- Lancement beta
- Collecte de feedback

## 8. Budget Prévisionnel

### 8.1 Ressources Humaines
- Chef de projet : 30 semaines
- Développeur Backend .NET : 14 semaines
- Développeur Frontend Blazor : 6 semaines
- Développeur Mobile MAUI : 6 semaines
- UI/UX Designer : 4 semaines
- DevOps/Infrastructure : 4 semaines
- Testeur QA : 4 semaines

### 8.2 Infrastructure (mensuel)
- Hébergement Cloud (Azure/AWS) : 200-500€
- Base de données managée : 100-300€
- CDN et stockage : 50-150€
- Services IA (Vision API) : 50-200€
- Certificats SSL et domaine : 20-50€
- **Total mensuel estimé** : 420-1200€

### 8.3 Outils et Licences
- Visual Studio Professional : 599€/an
- Compte développeur Apple : 99€/an
- Compte développeur Google : 25€ (unique)
- Outils de design (Figma Pro) : 144€/an
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

### 10.1 Fonctionnels
- ✅ Inscription et connexion sécurisées fonctionnelles
- ✅ Noms d'utilisateurs chiffrés en base de données
- ✅ Recherche textuelle avec résultats pertinents (< 500ms)
- ✅ Recherche par photo opérationnelle (< 3s)
- ✅ Visualisation 3D interactive
- ✅ Analyse de printabilité automatique (< 10s)
- ✅ Workflow de commande complet
- ✅ Notifications par email et push
- ✅ Tableau de bord admin avec toutes fonctionnalités
- ✅ Application web Blazor .NET 10 déployée
- ✅ Application mobile MAUI (Android + iOS) publiée

### 10.2 Non Fonctionnels
- ✅ Temps de chargement < 2s
- ✅ Support de 1000 utilisateurs simultanés
- ✅ Uptime 99.9%
- ✅ Conformité RGPD complète
- ✅ Accessibilité WCAG 2.1 AA
- ✅ Couverture de tests > 70%
- ✅ Documentation complète livrée

### 10.3 Sécurité
- ✅ Audit de sécurité passé sans faille critique
- ✅ Tests de pénétration validés
- ✅ Chiffrement TLS 1.3 actif
- ✅ Mots de passe hashés avec Argon2/bcrypt
- ✅ Tokens JWT avec expiration
- ✅ Rate limiting configuré
- ✅ Scan antivirus sur uploads

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

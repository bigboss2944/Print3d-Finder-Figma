# Features et User Stories - Print3D Finder

Ce document détaille toutes les features et user stories pour les fonctionnalités principales de l'application Print3D Finder (hors authentification qui est déjà créée dans Feature #8).

---

## 📋 Structure des Features

### Feature #8 - Authentification et gestion des données utilisateurs ✅
**Statut:** Déjà créée avec US #9-#15

---

## Feature #16 - Recherche de modèles 3D

### Description
Permet aux utilisateurs de rechercher des modèles 3D via une recherche textuelle intelligente ou par upload d'une photo.

### Objectifs
- Faciliter la découverte de modèles 3D
- Offrir une recherche performante même avec des millions de modèles
- Permettre la recherche par image avec IA
- Fournir des filtres avancés pour affiner les résultats

### Hors périmètre (Phase 1)
- Recherche vocale
- Recherche par croquis dessiné
- Recommandations personnalisées par IA

---

### US #16.1 - Recherche textuelle simple

**En tant qu'** utilisateur,  
**Je veux** pouvoir rechercher des modèles 3D par mots-clés,  
**Afin de** trouver rapidement les objets que je souhaite imprimer.

#### ✅ Critères d'acceptation
- [ ] L'utilisateur accède à une barre de recherche visible en haut de la page
- [ ] L'utilisateur peut saisir un ou plusieurs mots-clés
- [ ] La recherche est lancée en appuyant sur Entrée ou en cliquant sur le bouton rechercher
- [ ] Les résultats s'affichent en moins de 500ms
- [ ] Les résultats sont pertinents par rapport aux mots-clés saisis
- [ ] Un message "Aucun résultat trouvé" s'affiche si la recherche ne retourne rien
- [ ] L'utilisateur peut voir le nombre total de résultats trouvés

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #16.2 - Auto-complétion de recherche

**En tant qu'** utilisateur,  
**Je veux** avoir des suggestions pendant que je tape ma recherche,  
**Afin de** trouver plus rapidement et facilement ce que je cherche.

#### ✅ Critères d'acceptation
- [ ] Des suggestions apparaissent dès que l'utilisateur tape 3 caractères
- [ ] Les suggestions sont basées sur les recherches populaires et l'historique
- [ ] Maximum 10 suggestions affichées
- [ ] L'utilisateur peut naviguer dans les suggestions avec les flèches du clavier
- [ ] L'utilisateur peut sélectionner une suggestion en cliquant ou avec Entrée
- [ ] Les suggestions se mettent à jour en temps réel pendant la frappe
- [ ] Les suggestions disparaissent quand l'utilisateur clique ailleurs

**Priorité:** Moyenne  
**Estimation:** 2 points

---

### US #16.3 - Filtres avancés de recherche

**En tant qu'** utilisateur,  
**Je veux** pouvoir filtrer les résultats de recherche,  
**Afin de** trouver précisément le type de modèle que je recherche.

#### ✅ Critères d'acceptation
- [ ] L'utilisateur peut filtrer par catégorie (décoration, gadgets, jouets, art, utilitaire, mode)
- [ ] L'utilisateur peut filtrer par niveau de complexité (simple, moyen, complexe)
- [ ] L'utilisateur peut filtrer par taille du modèle (petit, moyen, grand)
- [ ] L'utilisateur peut filtrer par type de fichier (STL, OBJ, 3MF)
- [ ] L'utilisateur peut filtrer par popularité (nombre de téléchargements, notes)
- [ ] Les filtres peuvent être combinés
- [ ] Le nombre de résultats se met à jour en temps réel lors de l'application des filtres
- [ ] L'utilisateur peut réinitialiser tous les filtres d'un clic
- [ ] Les filtres sélectionnés sont visibles et peuvent être retirés individuellement

**Priorité:** Haute  
**Estimation:** 5 points

---

### US #16.4 - Tri des résultats

**En tant qu'** utilisateur,  
**Je veux** pouvoir trier les résultats de recherche,  
**Afin de** voir en premier les modèles les plus pertinents pour moi.

#### ✅ Critères d'acceptation
- [ ] L'utilisateur peut trier par pertinence (défaut)
- [ ] L'utilisateur peut trier par popularité (nombre de téléchargements)
- [ ] L'utilisateur peut trier par note des utilisateurs
- [ ] L'utilisateur peut trier par date d'ajout (plus récent d'abord)
- [ ] L'utilisateur peut trier par prix d'impression estimé (croissant/décroissant)
- [ ] Le tri sélectionné est visuellement indiqué
- [ ] Les résultats se réorganisent immédiatement après changement de tri
- [ ] Le tri est conservé lors de la pagination

**Priorité:** Moyenne  
**Estimation:** 2 points

---

### US #16.5 - Recherche par photo

**En tant qu'** utilisateur,  
**Je veux** pouvoir rechercher un modèle 3D en uploadant une photo,  
**Afin de** trouver des modèles similaires à un objet que j'ai en photo.

#### ✅ Critères d'acceptation
- [ ] L'utilisateur peut uploader une image via un bouton dédié
- [ ] Les formats acceptés sont : JPG, PNG, HEIC
- [ ] La taille maximale est de 10 MB
- [ ] Une prévisualisation de l'image uploadée est affichée
- [ ] Un message d'erreur clair s'affiche si le format ou la taille est invalide
- [ ] L'image est automatiquement compressée côté serveur
- [ ] La recherche par IA s'effectue en moins de 3 secondes
- [ ] Les résultats sont classés par similarité visuelle
- [ ] L'utilisateur peut voir quel élément de la photo a été détecté

**Priorité:** Haute  
**Estimation:** 8 points

---

### US #16.6 - Historique de recherche

**En tant qu'** utilisateur connecté,  
**Je veux** accéder à mon historique de recherches,  
**Afin de** retrouver facilement des recherches précédentes.

#### ✅ Critères d'acceptation
- [ ] Les dernières recherches de l'utilisateur sont sauvegardées
- [ ] L'historique affiche les 20 dernières recherches
- [ ] L'utilisateur peut cliquer sur une recherche de l'historique pour la relancer
- [ ] L'utilisateur peut supprimer une recherche de l'historique
- [ ] L'utilisateur peut effacer tout l'historique
- [ ] L'historique est accessible depuis le profil utilisateur
- [ ] L'historique est conservé pendant 90 jours

**Priorité:** Basse  
**Estimation:** 3 points

---

## Feature #17 - Visualisation et détails des modèles 3D

### Description
Permet aux utilisateurs de visualiser les modèles 3D trouvés et d'accéder aux informations détaillées (dimensions, créateur, licence, compatibilité).

### Objectifs
- Afficher les résultats de recherche de manière claire et attractive
- Fournir toutes les informations nécessaires pour choisir un modèle
- Permettre une navigation fluide entre les résultats

### Hors périmètre (Phase 1)
- Visualisation 3D interactive (prévu Phase 2)
- Modification du modèle 3D en ligne

---

### US #17.1 - Affichage des résultats en grille

**En tant qu'** utilisateur,  
**Je veux** voir les résultats de recherche sous forme de grille avec des miniatures,  
**Afin de** parcourir rapidement les modèles disponibles.

#### ✅ Critères d'acceptation
- [ ] Les résultats s'affichent en grille responsive (2-6 colonnes selon la taille d'écran)
- [ ] Chaque carte affiche : miniature, nom du modèle, note, prix estimé
- [ ] Les images se chargent en lazy loading
- [ ] Hover sur une carte affiche plus d'infos (catégorie, complexité)
- [ ] L'utilisateur peut cliquer sur une carte pour voir les détails
- [ ] Les cartes ont une animation au survol
- [ ] Un indicateur de chargement s'affiche pendant le chargement des résultats

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #17.2 - Pagination des résultats

**En tant qu'** utilisateur,  
**Je veux** naviguer entre les pages de résultats,  
**Afin de** parcourir tous les modèles trouvés sans surcharge.

#### ✅ Critères d'acceptation
- [ ] Les résultats sont paginés par 20 ou 50 éléments (choix utilisateur)
- [ ] Une barre de pagination est visible en bas de la page
- [ ] L'utilisateur peut naviguer vers la page suivante/précédente
- [ ] L'utilisateur peut aller directement à une page spécifique
- [ ] Le numéro de page actuelle est visible
- [ ] La pagination utilise cursor-based pour les performances
- [ ] L'utilisateur revient en haut de la page lors d'un changement de page
- [ ] L'URL est mise à jour avec le numéro de page (partage facile)

**Priorité:** Haute  
**Estimation:** 2 points

---

### US #17.3 - Page de détails d'un modèle

**En tant qu'** utilisateur,  
**Je veux** voir tous les détails d'un modèle 3D,  
**Afin de** décider si ce modèle correspond à mes besoins.

#### ✅ Critères d'acceptation
- [ ] Page dédiée accessible depuis les résultats de recherche
- [ ] Galerie d'images du modèle (plusieurs angles)
- [ ] Nom et description complète du modèle
- [ ] Nom de l'auteur/créateur avec lien vers son profil
- [ ] Type de licence (CC BY, CC BY-SA, usage commercial, etc.)
- [ ] Dimensions exactes (L x l x h en mm)
- [ ] Poids estimé du modèle imprimé
- [ ] Temps d'impression approximatif
- [ ] Niveau de complexité d'impression
- [ ] Nombre de pièces
- [ ] Support requis (oui/non)
- [ ] Matériaux compatibles recommandés
- [ ] Note moyenne et nombre d'avis
- [ ] Bouton "Commander l'impression" visible

**Priorité:** Haute  
**Estimation:** 5 points

---

### US #17.4 - Galerie d'images du modèle

**En tant qu'** utilisateur,  
**Je veux** voir plusieurs photos du modèle 3D sous différents angles,  
**Afin de** bien visualiser le modèle avant de commander.

#### ✅ Critères d'acceptation
- [ ] Affichage d'une image principale en grand format
- [ ] Miniatures cliquables pour changer l'image principale
- [ ] Support de 5-10 images maximum par modèle
- [ ] Zoom possible sur l'image principale
- [ ] Navigation suivant/précédent avec flèches
- [ ] Navigation au clavier (flèches gauche/droite)
- [ ] Images optimisées (WebP avec fallback)
- [ ] Indicateur de l'image actuelle (1/5, 2/5, etc.)

**Priorité:** Moyenne  
**Estimation:** 3 points

---

### US #17.5 - Partage d'un modèle

**En tant qu'** utilisateur,  
**Je veux** pouvoir partager un modèle 3D,  
**Afin de** le montrer à d'autres personnes.

#### ✅ Critères d'acceptation
- [ ] Bouton de partage visible sur la page de détails
- [ ] Copie du lien direct vers le modèle
- [ ] Partage vers réseaux sociaux (Facebook, Twitter, Pinterest)
- [ ] Partage par email
- [ ] Confirmation visuelle après copie du lien
- [ ] URL courte et propre (SEO friendly)

**Priorité:** Basse  
**Estimation:** 2 points

---

## Feature #18 - Analyse de printabilité

### Description
Analyse automatique des modèles 3D pour vérifier leur compatibilité d'impression et fournir des recommandations.

### Objectifs
- Vérifier que le modèle peut être imprimé
- Estimer le temps et le coût d'impression
- Recommander les meilleurs matériaux

### Hors périmètre (Phase 1)
- Analyse structurelle avancée (overhangs, stabilité) → Phase 3
- Génération automatique de supports → Phase 3

---

### US #18.1 - Analyse automatique du modèle

**En tant qu'** utilisateur,  
**Je veux** voir une analyse automatique de printabilité du modèle,  
**Afin de** savoir si le modèle peut être imprimé et dans quelles conditions.

#### ✅ Critères d'acceptation
- [ ] L'analyse se lance automatiquement lors de la consultation des détails
- [ ] L'analyse prend moins de 10 secondes
- [ ] Un rapport affiche le statut : Imprimable / Non imprimable / Modifications nécessaires
- [ ] Le rapport inclut les dimensions finales du modèle
- [ ] Le rapport liste les matériaux compatibles
- [ ] Le rapport indique si le modèle nécessite des supports
- [ ] Le rapport estime le temps d'impression (fourchette min-max)
- [ ] Le rapport estime le poids de matériau nécessaire
- [ ] Des recommandations sont affichées si applicable

**Priorité:** Haute  
**Estimation:** 8 points

---

### US #18.2 - Vérification des dimensions

**En tant qu'** utilisateur,  
**Je veux** savoir si les dimensions du modèle sont compatibles avec l'imprimante,  
**Afin de** m'assurer que le modèle peut être imprimé en une seule pièce.

#### ✅ Critères d'acceptation
- [ ] Les dimensions du modèle sont comparées au volume d'impression disponible
- [ ] Un avertissement s'affiche si le modèle est trop grand
- [ ] Une suggestion d'échelle réduite est proposée si nécessaire
- [ ] La possibilité de découper en plusieurs parties est mentionnée
- [ ] Les dimensions après réduction d'échelle sont affichées
- [ ] L'utilisateur peut voir une visualisation des dimensions (comparaison avec objets courants)

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #18.3 - Estimation du coût d'impression

**En tant qu'** utilisateur,  
**Je veux** voir une estimation du coût d'impression,  
**Afin de** connaître le budget nécessaire avant de commander.

#### ✅ Critères d'acceptation
- [ ] Calcul automatique du volume de matériau nécessaire
- [ ] Estimation du temps d'impression
- [ ] Calcul du coût des matériaux
- [ ] Calcul du coût de main d'œuvre
- [ ] Coût total TTC affiché clairement
- [ ] Fourchette de prix (min-max) selon les options
- [ ] Explication du calcul disponible (détail des coûts)
- [ ] Mise à jour en temps réel si l'utilisateur change les paramètres

**Priorité:** Haute  
**Estimation:** 5 points

---

## Feature #19 - Commande d'impression

### Description
Permet aux utilisateurs de configurer et commander l'impression d'un modèle 3D avec choix des matériaux, couleurs et options.

### Objectifs
- Offrir un workflow de commande simple et intuitif
- Permettre la personnalisation de l'impression
- Calculer le prix en temps réel
- Envoyer automatiquement la commande à l'imprimeur

---

### US #19.1 - Configuration du matériau

**En tant qu'** utilisateur,  
**Je veux** choisir le matériau d'impression,  
**Afin de** obtenir un objet avec les propriétés souhaitées.

#### ✅ Critères d'acceptation
- [ ] Liste des matériaux disponibles et compatibles avec le modèle
- [ ] Pour chaque matériau : nom, description, propriétés, cas d'usage
- [ ] Indication du matériau recommandé
- [ ] Affichage du prix par matériau
- [ ] Filtrage des matériaux non compatibles (grisés)
- [ ] Icône ou photo du matériau
- [ ] Temps d'impression variant selon le matériau
- [ ] Mise à jour automatique du prix total

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #19.2 - Choix de la couleur

**En tant qu'** utilisateur,  
**Je veux** choisir la couleur de mon impression,  
**Afin de** personnaliser mon objet.

#### ✅ Critères d'acceptation
- [ ] Palette de couleurs disponibles pour le matériau sélectionné
- [ ] Affichage visuel des couleurs (carrés de couleur)
- [ ] Indication des couleurs en stock
- [ ] Possibilité de sélectionner "couleur naturelle" si applicable
- [ ] Prévisualisation du rendu de couleur sur le modèle (si possible)
- [ ] Prix ajusté selon la couleur (certaines couleurs peuvent être plus chères)

**Priorité:** Moyenne  
**Estimation:** 2 points

---

### US #19.3 - Configuration de la qualité d'impression

**En tant qu'** utilisateur,  
**Je veux** choisir la qualité d'impression,  
**Afin de** équilibrer qualité et temps/coût d'impression.

#### ✅ Critères d'acceptation
- [ ] 3 options de qualité : Brouillon (0.3mm), Standard (0.2mm), Haute qualité (0.15mm)
- [ ] Description de chaque niveau de qualité
- [ ] Indication du temps d'impression pour chaque qualité
- [ ] Indication du prix pour chaque qualité
- [ ] Prévisualisation du rendu (échantillons photos)
- [ ] Recommandation selon le type de modèle
- [ ] Mise à jour en temps réel du temps et du prix

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #19.4 - Configuration du remplissage (infill)

**En tant qu'** utilisateur,  
**Je veux** choisir le taux de remplissage,  
**Afin de** contrôler la solidité et le poids de mon objet.

#### ✅ Critères d'acceptation
- [ ] Slider de 10% à 100% de remplissage
- [ ] Valeur par défaut recommandée selon le type d'objet
- [ ] Explication de l'impact du remplissage (solidité, poids, coût, temps)
- [ ] Prévisualisation de la structure de remplissage
- [ ] Indication du poids final selon le remplissage
- [ ] Indication du coût selon le remplissage
- [ ] Indication du temps d'impression selon le remplissage

**Priorité:** Moyenne  
**Estimation:** 3 points

---

### US #19.5 - Options de post-traitement

**En tant qu'** utilisateur,  
**Je veux** sélectionner des options de post-traitement,  
**Afin de** obtenir une finition professionnelle.

#### ✅ Critères d'acceptation
- [ ] Case à cocher "Ponçage" avec supplément de prix
- [ ] Case à cocher "Peinture" avec choix de couleur et supplément
- [ ] Case à cocher "Vernissage" avec supplément
- [ ] Explication de chaque post-traitement
- [ ] Photos avant/après pour chaque traitement
- [ ] Ajout du délai de traitement au temps total
- [ ] Mise à jour du prix total

**Priorité:** Basse  
**Estimation:** 3 points

---

### US #19.6 - Récapitulatif de la commande

**En tant qu'** utilisateur,  
**Je veux** voir un récapitulatif complet de ma commande,  
**Afin de** vérifier tous les détails avant de valider.

#### ✅ Critères d'acceptation
- [ ] Affichage du modèle sélectionné avec miniature
- [ ] Résumé de toutes les options sélectionnées
- [ ] Détail des coûts : matériau, main d'œuvre, post-traitement, livraison
- [ ] Prix total TTC bien visible
- [ ] Temps d'impression estimé
- [ ] Délai de livraison estimé
- [ ] Formulaire d'adresse de livraison
- [ ] Bouton "Modifier" pour revenir à la configuration
- [ ] Bouton "Valider la commande" bien visible

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #19.7 - Validation de la commande

**En tant qu'** utilisateur,  
**Je veux** valider ma commande,  
**Afin de** lancer la fabrication de mon objet.

#### ✅ Critères d'acceptation
- [ ] Case à cocher "J'accepte les conditions générales de vente"
- [ ] Lien vers les CGV
- [ ] Bouton "Confirmer la commande" désactivé tant que CGV non acceptées
- [ ] Confirmation visuelle après clic (modal ou page)
- [ ] Génération d'un numéro de commande unique
- [ ] Affichage du numéro de commande à l'utilisateur
- [ ] Email de confirmation envoyé automatiquement
- [ ] Redirection vers la page de suivi de commande
- [ ] Notification email envoyée à l'administrateur/imprimeur

**Priorité:** Haute  
**Estimation:** 3 points

---

## Feature #20 - Gestion des commandes (côté utilisateur)

### Description
Permet aux utilisateurs de suivre leurs commandes, consulter l'historique et recevoir des notifications.

### Objectifs
- Offrir une transparence totale sur le statut des commandes
- Permettre la consultation de l'historique
- Notifier l'utilisateur à chaque étape

---

### US #20.1 - Suivi en temps réel d'une commande

**En tant qu'** utilisateur,  
**Je veux** suivre l'avancement de ma commande,  
**Afin de** savoir où en est la fabrication.

#### ✅ Critères d'acceptation
- [ ] Page dédiée au suivi accessible depuis le profil
- [ ] Affichage du numéro de commande
- [ ] Timeline visuelle des étapes : En attente → Préparation → Impression → Post-traitement → Expédition → Livré
- [ ] Statut actuel mis en évidence
- [ ] Date et heure de chaque changement de statut
- [ ] Estimation de livraison mise à jour
- [ ] Détails de la commande (modèle, options, prix)
- [ ] Possibilité d'annuler si commande pas encore en impression

**Priorité:** Haute  
**Estimation:** 5 points

---

### US #20.2 - Notifications par email

**En tant qu'** utilisateur,  
**Je veux** recevoir des emails à chaque changement de statut,  
**Afin de** rester informé sans avoir à consulter le site.

#### ✅ Critères d'acceptation
- [ ] Email envoyé automatiquement à chaque changement de statut
- [ ] Email contient : numéro de commande, nouveau statut, estimation de livraison
- [ ] Template professionnel et responsive
- [ ] Lien direct vers le suivi de commande
- [ ] Email de confirmation immédiat après validation
- [ ] Email d'expédition avec numéro de tracking (si disponible)
- [ ] Email de livraison avec demande d'avis

**Priorité:** Haute  
**Estimation:** 3 points

---

### US #20.3 - Historique des commandes

**En tant qu'** utilisateur,  
**Je veux** consulter l'historique de toutes mes commandes,  
**Afin de** retrouver facilement mes commandes passées.

#### ✅ Critères d'acceptation
- [ ] Page "Mes commandes" dans le profil utilisateur
- [ ] Liste de toutes les commandes avec miniature du modèle
- [ ] Pour chaque commande : numéro, date, statut, prix
- [ ] Filtres par statut (toutes, en cours, livrées, annulées)
- [ ] Filtres par date (période personnalisée)
- [ ] Tri par date (plus récent d'abord par défaut)
- [ ] Pagination si plus de 20 commandes
- [ ] Clic sur une commande pour voir les détails
- [ ] Bouton "Commander à nouveau" pour refaire la même commande

**Priorité:** Moyenne  
**Estimation:** 4 points

---

### US #20.4 - Annulation d'une commande

**En tant qu'** utilisateur,  
**Je veux** pouvoir annuler une commande,  
**Afin de** ne pas payer si je change d'avis rapidement.

#### ✅ Critères d'acceptation
- [ ] Bouton "Annuler la commande" visible si statut = "En attente" ou "Préparation"
- [ ] Modal de confirmation avant annulation
- [ ] Explication des conditions d'annulation
- [ ] Commande annulée immédiatement après confirmation
- [ ] Email de confirmation d'annulation
- [ ] Statut de la commande passe à "Annulée"
- [ ] Notification envoyée à l'administrateur
- [ ] Impossibilité d'annuler si impression déjà commencée

**Priorité:** Moyenne  
**Estimation:** 2 points

---

### US #20.5 - Téléchargement de la facture

**En tant qu'** utilisateur,  
**Je veux** télécharger la facture de ma commande,  
**Afin de** conserver une preuve d'achat.

#### ✅ Critères d'acceptation
- [ ] Bouton "Télécharger la facture" visible pour les commandes validées
- [ ] Facture au format PDF
- [ ] Facture contient : numéro, date, détails commande, prix TTC, TVA
- [ ] Facture conforme aux obligations légales
- [ ] Nom de fichier : Facture_[NumeroCommande]_[Date].pdf
- [ ] Facture générée côté serveur
- [ ] Possibilité de re-télécharger à tout moment

**Priorité:** Moyenne  
**Estimation:** 3 points

---

### US #20.6 - Évaluation et avis

**En tant qu'** utilisateur,  
**Je veux** laisser un avis sur ma commande,  
**Afin de** partager mon expérience et aider les autres utilisateurs.

#### ✅ Critères d'acceptation
- [ ] Formulaire d'avis accessible après livraison
- [ ] Note de 1 à 5 étoiles
- [ ] Commentaire textuel optionnel (max 500 caractères)
- [ ] Upload de photos optionnel (max 3)
- [ ] Critères séparés : qualité d'impression, respect des délais, finitions
- [ ] Validation du formulaire
- [ ] Avis publié après modération (ou immédiatement)
- [ ] Email de remerciement après avis
- [ ] Impossibilité de laisser plusieurs avis pour la même commande

**Priorité:** Basse  
**Estimation:** 4 points

---

## Feature #21 - Tableau de bord administrateur

### Description
Interface de gestion pour l'administrateur permettant de gérer les commandes, les matériaux, les sources de modèles et les utilisateurs.

### Objectifs
- Centraliser la gestion des commandes
- Gérer le catalogue de matériaux
- Configurer les sources de modèles 3D
- Surveiller l'activité de la plateforme

---

### US #21.1 - Vue d'ensemble du dashboard

**En tant qu'** administrateur,  
**Je veux** voir un tableau de bord avec les statistiques clés,  
**Afin d'** avoir une vue globale de l'activité.

#### ✅ Critères d'acceptation
- [ ] Accès restreint aux utilisateurs avec rôle "Admin"
- [ ] Statistiques du jour : nouvelles commandes, revenus, nouveaux utilisateurs
- [ ] Statistiques du mois : total commandes, CA, taux de conversion
- [ ] Graphique de l'évolution des commandes (30 derniers jours)
- [ ] Liste des commandes en attente (action requise)
- [ ] Liste des modèles les plus commandés
- [ ] Indicateurs temps réel : utilisateurs connectés, recherches en cours
- [ ] Alertes si problèmes détectés (rupture stock matériau, sync source échouée)

**Priorité:** Haute  
**Estimation:** 5 points

---

### US #21.2 - Gestion des commandes

**En tant qu'** administrateur,  
**Je veux** gérer toutes les commandes de la plateforme,  
**Afin de** suivre la production et communiquer avec les clients.

#### ✅ Critères d'acceptation
- [ ] Liste de toutes les commandes avec filtres (statut, date, client)
- [ ] Recherche par numéro de commande ou email client
- [ ] Tri par date, statut, prix
- [ ] Clic sur une commande pour voir tous les détails
- [ ] Modification du statut de la commande (dropdown)
- [ ] Champ "Notes internes" pour l'équipe
- [ ] Bouton "Contacter le client" (ouverture email)
- [ ] Email automatique au client lors du changement de statut
- [ ] Export Excel/CSV des commandes
- [ ] Marquage des commandes urgentes

**Priorité:** Haute  
**Estimation:** 6 points

---

### US #21.3 - Gestion des matériaux

**En tant qu'** administrateur,  
**Je veux** gérer le catalogue des matériaux disponibles,  
**Afin de** proposer les bons matériaux aux clients.

#### ✅ Critères d'acceptation
- [ ] Liste de tous les matériaux avec statut actif/inactif
- [ ] Bouton "Ajouter un matériau"
- [ ] Formulaire d'ajout : nom, type, propriétés, couleurs disponibles, prix/gramme, photo
- [ ] Modification d'un matériau existant
- [ ] Activation/Désactivation d'un matériau (switch)
- [ ] Suppression d'un matériau (avec confirmation)
- [ ] Vérification avant suppression si utilisé dans commandes en cours
- [ ] Gestion du stock disponible
- [ ] Alerte si stock faible

**Priorité:** Haute  
**Estimation:** 5 points

---

### US #21.4 - Gestion des sources de modèles 3D

**En tant qu'** administrateur,  
**Je veux** configurer les sites web sources de modèles,  
**Afin de** enrichir automatiquement le catalogue.

#### ✅ Critères d'acceptation
- [ ] Liste des sources configurées (Thingiverse, MyMiniFactory, Cults3D, etc.)
- [ ] Statut de chaque source : actif/inactif/erreur
- [ ] Nombre de modèles indexés par source
- [ ] Date de dernière synchronisation
- [ ] Bouton "Ajouter une source"
- [ ] Formulaire : nom, URL/API, clé API, fréquence de sync, filtres
- [ ] Modification d'une source existante
- [ ] Bouton "Synchroniser maintenant" pour sync manuelle
- [ ] Logs de synchronisation visibles
- [ ] Affichage des erreurs de sync avec détails
- [ ] Configuration du rate limiting par source

**Priorité:** Moyenne  
**Estimation:** 6 points

---

### US #21.5 - Gestion des utilisateurs

**En tant qu'** administrateur,  
**Je veux** gérer les utilisateurs de la plateforme,  
**Afin de** modérer et gérer les accès.

#### ✅ Critères d'acceptation
- [ ] Liste de tous les utilisateurs avec filtres
- [ ] Recherche par email, nom, ID
- [ ] Tri par date d'inscription, nombre de commandes
- [ ] Clic sur un utilisateur pour voir le profil détaillé
- [ ] Historique des commandes de l'utilisateur
- [ ] Modification du rôle (User, Admin, Super Admin)
- [ ] Suspension temporaire d'un compte
- [ ] Bannissement définitif (avec raison)
- [ ] Envoi d'email à un utilisateur
- [ ] Statistiques par utilisateur (nombre recherches, commandes, dépense totale)

**Priorité:** Moyenne  
**Estimation:** 5 points

---

### US #21.6 - Rapports et statistiques

**En tant qu'** administrateur,  
**Je veux** générer des rapports détaillés,  
**Afin d'** analyser la performance de la plateforme.

#### ✅ Critères d'acceptation
- [ ] Sélection de la période (jour, semaine, mois, année, personnalisé)
- [ ] Rapport des ventes : CA, nombre de commandes, panier moyen
- [ ] Rapport des modèles : plus populaires, plus rentables
- [ ] Rapport des matériaux : plus utilisés, revenus par matériau
- [ ] Rapport utilisateurs : nouveaux, actifs, taux de rétention
- [ ] Graphiques visuels pour chaque métrique
- [ ] Export des rapports en PDF et Excel
- [ ] Planification d'envoi de rapports par email (hebdomadaire/mensuel)

**Priorité:** Basse  
**Estimation:** 6 points

---

## Feature #22 - Profil utilisateur

### Description
Permet aux utilisateurs de gérer leurs informations personnelles, adresses, préférences et favoris.

### Objectifs
- Faciliter la gestion des informations personnelles
- Sauvegarder les adresses de livraison
- Gérer les préférences de notification

---

### US #22.1 - Consultation du profil

**En tant qu'** utilisateur connecté,  
**Je veux** accéder à mon profil,  
**Afin de** voir mes informations personnelles.

#### ✅ Critères d'acceptation
- [ ] Menu "Mon profil" accessible depuis le header
- [ ] Affichage de l'email, date d'inscription
- [ ] Affichage des adresses de livraison enregistrées
- [ ] Affichage des préférences de notification
- [ ] Liens vers : Mes commandes, Mes favoris, Historique de recherche
- [ ] Lien vers la modification du profil
- [ ] Lien vers la suppression du compte
- [ ] Statistiques personnelles : nombre de commandes, total dépensé

**Priorité:** Moyenne  
**Estimation:** 3 points

---

### US #22.2 - Gestion des adresses de livraison

**En tant qu'** utilisateur,  
**Je veux** enregistrer plusieurs adresses de livraison,  
**Afin de** ne pas avoir à les ressaisir à chaque commande.

#### ✅ Critères d'acceptation
- [ ] Liste des adresses enregistrées
- [ ] Bouton "Ajouter une adresse"
- [ ] Formulaire : nom, prénom, rue, ville, code postal, pays, téléphone
- [ ] Validation du format de l'adresse
- [ ] Case à cocher "Définir comme adresse par défaut"
- [ ] Modification d'une adresse existante
- [ ] Suppression d'une adresse (avec confirmation)
- [ ] Maximum 5 adresses enregistrées
- [ ] Sélection rapide d'une adresse lors de la commande

**Priorité:** Moyenne  
**Estimation:** 4 points

---

### US #22.3 - Gestion des préférences de notification

**En tant qu'** utilisateur,  
**Je veux** configurer mes préférences de notification,  
**Afin de** recevoir uniquement les emails qui m'intéressent.

#### ✅ Critères d'acceptation
- [ ] Cases à cocher pour chaque type de notification :
  - [ ] Notifications de commande (obligatoire)
  - [ ] Nouveautés et promotions
  - [ ] Newsletter mensuelle
  - [ ] Suggestions de modèles basées sur mes recherches
- [ ] Sauvegarde automatique des préférences
- [ ] Confirmation visuelle après modification
- [ ] Email de confirmation du changement de préférences
- [ ] Lien de désinscription dans chaque email marketing

**Priorité:** Basse  
**Estimation:** 2 points

---

### US #22.4 - Modèles favoris

**En tant qu'** utilisateur,  
**Je veux** sauvegarder mes modèles favoris,  
**Afin de** les retrouver facilement plus tard.

#### ✅ Critères d'acceptation
- [ ] Bouton "Ajouter aux favoris" (icône cœur) sur chaque modèle
- [ ] Indication visuelle si le modèle est déjà en favoris
- [ ] Page "Mes favoris" dans le profil
- [ ] Affichage en grille des modèles favoris
- [ ] Bouton "Retirer des favoris" sur chaque modèle
- [ ] Tri par date d'ajout
- [ ] Possibilité de créer des listes/collections de favoris
- [ ] Limite de 100 favoris par utilisateur

**Priorité:** Basse  
**Estimation:** 3 points

---

## 📊 Récapitulatif

### Nombre de Features et User Stories

| Feature | Nombre d'US | Priorité |
|---------|-------------|----------|
| Feature #16 - Recherche de modèles 3D | 6 US | Haute |
| Feature #17 - Visualisation et détails | 5 US | Haute |
| Feature #18 - Analyse de printabilité | 3 US | Haute |
| Feature #19 - Commande d'impression | 7 US | Haute |
| Feature #20 - Gestion des commandes (utilisateur) | 6 US | Haute |
| Feature #21 - Tableau de bord administrateur | 6 US | Moyenne |
| Feature #22 - Profil utilisateur | 4 US | Moyenne |
| **Total** | **37 User Stories** | - |

### Estimation totale

**Total des points d'estimation: ~145 points**

Si 1 point = 1 heure de développement effectif :
- **145 heures de développement**
- **≈ 29 jours à temps partiel (50%)**
- **≈ 6 mois calendaires à temps partiel**

---

## 🏷️ Labels recommandés pour les issues

- `feature` - Pour les features principales
- `user-story` - Pour les user stories
- `priority-high` - Priorité haute
- `priority-medium` - Priorité moyenne
- `priority-low` - Priorité basse
- `frontend` - Concerne le frontend
- `backend` - Concerne le backend
- `fullstack` - Concerne frontend et backend
- `phase-1` - À développer en Phase 1
- `phase-2` - À développer en Phase 2
- `phase-3` - À développer en Phase 3

---

## 📝 Instructions pour créer les issues GitHub

1. Créer d'abord chaque **Feature** avec le label `feature`
2. Pour chaque Feature, créer les **User Stories** avec :
   - Label `user-story`
   - Label de priorité approprié
   - Référence à la Feature parent dans le corps (ex: "Liée à #16")
3. Les tâches techniques seront créées ensuite pour chaque User Story

**Format des titres:**
- Feature: `Feature #XX - [Nom de la feature]`
- User Story: `US #XX.Y - [Description courte]`

---

**Créé le:** 19 décembre 2025  
**Version:** 1.0  
**Auteur:** Copilot Agent

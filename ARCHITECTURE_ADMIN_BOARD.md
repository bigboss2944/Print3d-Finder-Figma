# Architecture du Tableau de Bord Administrateur

## 📐 Vue d'Ensemble de l'Architecture

Ce document décrit l'architecture détaillée du tableau de bord administrateur avec l'onglet de gestion des sources pour le projet Print3D Finder.

---

## 🏛️ Architecture des Composants

```
┌─────────────────────────────────────────────────────────────────┐
│                           App.tsx                                │
│                    (Application Racine)                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Routeur de Pages                      │   │
│  │  - login      (LoginPage)                               │   │
│  │  - search     (SearchPage)                              │   │
│  │  - results    (SearchResults)                           │   │
│  │  - details    (ModelDetails)                            │   │
│  │  - request    (PrintRequest)                            │   │
│  │  - profile    (UserProfile)                             │   │
│  │  - admin      (AdminDashboard) ← FOCUS                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AdminDashboard.tsx                          │
│                  (Composant Principal Admin)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                  Header & Navigation                    │    │
│  │  - Logo Print3D Finder                                  │    │
│  │  - Navigation (Navigation.tsx)                          │    │
│  │  - Barre de recherche                                   │    │
│  │  - Boutons: Déconnexion, Profil                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Cartes Statistiques (KPIs)                 │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │    │
│  │  │ Demandes │ │   En     │ │   Ce    │ │ Revenus  │ │    │
│  │  │  Total   │ │ Attente  │ │  Mois   │ │  Total   │ │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                   Système d'Onglets                     │    │
│  │  [Demandes] [Utilisateurs] [Matériaux] [Sources]       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                  Contenu de l'Onglet                    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ Tab "Demandes"                                  │    │    │
│  │  │ - Liste des demandes d'impression              │    │    │
│  │  │ - Filtres, recherche, actions                  │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ Tab "Utilisateurs"                              │    │    │
│  │  │ - Liste des comptes utilisateurs               │    │    │
│  │  │ - Gestion, suppression                         │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ Tab "Matériaux"                                 │    │    │
│  │  │ → MaterialsManagement.tsx                       │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  │  ┌────────────────────────────────────────────────┐    │    │
│  │  │ Tab "Sources" ← FOCUS                           │    │    │
│  │  │ → SourcesManagement.tsx                         │    │    │
│  │  └────────────────────────────────────────────────┘    │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Composant SourcesManagement - Architecture Détaillée

```
┌───────────────────────────────────────────────────────────────────┐
│                    SourcesManagement.tsx                          │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                     En-tête Section                        │   │
│  │  - Titre: "Gestion des Sources de Modèles"                │   │
│  │  - Description                                             │   │
│  │  - Bouton: [+ Ajouter une source]                         │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │                   Liste des Sources                        │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │           Carte Source: Thingiverse                  │  │   │
│  │  │  ┌─────────────────────────────────────────────┐    │  │   │
│  │  │  │ Header                                       │    │  │   │
│  │  │  │ [🌐] Thingiverse  [Priorité #1] [Auth]     │    │  │   │
│  │  │  │ https://www.thingiverse.com                 │    │  │   │
│  │  │  │                           [✏️ Modifier] [🗑️] │    │  │   │
│  │  │  └─────────────────────────────────────────────┘    │  │   │
│  │  │  ┌─────────────────────────────────────────────┐    │  │   │
│  │  │  │ Statistiques (Grid 4 colonnes)              │    │  │   │
│  │  │  │ ┌─────────┐ ┌────────┐ ┌────────┐ ┌──────┐│    │  │   │
│  │  │  │ │ 2.45M   │ │ 98.5%  │ │ 245ms  │ │3456/ ││    │  │   │
│  │  │  │ │ Modèles │ │ Succès │ │Réponse │ │10000 ││    │  │   │
│  │  │  │ └─────────┘ └────────┘ └────────┘ └──────┘│    │  │   │
│  │  │  └─────────────────────────────────────────────┘    │  │   │
│  │  │  ┌─────────────────────────────────────────────┐    │  │   │
│  │  │  │ Footer                                       │    │  │   │
│  │  │  │ Dernière synchro: 2024-12-17 10:30          │    │  │   │
│  │  │  │ ✓ Recherche                 [Désactiver]    │    │  │   │
│  │  │  └─────────────────────────────────────────────┘    │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │         Carte Source: MyMiniFactory (idem)          │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │           Carte Source: Cults3D (idem)              │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │         Carte Source: Printables (idem)             │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │              Modal: Ajouter/Modifier Source               │   │
│  │  (Affiché conditionnellement si isFormOpen === true)      │   │
│  │                                                             │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │ Header: "Ajouter une source" / "Modifier la source" │  │   │
│  │  │                                        [✖️ Fermer]    │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │ Section: Informations générales                     │  │   │
│  │  │  - Nom de la source *                               │  │   │
│  │  │  - URL du site ou API *                             │  │   │
│  │  │  - 🔑 Clé API (optionnel, password)                 │  │   │
│  │  │  - Priorité * | Quota journalier *                  │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │ Section: Fonctionnalités                            │  │   │
│  │  │  ☑️ Supporte la recherche textuelle                 │  │   │
│  │  │  ☑️ Nécessite une authentification                  │  │   │
│  │  │  ☑️ Source active et interrogeable                  │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │ ⚠️ Avertissement: Conformité                        │  │   │
│  │  │  - Vérifier les CGU du site                         │  │   │
│  │  │  - Respecter les quotas API                         │  │   │
│  │  │  - Conformité RGPD                                  │  │   │
│  │  │  - Ne pas surcharger les serveurs                   │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  │  ┌─────────────────────────────────────────────────────┐  │   │
│  │  │ Actions                                              │  │   │
│  │  │  [Annuler]                    [💾 Enregistrer]      │  │   │
│  │  └─────────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │         Modal: Confirmer Suppression Source               │   │
│  │  (Affiché si deleteConfirmation !== null)                 │   │
│  │                                                             │   │
│  │  ⚠️ "Supprimer la source"                                  │   │
│  │  Les modèles existants resteront accessibles mais          │   │
│  │  aucune nouvelle synchronisation ne sera effectuée.        │   │
│  │                                                             │   │
│  │  [Annuler]                        [Supprimer]              │   │
│  └───────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 📊 Modèle de Données

### Interface ModelSource

```typescript
interface ModelSource {
  id: string;                    // Identifiant unique
  name: string;                  // Nom de la source (ex: "Thingiverse")
  url: string;                   // URL du site ou API
  apiKey?: string;               // Clé API (optionnel, à chiffrer)
  active: boolean;               // Source active ou désactivée
  priority: number;              // Priorité (1 = max, 2, 3, ...)
  requestsPerDay: number;        // Quota de requêtes journalier
  currentRequests: number;       // Nombre de requêtes utilisées aujourd'hui
  lastSync: string;              // Date/heure de dernière synchronisation
  responseTime: number;          // Temps de réponse moyen (ms)
  modelsCount: number;           // Nombre de modèles indexés
  successRate: number;           // Taux de succès (%)
  supportsSearch: boolean;       // Supporte la recherche textuelle
  requiresAuth: boolean;         // Nécessite authentification
}
```

### Interface SourceFormData

```typescript
interface SourceFormData {
  name: string;
  url: string;
  apiKey: string;
  active: boolean;
  priority: string;              // String car input number
  requestsPerDay: string;        // String car input number
  supportsSearch: boolean;
  requiresAuth: boolean;
}
```

---

## 🔄 Flux de Données et États

### État Local (useState)

```typescript
const [sources, setSources] = useState<ModelSource[]>([...]);
const [isFormOpen, setIsFormOpen] = useState(false);
const [editingSource, setEditingSource] = useState<ModelSource | null>(null);
const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
const [formData, setFormData] = useState<SourceFormData>({...});
```

### Cycle de Vie des Actions

```
┌─────────────────────────────────────────────────────────────┐
│                    Actions Utilisateur                       │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌───────────────┐   ┌──────────────┐
            │  CREATE/ADD   │   │    UPDATE    │
            └───────┬───────┘   └──────┬───────┘
                    │                   │
                    ▼                   ▼
            ┌─────────────────────────────────┐
            │    openAddForm()                 │
            │    - Reset formData              │
            │    - setEditingSource(null)      │
            │    - setIsFormOpen(true)         │
            └─────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
         ┌──────────────────┐  ┌──────────────────┐
         │ User fills form  │  │ User clicks Save │
         └──────────────────┘  └────────┬─────────┘
                                        ▼
                            ┌─────────────────────┐
                            │  handleSubmit(e)     │
                            │  - Validate          │
                            │  - Create newSource  │
                            │  - Update sources[]  │
                            │  - Close modal       │
                            └─────────────────────┘
                                        │
                                        ▼
                            ┌─────────────────────┐
                            │  sources updated    │
                            │  → Re-render        │
                            └─────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        DELETE                                │
└─────────────────────────────────────────────────────────────┘
                              │
                    User clicks [Delete] button
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ setDeleteConfirmation   │
                  │ (sourceId)              │
                  └───────────┬─────────────┘
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ Modal de confirmation   │
                  │ affiché                 │
                  └───────────┬─────────────┘
                              │
                    User clicks [Supprimer]
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ handleDelete(sourceId)  │
                  │ - Filter sources[]      │
                  │ - Close modal           │
                  └───────────┬─────────────┘
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ sources updated         │
                  │ → Re-render             │
                  └─────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TOGGLE ACTIVE                             │
└─────────────────────────────────────────────────────────────┘
                              │
                User clicks [Activer/Désactiver]
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ toggleActive(sourceId)  │
                  │ - Map over sources[]    │
                  │ - Toggle active flag    │
                  └───────────┬─────────────┘
                              │
                              ▼
                  ┌─────────────────────────┐
                  │ sources updated         │
                  │ → Re-render with new    │
                  │   visual state          │
                  └─────────────────────────┘
```

---

## 🎨 Hiérarchie Visuelle et Styling

### Structure de Couleurs

```css
/* Sources Actives */
.source-active {
  border: 2px solid #e5e7eb;  /* gray-200 */
  opacity: 1;
}

/* Sources Inactives */
.source-inactive {
  border: 2px solid #d1d5db;  /* gray-300 */
  opacity: 0.6;
}

/* Badges de Priorité */
.badge-priority {
  background: #f3f4f6;         /* gray-100 */
  color: #374151;              /* gray-700 */
}

/* Badges Authentification */
.badge-auth {
  background: #fef3c7;         /* amber-100 */
  color: #b45309;              /* amber-700 */
}

/* Indicateurs de Santé */
.health-excellent {
  color: #16a34a;              /* green-600 */
}

.health-good {
  color: #d97706;              /* amber-600 */
}

.health-poor {
  color: #dc2626;              /* red-600 */
}
```

### Responsive Breakpoints

```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) {
  - Grille 2 colonnes pour les statistiques
  - Boutons empilés verticalement
  - Police réduite
}

/* Tablette: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  - Grille 2 colonnes pour les statistiques
  - Affichage optimisé
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  - Grille 4 colonnes pour les statistiques
  - Affichage complet
}
```

---

## 🔐 Considérations de Sécurité

### Frontend (Actuel - Phase 1)

1. **Validation des Formulaires**
   - Champs requis vérifiés
   - Format URL validé
   - Limites de caractères

2. **Affichage Sécurisé**
   - Clés API masquées (type password)
   - Pas d'exécution de code utilisateur

3. **Sanitisation**
   - Inputs échappés automatiquement par React

### Backend (Future - Phase 2)

1. **Stockage des Clés API**
   - Chiffrement AES-256 en base de données
   - Jamais envoyées au frontend en clair
   - Gestion des secrets avec coffre-fort (Azure Key Vault)

2. **Authentification**
   - Vérification des permissions admin
   - Tokens JWT pour les requêtes API
   - Rate limiting sur les endpoints

3. **Validation Backend**
   - Double validation (frontend + backend)
   - Vérification des URLs (whitelist)
   - Protection contre injection SQL

4. **Logging et Audit**
   - Logs de toutes les modifications
   - Traçabilité des actions admin
   - Pas de credentials dans les logs

---

## 🚀 Migration vers API Backend

### Endpoints API Nécessaires

```typescript
// GET /api/admin/sources
// Récupérer toutes les sources
GET /api/admin/sources
Response: ModelSource[]

// POST /api/admin/sources
// Créer une nouvelle source
POST /api/admin/sources
Body: SourceFormData
Response: ModelSource

// PUT /api/admin/sources/:id
// Modifier une source existante
PUT /api/admin/sources/:id
Body: Partial<SourceFormData>
Response: ModelSource

// DELETE /api/admin/sources/:id
// Supprimer une source
DELETE /api/admin/sources/:id
Response: { success: boolean }

// PATCH /api/admin/sources/:id/toggle
// Activer/Désactiver une source
PATCH /api/admin/sources/:id/toggle
Response: ModelSource
```

### Schéma Base de Données

```sql
CREATE TABLE model_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    api_key_encrypted TEXT,              -- Chiffré AES-256
    active BOOLEAN DEFAULT true,
    priority INTEGER NOT NULL,
    requests_per_day INTEGER NOT NULL,
    current_requests INTEGER DEFAULT 0,
    last_sync TIMESTAMP,
    response_time INTEGER DEFAULT 0,     -- en millisecondes
    models_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 100.00,
    supports_search BOOLEAN DEFAULT true,
    requires_auth BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    CONSTRAINT unique_source_name UNIQUE(name),
    CONSTRAINT unique_source_url UNIQUE(url),
    CONSTRAINT valid_priority CHECK(priority > 0),
    CONSTRAINT valid_success_rate CHECK(success_rate BETWEEN 0 AND 100)
);

CREATE INDEX idx_sources_active ON model_sources(active);
CREATE INDEX idx_sources_priority ON model_sources(priority);
CREATE INDEX idx_sources_last_sync ON model_sources(last_sync);
```

---

## 📈 Évolutions Futures

### Phase 2: Intégration Backend
- [ ] Connexion à l'API REST
- [ ] Persistance des données en base
- [ ] Chiffrement des clés API
- [ ] Authentification et autorisations

### Phase 3: Fonctionnalités Avancées
- [ ] Synchronisation automatique en temps réel
- [ ] Monitoring des sources (uptime, latence)
- [ ] Alertes email en cas d'erreur
- [ ] Logs détaillés des synchronisations
- [ ] Graphiques de performance (Chart.js/Recharts)
- [ ] Export des statistiques (CSV, JSON)

### Phase 4: Optimisations
- [ ] Pagination pour grandes listes
- [ ] Recherche et filtres avancés
- [ ] Tri personnalisable
- [ ] Import/Export de configurations
- [ ] Historique des modifications
- [ ] Mode sombre (dark mode)
- [ ] Internationalisation (i18n)

---

## 🧪 Tests

### Tests Unitaires (Jest + React Testing Library)

```typescript
describe('SourcesManagement', () => {
  test('renders source list correctly', () => {...});
  test('opens add form when clicking add button', () => {...});
  test('validates required fields', () => {...});
  test('creates new source successfully', () => {...});
  test('updates existing source', () => {...});
  test('deletes source with confirmation', () => {...});
  test('toggles source active state', () => {...});
});
```

### Tests E2E (Playwright/Cypress)

```typescript
test('Admin can add a new source', async () => {
  // Navigate to admin dashboard
  // Click on Sources tab
  // Click Add Source button
  // Fill form
  // Submit
  // Verify source appears in list
});
```

---

## 📚 Références

### Documentation Officielle
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

### Standards et Bonnes Pratiques
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Document créé le:** 8 janvier 2026  
**Version:** 1.0  
**Auteur:** @copilot  
**Status:** ✅ Complété

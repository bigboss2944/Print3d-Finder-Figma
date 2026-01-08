import { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Globe,
  Key,
  Activity,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export interface ModelSource {
  id: string;
  name: string;
  url: string;
  apiKey?: string;
  active: boolean;
  priority: number;
  requestsPerDay: number;
  currentRequests: number;
  lastSync: string;
  responseTime: number;
  modelsCount: number;
  successRate: number;
  supportsSearch: boolean;
  requiresAuth: boolean;
}

interface SourceFormData {
  name: string;
  url: string;
  apiKey: string;
  active: boolean;
  priority: string;
  requestsPerDay: string;
  supportsSearch: boolean;
  requiresAuth: boolean;
}

export function SourcesManagement() {
  const [sources, setSources] = useState<ModelSource[]>([
    {
      id: '1',
      name: 'Thingiverse',
      url: 'https://www.thingiverse.com',
      active: true,
      priority: 1,
      requestsPerDay: 10000,
      currentRequests: 3456,
      lastSync: '2024-12-17 10:30',
      responseTime: 245,
      modelsCount: 2450000,
      successRate: 98.5,
      supportsSearch: true,
      requiresAuth: true,
    },
    {
      id: '2',
      name: 'MyMiniFactory',
      url: 'https://www.myminifactory.com',
      apiKey: 'mmf_api_key_***********',
      active: true,
      priority: 2,
      requestsPerDay: 5000,
      currentRequests: 1823,
      lastSync: '2024-12-17 10:25',
      responseTime: 312,
      modelsCount: 850000,
      successRate: 97.2,
      supportsSearch: true,
      requiresAuth: true,
    },
    {
      id: '3',
      name: 'Cults3D',
      url: 'https://cults3d.com',
      active: true,
      priority: 3,
      requestsPerDay: 3000,
      currentRequests: 892,
      lastSync: '2024-12-17 10:20',
      responseTime: 189,
      modelsCount: 650000,
      successRate: 99.1,
      supportsSearch: true,
      requiresAuth: false,
    },
    {
      id: '4',
      name: 'Printables',
      url: 'https://www.printables.com',
      active: true,
      priority: 4,
      requestsPerDay: 8000,
      currentRequests: 4521,
      lastSync: '2024-12-17 10:28',
      responseTime: 278,
      modelsCount: 1200000,
      successRate: 96.8,
      supportsSearch: true,
      requiresAuth: false,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<ModelSource | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [formData, setFormData] = useState<SourceFormData>({
    name: '',
    url: '',
    apiKey: '',
    active: true,
    priority: '5',
    requestsPerDay: '5000',
    supportsSearch: true,
    requiresAuth: false,
  });

  const openAddForm = () => {
    setEditingSource(null);
    setFormData({
      name: '',
      url: '',
      apiKey: '',
      active: true,
      priority: '5',
      requestsPerDay: '5000',
      supportsSearch: true,
      requiresAuth: false,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (source: ModelSource) => {
    setEditingSource(source);
    setFormData({
      name: source.name,
      url: source.url,
      apiKey: source.apiKey || '',
      active: source.active,
      priority: source.priority.toString(),
      requestsPerDay: source.requestsPerDay.toString(),
      supportsSearch: source.supportsSearch,
      requiresAuth: source.requiresAuth,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSource: ModelSource = {
      id: editingSource?.id || Date.now().toString(),
      name: formData.name,
      url: formData.url,
      apiKey: formData.apiKey || undefined,
      active: formData.active,
      priority: parseInt(formData.priority),
      requestsPerDay: parseInt(formData.requestsPerDay),
      currentRequests: editingSource?.currentRequests || 0,
      lastSync: editingSource?.lastSync || new Date().toISOString().slice(0, 16).replace('T', ' '),
      responseTime: editingSource?.responseTime || 0,
      modelsCount: editingSource?.modelsCount || 0,
      successRate: editingSource?.successRate || 100,
      supportsSearch: formData.supportsSearch,
      requiresAuth: formData.requiresAuth,
    };

    if (editingSource) {
      setSources(sources.map((s) => (s.id === editingSource.id ? newSource : s)));
    } else {
      setSources([...sources, newSource]);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (sourceId: string) => {
    setSources(sources.filter((s) => s.id !== sourceId));
    setDeleteConfirmation(null);
  };

  const toggleActive = (sourceId: string) => {
    setSources(sources.map((s) => (s.id === sourceId ? { ...s, active: !s.active } : s)));
  };

  const getStatusColor = (successRate: number) => {
    if (successRate >= 98) return 'text-green-600';
    if (successRate >= 95) return 'text-amber-600';
    return 'text-red-600';
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime < 200) return 'text-green-600';
    if (responseTime < 400) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-2">Gestion des Sources de Modèles</h3>
          <p className="text-gray-600">
            Configurez les sites web interrogés pour récupérer les modèles 3D
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter une source
        </button>
      </div>

      {/* Sources Grid */}
      <div className="space-y-4">
        {sources
          .sort((a, b) => a.priority - b.priority)
          .map((source) => (
            <div
              key={source.id}
              className={`bg-white border-2 rounded-xl p-6 transition-all ${
                source.active ? 'border-gray-200' : 'border-gray-300 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-gray-900">{source.name}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        Priorité #{source.priority}
                      </span>
                      {!source.active && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                          Inactif
                        </span>
                      )}
                      {source.requiresAuth && (
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded flex items-center gap-1">
                          <Key className="w-3 h-3" />
                          Auth requise
                        </span>
                      )}
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      {source.url}
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditForm(source)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmation(source.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <p className="text-gray-600">Modèles</p>
                  </div>
                  <p className="text-gray-900">{source.modelsCount.toLocaleString()}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className={`w-4 h-4 ${getStatusColor(source.successRate)}`} />
                    <p className="text-gray-600">Succès</p>
                  </div>
                  <p className={`text-gray-900 ${getStatusColor(source.successRate)}`}>
                    {source.successRate}%
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className={`w-4 h-4 ${getResponseTimeColor(source.responseTime)}`} />
                    <p className="text-gray-600">Réponse</p>
                  </div>
                  <p className={`text-gray-900 ${getResponseTimeColor(source.responseTime)}`}>
                    {source.responseTime}ms
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 mb-1">Requêtes</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-full rounded-full"
                        style={{
                          width: `${(source.currentRequests / source.requestsPerDay) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-900 text-sm">
                      {source.currentRequests}/{source.requestsPerDay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Last Sync & Features */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    Dernière synchro: <span className="text-gray-900">{source.lastSync}</span>
                  </span>
                  {source.supportsSearch && (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Recherche
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleActive(source.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    source.active
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {source.active ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingSource ? 'Modifier la source' : 'Ajouter une source'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-gray-900 mb-4">Informations générales</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nom de la source *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Thingiverse, MyMiniFactory..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">URL du site ou API *</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://www.example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Clé API (optionnel)
                    </label>
                    <input
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                      placeholder="•••••••••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-gray-600 mt-2">
                      ⚠️ Les clés API sont stockées de manière sécurisée et chiffrées
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Priorité *</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        placeholder="1"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <p className="text-gray-600 mt-1">1 = priorité maximale</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Quota journalier *</label>
                      <input
                        type="number"
                        min="100"
                        value={formData.requestsPerDay}
                        onChange={(e) =>
                          setFormData({ ...formData, requestsPerDay: e.target.value })
                        }
                        placeholder="5000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <p className="text-gray-600 mt-1">Requêtes/jour</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-gray-900 mb-4">Fonctionnalités</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="supportsSearch"
                      checked={formData.supportsSearch}
                      onChange={(e) =>
                        setFormData({ ...formData, supportsSearch: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="supportsSearch" className="text-gray-700">
                      Supporte la recherche textuelle
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="requiresAuth"
                      checked={formData.requiresAuth}
                      onChange={(e) =>
                        setFormData({ ...formData, requiresAuth: e.target.checked })
                      }
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="requiresAuth" className="text-gray-700">
                      Nécessite une authentification
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="active"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="active" className="text-gray-700">
                      Source active et interrogeable
                    </label>
                  </div>
                </div>
              </div>

              {/* Compliance Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-900 mb-2">⚠️ Respect des conditions d'utilisation</p>
                    <ul className="text-amber-800 space-y-1 list-disc list-inside">
                      <li>Vérifiez les conditions d'utilisation du site source</li>
                      <li>Respectez les quotas API et les limitations de requêtes</li>
                      <li>Assurez la conformité RGPD et le respect des droits d'auteur</li>
                      <li>Ne pas scraper ou surcharger les serveurs sources</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingSource ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <ConfirmDeleteModal
          title="Supprimer la source"
          message="Êtes-vous sûr de vouloir supprimer cette source de modèles ? Les modèles existants provenant de cette source resteront accessibles mais aucune nouvelle synchronisation ne sera effectuée."
          onConfirm={() => handleDelete(deleteConfirmation)}
          onCancel={() => setDeleteConfirmation(null)}
        />
      )}
    </div>
  );
}

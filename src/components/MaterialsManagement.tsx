import { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  DollarSign,
  Image as ImageIcon,
  AlertCircle,
  X,
  Save,
} from 'lucide-react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export interface Material {
  id: string;
  name: string;
  description: string;
  pricePerGram: number;
  color: string;
  stock: number;
  imageUrl?: string;
  properties: {
    temperature: string;
    bedTemperature: string;
    strength: string;
    flexibility: string;
  };
  active: boolean;
}

interface MaterialFormData {
  name: string;
  description: string;
  pricePerGram: string;
  color: string;
  stock: string;
  imageUrl: string;
  temperature: string;
  bedTemperature: string;
  strength: string;
  flexibility: string;
  active: boolean;
}

export function MaterialsManagement() {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'PLA',
      description: 'Acide polylactique - Biodégradable, facile à imprimer',
      pricePerGram: 0.025,
      color: '#3B82F6',
      stock: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1615445176367-d4507b773f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      properties: {
        temperature: '200-220°C',
        bedTemperature: '60°C',
        strength: 'Moyenne',
        flexibility: 'Rigide',
      },
      active: true,
    },
    {
      id: '2',
      name: 'PETG',
      description: 'Polyéthylène téréphtalate glycolisé - Résistant et durable',
      pricePerGram: 0.030,
      color: '#8B5CF6',
      stock: 10000,
      imageUrl: 'https://images.unsplash.com/photo-1625225233840-695456021cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      properties: {
        temperature: '230-250°C',
        bedTemperature: '80°C',
        strength: 'Haute',
        flexibility: 'Semi-flexible',
      },
      active: true,
    },
    {
      id: '3',
      name: 'ABS',
      description: 'Acrylonitrile butadiène styrène - Très résistant',
      pricePerGram: 0.028,
      color: '#EF4444',
      stock: 8000,
      imageUrl: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      properties: {
        temperature: '230-260°C',
        bedTemperature: '100°C',
        strength: 'Très haute',
        flexibility: 'Rigide',
      },
      active: true,
    },
    {
      id: '4',
      name: 'TPU',
      description: 'Polyuréthane thermoplastique - Flexible et élastique',
      pricePerGram: 0.045,
      color: '#10B981',
      stock: 5000,
      imageUrl: 'https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
      properties: {
        temperature: '210-230°C',
        bedTemperature: '60°C',
        strength: 'Moyenne',
        flexibility: 'Très flexible',
      },
      active: true,
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    description: '',
    pricePerGram: '',
    color: '#3B82F6',
    stock: '',
    imageUrl: '',
    temperature: '',
    bedTemperature: '',
    strength: 'Moyenne',
    flexibility: 'Rigide',
    active: true,
  });

  const openAddForm = () => {
    setEditingMaterial(null);
    setFormData({
      name: '',
      description: '',
      pricePerGram: '',
      color: '#3B82F6',
      stock: '',
      imageUrl: '',
      temperature: '',
      bedTemperature: '',
      strength: 'Moyenne',
      flexibility: 'Rigide',
      active: true,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (material: Material) => {
    setEditingMaterial(material);
    setFormData({
      name: material.name,
      description: material.description,
      pricePerGram: material.pricePerGram.toString(),
      color: material.color,
      stock: material.stock.toString(),
      imageUrl: material.imageUrl || '',
      temperature: material.properties.temperature,
      bedTemperature: material.properties.bedTemperature,
      strength: material.properties.strength,
      flexibility: material.properties.flexibility,
      active: material.active,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMaterial: Material = {
      id: editingMaterial?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      pricePerGram: parseFloat(formData.pricePerGram),
      color: formData.color,
      stock: parseInt(formData.stock),
      imageUrl: formData.imageUrl || undefined,
      properties: {
        temperature: formData.temperature,
        bedTemperature: formData.bedTemperature,
        strength: formData.strength,
        flexibility: formData.flexibility,
      },
      active: formData.active,
    };

    if (editingMaterial) {
      setMaterials(materials.map((m) => (m.id === editingMaterial.id ? newMaterial : m)));
    } else {
      setMaterials([...materials, newMaterial]);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (materialId: string) => {
    setMaterials(materials.filter((m) => m.id !== materialId));
    setDeleteConfirmation(null);
  };

  const toggleActive = (materialId: string) => {
    setMaterials(
      materials.map((m) => (m.id === materialId ? { ...m, active: !m.active } : m))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-2">Gestion des Matériaux</h3>
          <p className="text-gray-600">
            Configurez les matériaux disponibles pour l'impression
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Ajouter un matériau
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className={`bg-white border-2 rounded-xl p-6 transition-all ${
              material.active ? 'border-gray-200' : 'border-gray-300 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {material.imageUrl ? (
                  <img
                    src={material.imageUrl}
                    alt={material.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: material.color + '20' }}
                  >
                    <Package className="w-8 h-8" style={{ color: material.color }} />
                  </div>
                )}
                <div>
                  <h4 className="text-gray-900 flex items-center gap-2">
                    {material.name}
                    {!material.active && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                        Inactif
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600">{material.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditForm(material)}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmation(material.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Prix/gramme
                </p>
                <p className="text-gray-900">{material.pricePerGram.toFixed(3)} €</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Stock
                </p>
                <p className="text-gray-900">{material.stock}g</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-gray-900 mb-2">Propriétés d'impression</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Buse: </span>
                  <span className="text-gray-900">{material.properties.temperature}</span>
                </div>
                <div>
                  <span className="text-gray-600">Plateau: </span>
                  <span className="text-gray-900">{material.properties.bedTemperature}</span>
                </div>
                <div>
                  <span className="text-gray-600">Résistance: </span>
                  <span className="text-gray-900">{material.properties.strength}</span>
                </div>
                <div>
                  <span className="text-gray-600">Flexibilité: </span>
                  <span className="text-gray-900">{material.properties.flexibility}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleActive(material.id)}
              className={`w-full py-2 rounded-lg transition-colors ${
                material.active
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {material.active ? 'Désactiver' : 'Activer'}
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-gray-900">
                {editingMaterial ? 'Modifier le matériau' : 'Ajouter un matériau'}
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
                    <label className="block text-gray-700 mb-2">Nom du matériau *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: PLA, PETG, ABS..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Décrivez les caractéristiques du matériau..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Prix par gramme (€) *</label>
                      <input
                        type="number"
                        step="0.001"
                        value={formData.pricePerGram}
                        onChange={(e) => setFormData({ ...formData, pricePerGram: e.target.value })}
                        placeholder="0.025"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Stock disponible (g) *</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="15000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Couleur d'affichage</label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">
                      <ImageIcon className="w-4 h-4 inline mr-2" />
                      Image URL (optionnel)
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-gray-600 mt-2">
                      ⚠️ Utilisez uniquement des images libres de droits (Unsplash, Pexels, Pixabay)
                    </p>
                  </div>
                </div>
              </div>

              {/* Printing Properties */}
              <div>
                <h4 className="text-gray-900 mb-4">Propriétés d'impression</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Température buse *</label>
                      <input
                        type="text"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                        placeholder="200-220°C"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Température plateau *</label>
                      <input
                        type="text"
                        value={formData.bedTemperature}
                        onChange={(e) => setFormData({ ...formData, bedTemperature: e.target.value })}
                        placeholder="60°C"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Résistance</label>
                      <select
                        value={formData.strength}
                        onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Faible">Faible</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Haute">Haute</option>
                        <option value="Très haute">Très haute</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Flexibilité</label>
                      <select
                        value={formData.flexibility}
                        onChange={(e) => setFormData({ ...formData, flexibility: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Rigide">Rigide</option>
                        <option value="Semi-flexible">Semi-flexible</option>
                        <option value="Flexible">Flexible</option>
                        <option value="Très flexible">Très flexible</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="active" className="text-gray-700">
                  Matériau actif et disponible
                </label>
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
                  {editingMaterial ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmation && (
        <ConfirmDeleteModal
          title="Supprimer le matériau"
          message="Êtes-vous sûr de vouloir supprimer ce matériau ? Cette action est irréversible. Les commandes en cours utilisant ce matériau ne seront pas affectées."
          onConfirm={() => handleDelete(deleteConfirmation)}
          onCancel={() => setDeleteConfirmation(null)}
        />
      )}
    </div>
  );
}

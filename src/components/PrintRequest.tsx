import { useState } from 'react';
import { ArrowLeft, Package, Palette, Ruler, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { Model3D } from '../App';
import { Navigation } from './Navigation';
import { MaterialHelpTooltip } from './MaterialHelpTooltip';

interface PrintRequestProps {
  model: Model3D;
  onBack: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
}

export function PrintRequest({ model, onBack, onLogout, onGoToProfile, onGoToAdmin }: PrintRequestProps) {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    material: 'PLA',
    color: 'white',
    quantity: 1,
    infill: '20',
    customSize: false,
    width: '',
    height: '',
    depth: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const estimatedPrice = 24.99 * formData.quantity;
  const estimatedDelivery = '5-7 jours ouvrables';

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">{/* Removed bg-gray-50 */}
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-4">
              Demande d'impression envoyée !
            </h2>
            <p className="text-gray-600 mb-8">
              Votre demande d'impression pour <strong>{model.name}</strong> a été reçue avec succès.
              Vous recevrez une confirmation par email dans les prochaines minutes.
            </p>
            
            <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-gray-900 mb-4">Récapitulatif de la commande</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Modèle</span>
                  <span className="text-gray-900">{model.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Matériau</span>
                  <span className="text-gray-900">{formData.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Couleur</span>
                  <span className="text-gray-900">{formData.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantité</span>
                  <span className="text-gray-900">{formData.quantity}</span>
                </div>
                <div className="border-t border-indigo-200 pt-2 mt-2 flex justify-between">
                  <span className="text-gray-900">Prix total estimé</span>
                  <span className="text-gray-900">{estimatedPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison estimée</span>
                  <span className="text-gray-900">{estimatedDelivery}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBack}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Faire une nouvelle recherche
              </button>
              <button
                onClick={onLogout}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">{/* Removed bg-gray-50 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">{/* Added backdrop-blur-sm and changed to bg-white/90 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Retour</span>
            </button>
            <Navigation
              onLogout={onLogout}
              onGoToProfile={onGoToProfile}
              onGoToAdmin={onGoToAdmin}
            />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-8">Demande d'impression</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-gray-900">Paramètres d'impression</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      Matériau *
                      <MaterialHelpTooltip />
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="PLA">PLA (Standard)</option>
                      <option value="PETG">PETG (Résistant)</option>
                      <option value="ABS">ABS (Durable)</option>
                      <option value="TPU">TPU (Flexible)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Couleur *</label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="white">Blanc</option>
                      <option value="black">Noir</option>
                      <option value="red">Rouge</option>
                      <option value="blue">Bleu</option>
                      <option value="green">Vert</option>
                      <option value="yellow">Jaune</option>
                      <option value="custom">Personnalisé</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Quantité *</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Remplissage (%)</label>
                    <select
                      value={formData.infill}
                      onChange={(e) => setFormData({ ...formData, infill: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="15">15% (Léger)</option>
                      <option value="20">20% (Standard)</option>
                      <option value="30">30% (Renforcé)</option>
                      <option value="50">50% (Très solide)</option>
                      <option value="100">100% (Plein)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.customSize}
                      onChange={(e) => setFormData({ ...formData, customSize: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700">Taille personnalisée</span>
                  </label>
                </div>

                {formData.customSize && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Largeur (mm)</label>
                      <input
                        type="number"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="120"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Hauteur (mm)</label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Profondeur (mm)</label>
                      <input
                        type="number"
                        value={formData.depth}
                        onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="85"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-gray-900">Adresse de livraison</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Adresse complète *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Rue de la République"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Ville *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Paris"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Code postal *</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="75001"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-gray-900 mb-4">Notes supplémentaires</h2>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Instructions spéciales, préférences de livraison..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Confirmer la demande
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <h3 className="text-gray-900 mb-4">Récapitulatif</h3>
              
              <div className="mb-6">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <p className="text-gray-900">{model.name}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Matériau:</span>
                  <span>{formData.material}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Couleur:</span>
                  <span className="capitalize">{formData.color}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Quantité:</span>
                  <span>{formData.quantity}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Remplissage:</span>
                  <span>{formData.infill}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix unitaire estimé:</span>
                  <span className="text-gray-900">24,99 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total estimé:</span>
                  <span className="text-gray-900">{estimatedPrice.toFixed(2)} €</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-gray-600">
                    Livraison: {estimatedDelivery}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-900">
                  💡 Le prix final sera confirmé après analyse complète du modèle
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
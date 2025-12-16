import { X, Package, Clock, User, Mail, MapPin, Palette } from 'lucide-react';

interface PrintDetail {
  id: string;
  userName: string;
  userEmail: string;
  modelName: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'printing' | 'completed' | 'cancelled';
  date: string;
  material: string;
  color?: string;
  quantity: number;
  price: number;
  estimatedTime: string;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  notes?: string;
}

interface PrintDetailModalProps {
  print: PrintDetail;
  onClose: () => void;
  onStatusChange?: (newStatus: PrintDetail['status']) => void;
  isAdmin?: boolean;
}

export function PrintDetailModal({ print, onClose, onStatusChange, isAdmin }: PrintDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-gray-900">Détails de l'impression</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Model Info */}
          <div className="flex gap-4">
            <img
              src={print.imageUrl}
              alt={print.modelName}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 mb-2">{print.modelName}</h3>
              <p className="text-gray-600 mb-2">Commande #{print.id}</p>
              <p className="text-gray-600">Date: {print.date}</p>
            </div>
          </div>

          {/* Status Change (Admin only) */}
          {isAdmin && onStatusChange && (
            <div className="bg-indigo-50 rounded-xl p-4">
              <label className="block text-gray-900 mb-3">Statut de la commande</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['pending', 'approved', 'printing', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => onStatusChange(status as PrintDetail['status'])}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      print.status === status
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-indigo-100'
                    }`}
                  >
                    {status === 'pending' && 'En attente'}
                    {status === 'approved' && 'Approuvée'}
                    {status === 'printing' && 'En cours'}
                    {status === 'completed' && 'Terminée'}
                    {status === 'cancelled' && 'Annulée'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations client
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">Nom</p>
                  <p className="text-gray-900">{print.userName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-gray-900">{print.userEmail}</p>
                </div>
              </div>
              {print.phone && (
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Téléphone</p>
                    <p className="text-gray-900">{print.phone}</p>
                  </div>
                </div>
              )}
              {print.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-600">Adresse de livraison</p>
                    <p className="text-gray-900">
                      {print.address}
                      <br />
                      {print.postalCode} {print.city}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Print Details */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Détails de l'impression
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Matériau</p>
                <p className="text-gray-900">{print.material}</p>
              </div>
              {print.color && (
                <div>
                  <p className="text-gray-600">Couleur</p>
                  <p className="text-gray-900 capitalize">{print.color}</p>
                </div>
              )}
              <div>
                <p className="text-gray-600">Quantité</p>
                <p className="text-gray-900">{print.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Temps estimé</p>
                <p className="text-gray-900">{print.estimatedTime}</p>
              </div>
              <div>
                <p className="text-gray-600">Prix unitaire</p>
                <p className="text-gray-900">{print.price.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-gray-600">Prix total</p>
                <p className="text-gray-900">{(print.price * print.quantity).toFixed(2)} €</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {print.notes && (
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-gray-900 mb-2">Notes</h3>
              <p className="text-gray-700">{print.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6">
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

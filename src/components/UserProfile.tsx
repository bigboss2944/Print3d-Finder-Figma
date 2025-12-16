import { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
} from 'lucide-react';
import { PrintDetailModal } from './PrintDetailModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface UserProfileProps {
  onBack: () => void;
  onLogout: () => void;
}

interface Order {
  id: string;
  modelName: string;
  imageUrl: string;
  status: 'pending' | 'printing' | 'completed' | 'cancelled';
  date: string;
  price: number;
  quantity: number;
  material: string;
  color?: string;
  userEmail?: string;
  userName?: string;
}

export function UserProfile({ onBack, onLogout }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      modelName: 'Vase Géométrique Moderne',
      imageUrl: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB2YXNlfGVufDF8fHx8MTc2NTQ0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'completed',
      date: '2024-12-05',
      price: 24.99,
      quantity: 1,
      material: 'PLA',
      color: 'white',
      userName: 'Jean Dupont',
      userEmail: 'jean.dupont@email.com',
    },
    {
      id: '2',
      modelName: 'Support Téléphone Ajustable',
      imageUrl: 'https://images.unsplash.com/photo-1601220363009-f7e66d095649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwaG9uZSUyMHN0YW5kfGVufDF8fHx8MTc2NTQ0ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'printing',
      date: '2024-12-08',
      price: 19.99,
      quantity: 2,
      material: 'PETG',
      color: 'black',
      userName: 'Jean Dupont',
      userEmail: 'jean.dupont@email.com',
    },
    {
      id: '3',
      modelName: 'Figurine Dragon Articulé',
      imageUrl: 'https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkcmFnb258ZW58MXx8fHwxNzY1NDQ4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'pending',
      date: '2024-12-10',
      price: 34.99,
      quantity: 1,
      material: 'ABS',
      color: 'red',
      userName: 'Jean Dupont',
      userEmail: 'jean.dupont@email.com',
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'orders' | 'account';
    ids?: string[];
  } | null>(null);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Terminée</span>
          </span>
        );
      case 'printing':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">En cours</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">En attente</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full">
            <XCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Annulée</span>
          </span>
        );
    }
  };

  const handleDeleteOrders = (orderIds: string[]) => {
    setDeleteConfirmation({
      type: 'orders',
      ids: orderIds,
    });
  };

  const handleDeleteAccount = () => {
    setDeleteConfirmation({
      type: 'account',
    });
  };

  const confirmDelete = () => {
    if (deleteConfirmation?.type === 'orders' && deleteConfirmation.ids) {
      setOrders(orders.filter((order) => !deleteConfirmation.ids!.includes(order.id)));
      setSelectedOrders([]);
    } else if (deleteConfirmation?.type === 'account') {
      // Simulate account deletion - in reality would call API and logout
      alert('Votre compte a été supprimé');
      onLogout();
    }
    setDeleteConfirmation(null);
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  return (
    <div className="min-h-screen">{/* Removed bg-gray-50 */}
      {/* Header */}
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
            <h1 className="text-gray-900">Mon Profil</h1>
            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGF2YXRhcnxlbnwxfHx8fDE3NjU0MDUwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-gray-900 mb-1">Jean Dupont</h2>
                <p className="text-gray-600">Client depuis Nov 2024</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Mes commandes</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Paramètres</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-gray-900">{orders.length}</p>
                    <p className="text-gray-600">Commandes</p>
                  </div>
                  <div>
                    <p className="text-gray-900">
                      {orders.filter((o) => o.status === 'completed').length}
                    </p>
                    <p className="text-gray-600">Terminées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Historique des commandes</h2>
                  {selectedOrders.length > 0 && (
                    <button
                      onClick={() => handleDeleteOrders(selectedOrders)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Supprimer ({selectedOrders.length})</span>
                      <span className="sm:hidden">({selectedOrders.length})</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex gap-4">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 pt-1">
                            <input
                              type="checkbox"
                              checked={selectedOrders.includes(order.id)}
                              onChange={() => toggleOrderSelection(order.id)}
                              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-4">
                            {/* Image */}
                            <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={order.imageUrl}
                                alt={order.modelName}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-gray-900 truncate mb-1">
                                    {order.modelName}
                                  </h3>
                                  <p className="text-gray-600">
                                    Commande #{order.id} • {order.date}
                                  </p>
                                </div>
                                {getStatusBadge(order.status)}
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                                <div>
                                  <p className="text-gray-600">Matériau</p>
                                  <p className="text-gray-900">{order.material}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Quantité</p>
                                  <p className="text-gray-900">{order.quantity}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Prix</p>
                                  <p className="text-gray-900">{order.price.toFixed(2)} €</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total</p>
                                  <p className="text-gray-900">
                                    {(order.price * order.quantity).toFixed(2)} €
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                  onClick={() => setSelectedOrder(order)}
                                  className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Eye className="w-4 h-4" />
                                  <span>Voir détails</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteOrders([order.id])}
                                  className="flex-1 sm:flex-none px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Supprimer</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900">Paramètres du compte</h2>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <h3 className="text-gray-900 mb-4">Informations personnelles</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                          <User className="w-4 h-4" />
                          Nom complet
                        </label>
                        <input
                          type="text"
                          defaultValue="Jean Dupont"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="jean.dupont@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                          <Phone className="w-4 h-4" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+33 6 12 34 56 78"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                    <h3 className="text-gray-900 mb-4">Adresse de livraison</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2 text-gray-700 mb-2">
                          <MapPin className="w-4 h-4" />
                          Adresse complète
                        </label>
                        <input
                          type="text"
                          defaultValue="123 Rue de la République"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Ville</label>
                          <input
                            type="text"
                            defaultValue="Paris"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">Code postal</label>
                          <input
                            type="text"
                            defaultValue="75001"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors">
                    Enregistrer les modifications
                  </button>

                  {/* Danger Zone */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
                    <h3 className="text-red-900 mb-2">Zone dangereuse</h3>
                    <p className="text-red-700 mb-4">
                      Une fois votre compte supprimé, toutes vos données seront définitivement
                      effacées. Cette action est irréversible.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer mon compte</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedOrder && (
        <PrintDetailModal
          print={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {deleteConfirmation && (
        <ConfirmDeleteModal
          title={
            deleteConfirmation.type === 'orders'
              ? 'Supprimer les commandes'
              : 'Supprimer le compte'
          }
          message={
            deleteConfirmation.type === 'orders'
              ? 'Êtes-vous sûr de vouloir supprimer ces commandes ? Cette action est irréversible.'
              : 'Êtes-vous sûr de vouloir supprimer votre compte ? Toutes vos données seront définitivement effacées.'
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          itemCount={deleteConfirmation.ids?.length}
        />
      )}
    </div>
  );
}
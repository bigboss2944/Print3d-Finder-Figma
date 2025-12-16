import { useState } from 'react';
import {
  ArrowLeft,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  MoreVertical,
  Trash2,
  Eye,
} from 'lucide-react';
import { PrintDetailModal } from './PrintDetailModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
}

interface PrintRequest {
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

interface UserAccount {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  status: 'active' | 'inactive';
}

export function AdminDashboard({ onBack, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'stats'>('requests');
  const [filterStatus, setFilterStatus] = useState<'all' | PrintRequest['status']>('all');
  const [requests, setRequests] = useState<PrintRequest[]>([
    {
      id: '001',
      userName: 'Marie Laurent',
      userEmail: 'marie.laurent@email.com',
      modelName: 'Support Casque Audio',
      imageUrl: 'https://images.unsplash.com/photo-1615445176367-d4507b773f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBoZWFkcGhvbmUlMjBzdGFuZHxlbnwxfHx8fDE3NjU0NDgxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'pending',
      date: '2024-12-11',
      material: 'PLA',
      color: 'black',
      quantity: 1,
      price: 19.99,
      estimatedTime: '4h 30min',
      address: '15 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      phone: '+33 6 11 22 33 44',
    },
    {
      id: '002',
      userName: 'Thomas Bernard',
      userEmail: 'thomas.b@email.com',
      modelName: 'Vase Géométrique Moderne',
      imageUrl: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB2YXNlfGVufDF8fHx8MTc2NTQ0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'printing',
      date: '2024-12-10',
      material: 'PETG',
      color: 'white',
      quantity: 2,
      price: 24.99,
      estimatedTime: '6h 24min',
      address: '8 Rue Victor Hugo',
      city: 'Marseille',
      postalCode: '13001',
      phone: '+33 6 22 33 44 55',
    },
    {
      id: '003',
      userName: 'Sophie Dubois',
      userEmail: 'sophie.dubois@email.com',
      modelName: 'Figurine Dragon Articulé',
      imageUrl: 'https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkcmFnb258ZW58MXx8fHwxNzY1NDQ4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'approved',
      date: '2024-12-10',
      material: 'ABS',
      color: 'red',
      quantity: 1,
      price: 34.99,
      estimatedTime: '8h 15min',
      address: '23 Boulevard Haussmann',
      city: 'Paris',
      postalCode: '75009',
      phone: '+33 6 33 44 55 66',
    },
    {
      id: '004',
      userName: 'Lucas Martin',
      userEmail: 'lucas.m@email.com',
      modelName: 'Support Téléphone Ajustable',
      imageUrl: 'https://images.unsplash.com/photo-1601220363009-f7e66d095649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwaG9uZSUyMHN0YW5kfGVufDF8fHx8MTc2NTQ0ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'completed',
      date: '2024-12-08',
      material: 'PLA',
      color: 'blue',
      quantity: 3,
      price: 16.99,
      estimatedTime: '3h 45min',
      address: '42 Rue de la Liberté',
      city: 'Toulouse',
      postalCode: '31000',
      phone: '+33 6 44 55 66 77',
    },
  ]);

  const [users, setUsers] = useState<UserAccount[]>([
    {
      id: 'U001',
      name: 'Marie Laurent',
      email: 'marie.laurent@email.com',
      joinDate: '2024-10-15',
      totalOrders: 5,
      status: 'active',
    },
    {
      id: 'U002',
      name: 'Thomas Bernard',
      email: 'thomas.b@email.com',
      joinDate: '2024-09-20',
      totalOrders: 12,
      status: 'active',
    },
    {
      id: 'U003',
      name: 'Sophie Dubois',
      email: 'sophie.dubois@email.com',
      joinDate: '2024-11-01',
      totalOrders: 3,
      status: 'active',
    },
    {
      id: 'U004',
      name: 'Lucas Martin',
      email: 'lucas.m@email.com',
      joinDate: '2024-08-10',
      totalOrders: 18,
      status: 'active',
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<PrintRequest | null>(null);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'requests' | 'users';
    ids: string[];
  } | null>(null);

  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter((r) => r.status === 'pending').length,
    completedThisMonth: requests.filter((r) => r.status === 'completed').length,
    revenue: requests.reduce((sum, r) => sum + r.price * r.quantity, 0),
    activeUsers: users.filter((u) => u.status === 'active').length,
    avgCompletionTime: '5h 30min',
  };

  const getStatusBadge = (status: PrintRequest['status']) => {
    const configs = {
      pending: { color: 'amber', icon: Clock, label: 'En attente' },
      approved: { color: 'blue', icon: CheckCircle, label: 'Approuvée' },
      printing: { color: 'purple', icon: Package, label: 'En cours' },
      completed: { color: 'green', icon: CheckCircle, label: 'Terminée' },
      cancelled: { color: 'red', icon: XCircle, label: 'Annulée' },
    };

    const config = configs[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 bg-${config.color}-100 text-${config.color}-700 rounded-full text-sm`}>
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline">{config.label}</span>
      </span>
    );
  };

  const filteredRequests =
    filterStatus === 'all'
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  const handleStatusChange = (requestId: string, newStatus: PrintRequest['status']) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req))
    );
    setSelectedRequest((prev) => (prev && prev.id === requestId ? { ...prev, status: newStatus } : prev));
  };

  const handleDeleteRequests = (requestIds: string[]) => {
    setDeleteConfirmation({
      type: 'requests',
      ids: requestIds,
    });
  };

  const handleDeleteUsers = (userIds: string[]) => {
    setDeleteConfirmation({
      type: 'users',
      ids: userIds,
    });
  };

  const confirmDelete = () => {
    if (!deleteConfirmation) return;

    if (deleteConfirmation.type === 'requests') {
      setRequests(requests.filter((r) => !deleteConfirmation.ids.includes(r.id)));
      setSelectedRequests([]);
    } else if (deleteConfirmation.type === 'users') {
      setUsers(users.filter((u) => !deleteConfirmation.ids.includes(u.id)));
      setSelectedUsers([]);
    }
    setDeleteConfirmation(null);
  };

  const toggleRequestSelection = (requestId: string) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId]
    );
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
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
            <h1 className="text-gray-900">Tableau de bord Admin</h1>
            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Demandes</p>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-900">{stats.totalRequests}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">En attente</p>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-900">{stats.pendingRequests}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Ce mois</p>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-900">{stats.completedThisMonth}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <p className="text-gray-600 text-sm sm:text-base">Revenus</p>
            </div>
            <p className="text-2xl sm:text-3xl text-gray-900">{stats.revenue.toFixed(0)} €</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'requests'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Demandes
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Utilisateurs
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'stats'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Statistiques
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'requests' && (
              <div>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                      className="px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="all">Tous</option>
                      <option value="pending">En attente</option>
                      <option value="approved">Approuvée</option>
                      <option value="printing">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                    {selectedRequests.length > 0 && (
                      <button
                        onClick={() => handleDeleteRequests(selectedRequests)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">({selectedRequests.length})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Requests Cards - Mobile/Tablet/Desktop */}
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <input
                            type="checkbox"
                            checked={selectedRequests.includes(request.id)}
                            onChange={() => toggleRequestSelection(request.id)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={request.imageUrl}
                              alt={request.modelName}
                              className="w-16 h-16 rounded object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-gray-900 line-clamp-2">
                                  {request.modelName}
                                </h3>
                                {getStatusBadge(request.status)}
                              </div>
                              <p className="text-gray-600">#{request.id} • {request.date}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                            <div>
                              <p className="text-gray-600">Client</p>
                              <p className="text-gray-900">{request.userName}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Matériau</p>
                              <p className="text-gray-900">{request.material}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Quantité</p>
                              <p className="text-gray-900">{request.quantity}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Prix total</p>
                              <p className="text-gray-900">
                                {(request.price * request.quantity).toFixed(2)} €
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => setSelectedRequest(request)}
                              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>Voir détails</span>
                            </button>
                            <button
                              onClick={() => handleDeleteRequests([request.id])}
                              className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900">Liste des utilisateurs</h3>
                  {selectedUsers.length > 0 && (
                    <button
                      onClick={() => handleDeleteUsers(selectedUsers)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Supprimer ({selectedUsers.length})</span>
                      <span className="sm:hidden">({selectedUsers.length})</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="grid sm:grid-cols-4 gap-3 mb-3">
                            <div>
                              <p className="text-gray-600">Nom</p>
                              <p className="text-gray-900">{user.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Email</p>
                              <p className="text-gray-900">{user.email}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Date d'inscription</p>
                              <p className="text-gray-900">{user.joinDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Commandes</p>
                              <p className="text-gray-900">{user.totalOrders}</p>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteUsers([user.id])}
                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer l'utilisateur</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-8 h-8 text-indigo-600" />
                      <h3 className="text-gray-900">Performance</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-600 mb-1">Taux de complétion</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-indigo-600 h-full" style={{ width: '85%' }}></div>
                          </div>
                          <span className="text-gray-900">85%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Satisfaction client</p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                            <div className="bg-green-600 h-full" style={{ width: '92%' }}></div>
                          </div>
                          <span className="text-gray-900">92%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-8 h-8 text-green-600" />
                      <h3 className="text-gray-900">Temps moyen</h3>
                    </div>
                    <p className="text-3xl text-gray-900 mb-2">{stats.avgCompletionTime}</p>
                    <p className="text-gray-600">Par impression</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-gray-900 mb-4">Matériaux les plus utilisés</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">PLA</span>
                      <div className="flex items-center gap-3 flex-1 max-w-xs">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-600 h-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-gray-900 w-12 text-right">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">PETG</span>
                      <div className="flex items-center gap-3 flex-1 max-w-xs">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-purple-600 h-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-gray-900 w-12 text-right">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">ABS</span>
                      <div className="flex items-center gap-3 flex-1 max-w-xs">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-gray-900 w-12 text-right">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedRequest && (
        <PrintDetailModal
          print={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={(newStatus) => handleStatusChange(selectedRequest.id, newStatus)}
          isAdmin={true}
        />
      )}

      {deleteConfirmation && (
        <ConfirmDeleteModal
          title={
            deleteConfirmation.type === 'requests'
              ? 'Supprimer les demandes'
              : 'Supprimer les utilisateurs'
          }
          message={
            deleteConfirmation.type === 'requests'
              ? 'Êtes-vous sûr de vouloir supprimer ces demandes d\'impression ? Cette action est irréversible.'
              : 'Êtes-vous sûr de vouloir supprimer ces comptes utilisateurs ? Toutes leurs données seront définitivement effacées.'
          }
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          itemCount={deleteConfirmation.ids.length}
        />
      )}
    </div>
  );
}
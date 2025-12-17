import { Star, Download, ArrowLeft, Filter } from 'lucide-react';
import { Model3D } from '../App';
import { Navigation } from './Navigation';

interface SearchResultsProps {
  onSelectModel: (model: Model3D) => void;
  onBack: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
}

const mockModels: Model3D[] = [
  {
    id: '1',
    name: 'Vase Géométrique Moderne',
    description: 'Vase décoratif avec motifs géométriques, parfait pour petites plantes',
    imageUrl: 'https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB2YXNlfGVufDF8fHx8MTc2NTQ0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Décoration',
    rating: 4.8,
    downloads: 1243,
    author: 'Marie Dubois',
  },
  {
    id: '2',
    name: 'Figurine Dragon Articulé',
    description: 'Dragon avec articulations mobiles, impression en plusieurs parties',
    imageUrl: 'https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkcmFnb258ZW58MXx8fHwxNzY1NDQ4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Jouets',
    rating: 4.9,
    downloads: 2847,
    author: 'Jean-Luc Artisan3D',
  },
  {
    id: '3',
    name: 'Support Téléphone Ajustable',
    description: 'Support ergonomique avec angle ajustable pour bureau',
    imageUrl: 'https://images.unsplash.com/photo-1601220363009-f7e66d095649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwaG9uZSUyMHN0YW5kfGVufDF8fHx8MTc2NTQ0ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Utilitaire',
    rating: 4.7,
    downloads: 3421,
    author: 'TechMaker Studio',
  },
  {
    id: '4',
    name: 'Puzzle Mécanique 3D',
    description: 'Puzzle complexe avec mécanismes mobiles',
    imageUrl: 'https://images.unsplash.com/photo-1740625942947-26caf3a16d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB0b3l8ZW58MXx8fHwxNzY1NDQ4MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Jouets',
    rating: 4.6,
    downloads: 1876,
    author: 'Sophie Martin',
  },
  {
    id: '5',
    name: 'Organisateur de Bureau',
    description: 'Organisateur modulaire pour fournitures de bureau',
    imageUrl: 'https://images.unsplash.com/photo-1625225233840-695456021cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZXNrJTIwb3JnYW5pemVyfGVufDF8fHx8MTc2NTQ0ODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Utilitaire',
    rating: 4.5,
    downloads: 2134,
    author: 'OfficeDesigns Pro',
  },
  {
    id: '6',
    name: 'Porte-clés Personnalisé',
    description: 'Porte-clés avec texte personnalisable',
    imageUrl: 'https://images.unsplash.com/photo-1659264792008-eb4757c9c8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NjU0NDgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Mode',
    rating: 4.3,
    downloads: 5632,
    author: 'CustomCreations',
  },
];

export function SearchResults({ onSelectModel, onBack, onLogout, onGoToProfile, onGoToAdmin }: SearchResultsProps) {
  return (
    <div className="min-h-screen">{/* Removed bg-gray-50 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">{/* Added backdrop-blur-sm and changed to bg-white/90 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Retour</span>
              </button>
              <h1 className="text-gray-900 text-base sm:text-xl">Résultats</h1>
            </div>
            <Navigation
              onLogout={onLogout}
              onGoToProfile={onGoToProfile}
              onGoToAdmin={onGoToAdmin}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span>{mockModels.length} modèles trouvés</span>
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Filtres</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockModels.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900 flex-1 line-clamp-2">
                    {model.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm whitespace-nowrap">
                    {model.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {model.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{model.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Download className="w-4 h-4" />
                    <span>{model.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
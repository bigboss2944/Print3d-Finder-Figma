import { useMemo, useState } from "react";
import {
  Star,
  Download,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { Model3D } from "../App";
import { Navigation } from "./Navigation";

interface SearchResultsProps {
  onSelectModel: (model: Model3D) => void;
  onBack: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
  onGoToSearch?: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchSubmit: () => void;
}

interface PrintRequestProps {
  model: Model3D;
  onBack: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
  onGoToSearch?: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchSubmit: () => void;
}

const mockModels: Model3D[] = [
  {
    id: "1",
    name: "Vase Géométrique Moderne",
    description:
      "Vase décoratif avec motifs géométriques, parfait pour petites plantes",
    imageUrl:
      "https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB2YXNlfGVufDF8fHx8MTc2NTQ0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Décoration",
    rating: 4.8,
    downloads: 1243,
  },
  {
    id: "2",
    name: "Figurine Dragon Articulé",
    description:
      "Dragon avec articulations mobiles, impression en plusieurs parties",
    imageUrl:
      "https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkcmFnb258ZW58MXx8fHwxNzY1NDQ4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Jouets",
    rating: 4.9,
    downloads: 2847,
  },
  {
    id: "3",
    name: "Support Téléphone Ajustable",
    description:
      "Support ergonomique avec angle ajustable pour bureau",
    imageUrl:
      "https://images.unsplash.com/photo-1601220363009-f7e66d095649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwaG9uZSUyMHN0YW5kfGVufDF8fHx8MTc2NTQ0ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Utilitaire",
    rating: 4.7,
    downloads: 3421,
  },
  {
    id: "4",
    name: "Puzzle Mécanique 3D",
    description: "Puzzle complexe avec mécanismes mobiles",
    imageUrl:
      "https://images.unsplash.com/photo-1740625942947-26caf3a16d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB0b3l8ZW58MXx8fHwxNzY1NDQ4MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Jouets",
    rating: 4.6,
    downloads: 1876,
  },
  {
    id: "5",
    name: "Organisateur de Bureau",
    description:
      "Organisateur modulaire pour fournitures de bureau",
    imageUrl:
      "https://images.unsplash.com/photo-1625225233840-695456021cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZXNrJTIwb3JnYW5pemVyfGVufDF8fHx8MTc2NTQ0ODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Utilitaire",
    rating: 4.5,
    downloads: 2134,
  },
  {
    id: "6",
    name: "Porte-clés Personnalisé",
    description: "Porte-clés avec texte personnalisable",
    imageUrl:
      "https://images.unsplash.com/photo-1659264792008-eb4757c9c8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NjU0NDgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mode",
    rating: 4.3,
    downloads: 5632,
  },
  {
    id: "7",
    name: "Vase Géométrique Moderne",
    description:
      "Vase décoratif avec motifs géométriques, parfait pour petites plantes",
    imageUrl:
      "https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB2YXNlfGVufDF8fHx8MTc2NTQ0ODEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Décoration",
    rating: 4.8,
    downloads: 1243,
  },
  {
    id: "8",
    name: "Figurine Dragon Articulé",
    description:
      "Dragon avec articulations mobiles, impression en plusieurs parties",
    imageUrl:
      "https://images.unsplash.com/photo-1741177479787-f6c63266af14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkcmFnb258ZW58MXx8fHwxNzY1NDQ4MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Jouets",
    rating: 4.9,
    downloads: 2847,
  },
  {
    id: "9",
    name: "Support Téléphone Ajustable",
    description:
      "Support ergonomique avec angle ajustable pour bureau",
    imageUrl:
      "https://images.unsplash.com/photo-1601220363009-f7e66d095649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBwaG9uZSUyMHN0YW5kfGVufDF8fHx8MTc2NTQ0ODEzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Utilitaire",
    rating: 4.7,
    downloads: 3421,
  },
  {
    id: "10",
    name: "Puzzle Mécanique 3D",
    description: "Puzzle complexe avec mécanismes mobiles",
    imageUrl:
      "https://images.unsplash.com/photo-1740625942947-26caf3a16d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjB0b3l8ZW58MXx8fHwxNzY1NDQ4MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Jouets",
    rating: 4.6,
    downloads: 1876,
  },
  {
    id: "12",
    name: "Organisateur de Bureau",
    description:
      "Organisateur modulaire pour fournitures de bureau",
    imageUrl:
      "https://images.unsplash.com/photo-1625225233840-695456021cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBkZXNrJTIwb3JnYW5pemVyfGVufDF8fHx8MTc2NTQ0ODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Utilitaire",
    rating: 4.5,
    downloads: 2134,
  },
  {
    id: "11",
    name: "Porte-clés Personnalisé",
    description: "Porte-clés avec texte personnalisable",
    imageUrl:
      "https://images.unsplash.com/photo-1659264792008-eb4757c9c8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBrZXljaGFpbnxlbnwxfHx8fDE3NjU0NDgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mode",
    rating: 4.3,
    downloads: 5632,
  },
];

export function SearchResults({
  onSelectModel,
  onBack,
  onLogout,
  onGoToProfile,
  onGoToAdmin,
  onGoToSearch,
  searchText,
  onSearchTextChange,
  onSearchSubmit,
}: SearchResultsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);

  const categories = useMemo(
    () => Array.from(new Set(mockModels.map((m) => m.category))),
    []
  );

  const displayedModels = useMemo(() => {
    return mockModels.filter((m) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(m.category);
      const matchRating = m.rating >= minRating;
      return matchCategory && matchRating;
    });
  }, [selectedCategories, minRating]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-gray-900 text-lg sm:text-xl">
                Print3D Finder
              </h1>
            </div>
            <Navigation
              onLogout={onLogout}
              onGoToProfile={onGoToProfile}
              onGoToAdmin={onGoToAdmin}
              onGoToSearch={onGoToSearch}
              showSearchBar={true}
              searchText={searchText}
              onSearchTextChange={onSearchTextChange}
              onSearchSubmit={onSearchSubmit}
              currentPage="results"
            />
          </div>
        </div>
      </header>

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span>{displayedModels.length} modèles trouvés</span>
          </p>
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            aria-expanded={showFilters}
            aria-controls="filters-panel"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Filtres</span>
          </button>
        </div>

        {showFilters && (
          <div
            id="filters-panel"
            className="fixed top-24 right-4 z-20 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-gray-900 font-medium">Filtres</h2>
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setShowFilters(false)}
              >
                Fermer
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-700 mb-2">Catégories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const checked = selectedCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className={`px-2 py-1 rounded border text-sm cursor-pointer ${
                          checked
                            ? "bg-indigo-100 border-indigo-300 text-indigo-700"
                            : "bg-white border-gray-300 text-gray-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleCategory(cat)}
                        />
                        {cat}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700 mb-2">Note minimale</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.1}
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-sm text-gray-700">
                    {minRating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  Réinitialiser
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grille qui prend toute la largeur disponible */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 w-full">
          {displayedModels.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group flex flex-col"
              style={{ width: '280px', height: '287px' }}
            >
              <div className="overflow-hidden bg-gray-100 flex-shrink-0" style={{ width: '280px', height: '210px' }}>
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 flex-1 flex flex-col overflow-hidden">
                <div className="flex items-start justify-between">
                  <h3
                    className="text-gray-900 flex-1 truncate text-sm sm:text-base"
                    title={model.name}
                  >
                    {model.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs sm:text-sm whitespace-nowrap">
                    {model.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm mt-auto">
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

export function PrintRequest({ 
  model, 
  onBack, 
  onLogout, 
  onGoToProfile, 
  onGoToAdmin, 
  onGoToSearch,
  searchText,
  onSearchTextChange,
  onSearchSubmit
}: PrintRequestProps) {
  return (
    <div>
      {/* Votre code pour la demande d'impression ici */}
      <Navigation
        onLogout={onLogout}
        onGoToProfile={onGoToProfile}
        onGoToAdmin={onGoToAdmin}
        onGoToSearch={onGoToSearch}
        showSearchBar={true}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        onSearchSubmit={onSearchSubmit}
        currentPage="request"
      />
      {/* Reste du contenu */}
    </div>
  );
}
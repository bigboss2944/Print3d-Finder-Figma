import { useState } from "react";
import {
  Search,
  Image,
  Camera,
  TrendingUp,
} from "lucide-react";
import { Navigation } from "./Navigation";

interface SearchPageProps {
  onSearch: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export function SearchPage({
  onSearch,
  onLogout,
  onGoToProfile,
  onGoToAdmin,
  searchText,
  onSearchTextChange,
}: SearchPageProps) {
  const [searchMode, setSearchMode] = useState<
    "text" | "image"
  >("text");

  const popularSearches = [
    "Vase décoratif",
    "Figurine personnage",
    "Support téléphone",
    "Organisateur bureau",
    "Jouet puzzle",
    "Porte-clés",
  ];

  const categories = [
    { name: "Décoration", icon: "🏠" },
    { name: "Gadgets", icon: "🔧" },
    { name: "Jouets", icon: "🎮" },
    { name: "Art", icon: "🎨" },
    { name: "Utilitaire", icon: "⚙️" },
    { name: "Mode", icon: "👔" },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-gray-900 text-lg sm:text-xl">
              Print3D Finder
            </h1>
          </div>
          <Navigation
            onLogout={onLogout}
            onGoToProfile={onGoToProfile}
            onGoToAdmin={onGoToAdmin}
            showSearchBar={true}
            searchText={searchText}
            onSearchTextChange={onSearchTextChange}
            onSearchSubmit={onSearch}
            currentPage="search"
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-3">
            Trouvez le modèle 3D parfait
          </h2>
          <p className="text-gray-600">
            Recherchez par texte ou uploadez une photo de
            l'objet que vous souhaitez imprimer
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSearchMode("text")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                searchMode === "text"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Search className="w-5 h-5" />
              Recherche textuelle
            </button>
            <button
              onClick={() => setSearchMode("image")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                searchMode === "image"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Camera className="w-5 h-5" />
              Recherche par photo
            </button>
          </div>

          {searchMode === "text" ? (
            <div className="text-center text-gray-600">
              <p>Utilisez la barre de recherche en haut pour rechercher un modèle</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 transition-colors cursor-pointer">
                <Image className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-900 mb-1">
                  Cliquez pour uploader une photo
                </p>
                <p className="text-gray-500">
                  ou glissez-déposez votre image ici
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <button
                onClick={onSearch}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Analyser et rechercher
              </button>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-900">
              Recherches populaires
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => {
                  onSearchTextChange(search);
                  setSearchMode("text");
                }}
                className="px-4 py-2 bg-white rounded-full text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors shadow-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 mb-4">
            Catégories populaires
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={onSearch}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all shadow-sm"
              >
                <div className="text-4xl mb-2">
                  {category.icon}
                </div>
                <p className="text-gray-900">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
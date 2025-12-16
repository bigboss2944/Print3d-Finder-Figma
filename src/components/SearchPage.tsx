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
}

export function SearchPage({
  onSearch,
  onLogout,
  onGoToProfile,
  onGoToAdmin,
}: SearchPageProps) {
  const [searchText, setSearchText] = useState("");
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
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-gray-900 dark:text-gray-100 text-lg sm:text-xl">
              Print3D Finder
            </h1>
          </div>
          <Navigation
            onLogout={onLogout}
            onGoToProfile={onGoToProfile}
            onGoToAdmin={onGoToAdmin}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-gray-100 mb-3">
            Trouvez le modèle 3D parfait
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Recherchez par texte ou uploadez une photo de
            l'objet que vous souhaitez imprimer
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSearchMode("text")}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                searchMode === "text"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Camera className="w-5 h-5" />
              Recherche par photo
            </button>
          </div>

          {searchMode === "text" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  placeholder="Ex: vase moderne, figurine dragon, support casque..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Rechercher
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer">
                <Image className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
                <p className="text-gray-900 dark:text-gray-100 mb-1">
                  Cliquez pour uploader une photo
                </p>
                <p className="text-gray-500 dark:text-gray-400">
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
            <TrendingUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-gray-900 dark:text-gray-100">
              Recherches populaires
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => {
                  setSearchText(search);
                  setSearchMode("text");
                }}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors shadow-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-900 dark:text-gray-100 mb-4">
            Catégories populaires
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={onSearch}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg hover:scale-105 transition-all shadow-sm"
              >
                <div className="text-4xl mb-2">
                  {category.icon}
                </div>
                <p className="text-gray-900 dark:text-gray-100">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
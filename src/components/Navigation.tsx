import { useState } from 'react';
import { Menu, X, User, LayoutDashboard, LogOut, Search } from 'lucide-react';

interface NavigationProps {
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
  onGoToSearch?: () => void;
  currentPage?: string;
  showSearchBar?: boolean;
  searchText?: string;
  onSearchTextChange?: (text: string) => void;
  onSearchSubmit?: () => void;
}

export function Navigation({ onLogout, onGoToProfile, onGoToAdmin, onGoToSearch, currentPage, showSearchBar, searchText, onSearchTextChange, onSearchSubmit }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {showSearchBar && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit?.();
            }}
            className="flex items-center gap-2 mr-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => onSearchTextChange?.(e.target.value)}
                placeholder="Rechercher un modèle..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Rechercher
            </button>
          </form>
        )}
        {onGoToSearch && currentPage !== 'search' && (
          <button
            onClick={onGoToSearch}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
            <span>Recherche</span>
          </button>
        )}
        {onGoToAdmin && (
          <button
            onClick={onGoToAdmin}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Admin</span>
          </button>
        )}
        {onGoToProfile && (
          <button
            onClick={onGoToProfile}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Profil</span>
          </button>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
            {onGoToSearch && currentPage !== 'search' && (
              <button
                onClick={() => {
                  onGoToSearch();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Recherche</span>
              </button>
            )}
            {onGoToAdmin && (
              <button
                onClick={() => {
                  onGoToAdmin();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Tableau de bord</span>
              </button>
            )}
            {onGoToProfile && (
              <button
                onClick={() => {
                  onGoToProfile();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Mon profil</span>
              </button>
            )}
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from "react";
import {
  ArrowLeft,
  Star,
  Download,
  Printer,
  AlertCircle,
  CheckCircle2,
  Info,
  Ruler,
  Package,
  Clock,
  User,
  X,
} from "lucide-react";
import { Model3D } from "../App";
import { Navigation } from "./Navigation";

interface ModelDetailsProps {
  model: Model3D;
  onRequestPrint: () => void;
  onBack: () => void;
  onLogout: () => void;
  onGoToProfile?: () => void;
  onGoToAdmin?: () => void;
  onGoToSearch?: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchSubmit: () => void;
}

export function ModelDetails({
  model,
  onRequestPrint,
  onBack,
  onLogout,
  onGoToProfile,
  onGoToAdmin,
  onGoToSearch,
  searchText,
  onSearchTextChange,
  onSearchSubmit,
}: ModelDetailsProps) {
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  
  const MAX_DESCRIPTION_LENGTH = 200;
  const isDescriptionTruncated = model.description.length > MAX_DESCRIPTION_LENGTH;
  const truncatedDescription = isDescriptionTruncated
    ? model.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
    : model.description;

  const printAnalysis = {
    isPrintable: true,
    material: "PLA",
    recommendedMaterials: ["PLA", "PETG", "ABS"],
    estimatedSize: {
      width: 120,
      height: 150,
      depth: 85,
    },
    estimatedTime: "6h 24min",
    estimatedWeight: "145g",
    complexity: "Moyenne",
    supportRequired: true,
    warnings: [
      "Des supports sont nécessaires pour cette impression",
      "Certaines parties fines peuvent nécessiter une attention particulière",
    ],
    recommendations: [
      "Température de buse recommandée: 200-220°C",
      "Température du plateau: 60°C",
      "Vitesse d'impression: 50mm/s",
      "Hauteur de couche: 0.2mm",
    ],
  };

  return (
    <div className="min-h-screen">{/* Removed bg-gray-50 */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">{/* Added backdrop-blur-sm and changed to bg-white/90 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
              currentPage="details"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-gray-900 mb-4">
                Informations du modèle
              </h3>
              <div className="space-y-3">
                {model.author && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      Créateur
                    </span>
                    <span className="text-gray-900 font-medium">
                      {model.author}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Catégorie
                  </span>
                  <span className="text-gray-900">
                    {model.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Téléchargements
                  </span>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">
                      {model.downloads.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Note moyenne
                  </span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-gray-900">
                      {model.rating} / 5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-gray-900 mb-4">{model.name}</h1>
            <div className="mb-6">
              <p className="text-gray-600">
                {truncatedDescription}
              </p>
              {isDescriptionTruncated && (
                <button
                  onClick={() => setIsDescriptionModalOpen(true)}
                  className="text-indigo-600 hover:text-indigo-700 mt-2 inline-flex items-center gap-1 text-sm font-medium"
                >
                  Description complète →
                </button>
              )}
            </div>

            {printAnalysis.isPrintable ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-green-900 mb-2">
                      ✓ Modèle imprimable
                    </h3>
                    <p className="text-green-700">
                      Ce modèle peut être imprimé avec le
                      matériau et les paramètres recommandés
                      ci-dessous.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-red-900 mb-2">
                      Modèle non imprimable
                    </h3>
                    <p className="text-red-700">
                      Ce modèle présente des incompatibilités
                      avec nos capacités d'impression.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-6 shadow-md mb-6">
              <h3 className="text-gray-900 mb-4">
                Analyse d'impression
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-gray-600">
                      Matériau recommandé
                    </p>
                    <p className="text-gray-900">
                      {printAnalysis.material}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-gray-600">
                      Temps d'impression
                    </p>
                    <p className="text-gray-900">
                      {printAnalysis.estimatedTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-gray-600">
                      Dimensions estimées
                    </p>
                    <p className="text-gray-900">
                      {printAnalysis.estimatedSize.width} ×{" "}
                      {printAnalysis.estimatedSize.height} ×{" "}
                      {printAnalysis.estimatedSize.depth} mm
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <p className="text-gray-600">Complexité</p>
                    <p className="text-gray-900">
                      {printAnalysis.complexity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="text-gray-900 mb-3">
                  Matériaux compatibles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {printAnalysis.recommendedMaterials.map(
                    (material) => (
                      <span
                        key={material}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        {material}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {printAnalysis.warnings.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h4 className="text-gray-900 mb-3">
                    ⚠️ Avertissements
                  </h4>
                  <ul className="space-y-2">
                    {printAnalysis.warnings.map(
                      (warning, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-amber-700"
                        >
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{warning}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-gray-900 mb-3">
                  Recommandations d'impression
                </h4>
                <ul className="space-y-2">
                  {printAnalysis.recommendations.map(
                    (rec, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                        <span>{rec}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {printAnalysis.isPrintable && (
              <button
                onClick={onRequestPrint}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Printer className="w-5 h-5" />
                Demander l'impression
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Modal Description Complète */}
      {isDescriptionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
              <h3 className="text-gray-900">Description du modèle</h3>
              <button
                onClick={() => setIsDescriptionModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <h4 className="text-gray-900 mb-3">{model.name}</h4>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {model.description}
              </p>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
              <button
                onClick={() => setIsDescriptionModalOpen(false)}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
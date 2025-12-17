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
}

export function ModelDetails({
  model,
  onRequestPrint,
  onBack,
  onLogout,
  onGoToProfile,
  onGoToAdmin,
}: ModelDetailsProps) {
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
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">
                Retour aux résultats
              </span>
              <span className="sm:hidden">Retour</span>
            </button>
            <Navigation
              onLogout={onLogout}
              onGoToProfile={onGoToProfile}
              onGoToAdmin={onGoToAdmin}
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
            <p className="text-gray-600 mb-6">
              {model.description}
            </p>

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
    </div>
  );
}
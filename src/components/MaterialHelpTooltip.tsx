import { useState } from 'react';
import { HelpCircle, CheckCircle } from 'lucide-react';

interface MaterialInfo {
  name: string;
  description: string;
  useCases: string[];
  recommended?: boolean;
}

const materials: MaterialInfo[] = [
  {
    name: 'PLA',
    description: 'Matériau biodégradable, facile à imprimer',
    useCases: ['Objets décoratifs', 'Prototypes', 'Figurines', 'Usage intérieur'],
    recommended: true,
  },
  {
    name: 'PETG',
    description: 'Résistant et durable, bonne flexibilité',
    useCases: ['Objets fonctionnels', 'Pièces mécaniques', 'Usage extérieur', 'Contenants alimentaires'],
  },
  {
    name: 'ABS',
    description: 'Très résistant à la chaleur et aux chocs',
    useCases: ['Pièces automobiles', 'Boîtiers électroniques', 'Outils', 'Objets robustes'],
  },
  {
    name: 'TPU',
    description: 'Flexible et élastique, résistant à l\'abrasion',
    useCases: ['Coques de protection', 'Joints', 'Pièces souples', 'Accessoires flexibles'],
  },
];

export function MaterialHelpTooltip() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="p-1 text-indigo-600 hover:text-indigo-700 transition-colors"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {isVisible && (
        <div className="absolute left-0 top-full mt-2 w-80 max-w-[90vw] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 animate-fade-in">
          <h4 className="text-gray-900 mb-3">Guide des matériaux</h4>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {materials.map((material) => (
              <div
                key={material.name}
                className={`p-3 rounded-lg ${
                  material.recommended ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <h5 className="text-gray-900">{material.name}</h5>
                  {material.recommended && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-600 text-white rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Recommandé
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2 text-sm">{material.description}</p>
                <div className="text-sm">
                  <p className="text-gray-700 mb-1">Idéal pour:</p>
                  <ul className="space-y-1">
                    {material.useCases.map((useCase, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start gap-1">
                        <span className="text-indigo-600 mt-0.5">•</span>
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              💡 Le matériau recommandé est basé sur l'analyse du modèle
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  itemCount?: number;
}

export function ConfirmDeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
  itemCount = 1,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slide-in-right">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{message}</p>
            {itemCount > 1 && (
              <p className="text-red-600 mt-2">
                {itemCount} élément{itemCount > 1 ? 's' : ''} sélectionné{itemCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

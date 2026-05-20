import { FiCheck } from "react-icons/fi";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-xl animate-appearance-in slide-in-from-bottom-5 fade-in duration-300">
      <FiCheck className="w-5 h-5 flex-none" />
      <p className="text-sm font-medium pr-1">{message}</p>
    </div>
  );
}

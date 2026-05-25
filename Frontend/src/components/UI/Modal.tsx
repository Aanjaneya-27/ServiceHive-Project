import type { ReactNode } from "react";

interface ModalProps {
  title: string;

  isOpen: boolean;

  onClose: () => void;

  children: ReactNode;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
}: ModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ×
          </button>

        </div>

        {children}

      </div>

    </div>
  );
};

export default Modal;
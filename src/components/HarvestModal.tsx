// Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const HarvestModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-[32px] shadow-xl z-50 w-[350px]">
        {children}
        <div>
          <div className='flex justify-center'>
            <button
              className=" mt-4 p-2 w-2/3 bg-blue-500 font-bold text-white rounded-[8px]"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>
          <div className='flex justify-center mb-4'>
            <button
              className=" mt-4 p-2 w-2/3 bg-gray-500 font-bold text-white rounded-[8px]"
              onClick={onClose}
            >
              Close Windows
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default HarvestModal;

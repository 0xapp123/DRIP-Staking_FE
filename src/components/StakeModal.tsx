// Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  isStake: boolean;
  onClose: () => void;
  children: ReactNode;
}

const StakeModal: React.FC<ModalProps> = ({ isOpen, isStake, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-[32px] shadow-xl z-50 w-[350px]">
        {children}
        <div className='p-6'>
          <div className='flex justify-between'>
            <div className='font-bold text-[18px]'>
              {isStake ? `Stake:` : `Unstake:`}
            </div>
            <div className='font-bold'>
              DRIP-BNB LP
            </div>
          </div>
        </div>
        <div className=' border-solid border-4 border-gray-400 bg-gray-200 rounded-[12px] m-6 p-4'>
          <input className='w-full bg-transparent text-right focus:outline-none text-xl' placeholder='0.0'></input>
          <div className='text-right  text-stone-400'>
            ~ 0.34 USD
          </div>
        </div>
        <div>
          <div className='flex justify-center'>
            <button
              className=" mt-4 p-2 w-2/3 bg-blue-500 font-bold text-white rounded-[8px]"
              onClick={onClose}
            >
              {isStake ? `Stake` : `Unstake`}
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

export default StakeModal;

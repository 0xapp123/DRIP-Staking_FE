// Modal.tsx
import React, { ReactNode, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useStaking } from "../hook/useStaking";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const HarvestModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);
  const { deposit } = useStaking();

  const handleClaim = async () => {
    setLoading(true);
    try {
      const res = await deposit(BigInt(0), BigInt(1000000000000));

      if (res) {
        console.log(res)
        setLoading(false);
        onClose();
        if (res.status === "success") {
          
          toast.success("Success!", {
            autoClose: 3000, // Close the toast after 3 seconds
          });
        } else {
          toast.error("Reverted!", {
            autoClose: 3000, // Close the toast after 3 seconds
          });
        }
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-[32px] shadow-xl z-50 w-[350px]">
        {children}
        <div>
          <div className="flex justify-center">
            <button
              className=" mt-4 p-2 w-2/3 bg-blue-500 font-bold text-white rounded-[8px]"
              onClick={handleClaim}
            >
              Confirm
            </button>
            {loading && <LoadingSpinner />}
            {/* {isConfirmed && (isSuccess ? <Toast isSuccess={true}/> : <Toast isSuccess={false}/>)} */}
          </div>
          <div className="flex justify-center mb-4">
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

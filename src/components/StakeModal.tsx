// Modal.tsx
import React, { ChangeEvent, ReactNode, useState } from 'react';
import { useErc20 } from '../hook/useErc20';
import { useStaking } from '../hook/useStaking';
import { parseEther } from 'viem';
import { LP_TOKEN_ADDRESS, STAKING_CONTRACT_ADDRESS } from '../config/config';
import LoadingModal from './LoadingSpinner';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  isStake: boolean;
  userStakeAmt: number;
  userLpBal: number;
  onClose: () => void;
  children: ReactNode;
}


const StakeModal: React.FC<ModalProps> = ({ isOpen, isStake, userStakeAmt, userLpBal, onClose, children }) => {
  const [inputValue, setInputValue] = useState('');
  const { approve } = useErc20();
  const { withdraw, deposit } = useStaking();
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null;

  const handleInputChange = (input: number) => (event: ChangeEvent<HTMLInputElement>) => {
    let max = 0;
    if (input === 0) max = userStakeAmt;
    if (input === 1) max = userLpBal;
    console.log(max);
    
    if(Number(event.target.value) > max) console.log("Exceed Amount");
    else if(isNaN(Number(event.target.value))) setInputValue('0');
    else setInputValue(event.target.value);
  };

  const handleStake = async(isStake : Boolean, value: string) => {
    console.log(isStake, "isStake")
    console.log(parseEther(value));
    if (!value) return;
    setLoading(true);
    try {
      let res: any;
      if (isStake) {
        const res1 = await approve(LP_TOKEN_ADDRESS, STAKING_CONTRACT_ADDRESS, parseEther(value));
        if (res1.status === 'success') {
          res = await deposit(
            BigInt(parseEther(value)),
            BigInt(1000000000000)
          )
        }
      } else {
        res = await withdraw(BigInt(value));
      }
      
      if (res) {
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
    } catch(e) {
      setLoading(false);
      console.log(e);
    }
  }
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
          <input className='w-full bg-transparent text-right focus:outline-none text-xl' type="text" value={inputValue} onChange={isStake ? handleInputChange(1) : handleInputChange(0)}></input>
          <div className='flex justify-between'>
            <div className='text-gray-600'>
              Max:
            </div>
            <div className='text-right'>
              <span className='text-gray-600 font-bold'>{isStake ? userLpBal : userStakeAmt}</span>
              <span className='text-purple-600 font-bold text-[14px]'>  DRIP-BNB LP</span>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-center'>
            <button
              className=" mt-4 p-2 w-2/3 bg-blue-500 font-bold text-white rounded-[8px]"
              onClick={isStake ? ()=>handleStake(true, inputValue): ()=>handleStake(false, inputValue)}
            >
              {isStake ? `Stake` : `Unstake`}
            </button>
            {loading && <LoadingModal />}
      
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

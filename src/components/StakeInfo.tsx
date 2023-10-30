// Modal.tsx
import React, { useState } from "react";
import { useAccount } from "wagmi";
import StakeModal from "./StakeModal";
import HarvestModal from "./HarvestModal";
interface ModalProps {
  pendingDrip: number;
  price: number;
  userStakeAmount: number;
  endTime: number
}

const StakeInfo: React.FC<ModalProps> = ({
  pendingDrip,
  price,
  userStakeAmount,
  endTime,
}) => {
  const { isConnected } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openStakeModal = (stake: boolean) => {
    setIsStakeModalOpen(true);
  };

  const closeStakeModal = () => {
    setIsStakeModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-5 mt-1 justify-between">
          <div className="border rounded-2xl border-gray-400 px-6 py-2 w-[calc(50%-10px)] flex items-center justify-between">
            <div className="">
              <p className="font-bold">
                <span className="text-purple-600">DRIP</span> TO EARN
              </p>
              <p className="text-2xl font-bold">
                {isConnected && pendingDrip ? `${pendingDrip.toFixed(4)}` : "--"}
              </p>
              <p className="text-sm font-bold opacity-60">
                {isConnected && pendingDrip ? `~${(pendingDrip * price).toFixed(4)}` : "--"}
                USD
              </p>
            </div>
            <div>
              <button
                onClick={openModal}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg"
              >
                Harvest
              </button>
            </div>
          </div>
          <div className="border rounded-2xl border-gray-400 px-6 py-2 w-[calc(50%-10px)] flex items-center justify-between">
            <div className="">
              <p className="font-bold">
                <span className="text-purple-600">DRIP-BNB LP</span> STAKED
              </p>
              <p className="text-2xl font-bold">
                {isConnected ? `${userStakeAmount.toFixed(4)}` : `--`}
              </p>
              <p className="text-sm font-bold opacity-60">DRIP-BNB LP</p>
            </div>
            <div>
              <button
                onClick={() => {
                  openStakeModal(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg"
              >
                Unstake
              </button>
              <div className="flex justify-between mt-2 font-semibold">
                <span>End in:</span>
                <span>{endTime} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StakeModal
        isOpen={isStakeModalOpen}
        isStake={false}
        onClose={closeStakeModal}
        userStakeAmt={userStakeAmount}
        userLpBal={1}
        endTime={endTime}
      >
        <div className="flex justify-between bg-gray-200 rounded-t-[32px] p-6">
          <div className="flex font-bold text-[20px]">
            Unstake
          </div>
          <div className="flex">
            <button onClick={closeStakeModal}>X</button>
          </div>
        </div>
      </StakeModal>
      <HarvestModal
        isOpen={isModalOpen}
        duration={endTime}
        onClose={closeModal}
      >
        <div className="flex justify-between bg-gray-200 rounded-t-[32px] p-6">
          <div className="flex font-bold text-[20px]">DRIP Harvest</div>
          <div className="flex">
            <button onClick={closeModal}>X</button>
          </div>
        </div>
        <div className="p-8">
          <div className="text-lg font-bold">Harvesting:</div>
          <div className="text-[20px] mt-4 font-bold">{pendingDrip} DRIP</div>
          <div className="text-gray-400 font-bold">
            ~{(pendingDrip * price).toFixed(4)} USD
          </div>
        </div>
      </HarvestModal>
    </>
  );
};

export default StakeInfo;

import Header from "../components/Header";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MetamaskIcon } from "../components/SvgIcons";
import HarvestModal from "../components/HarvestModal";
import { useState } from "react";
import StakeModal from "../components/StakeModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStake, setIsStake] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openStakeModal = (stake: boolean) => {
    setIsStake(stake);
    setIsStakeModalOpen(true);
  };

  const closeStakeModal = () => {
    setIsStakeModalOpen(false);
  };

  return (
    <>
      <Header />
      <HarvestModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex justify-between bg-gray-200 rounded-t-[32px] p-6">
          <div className="flex font-bold text-[20px]">DRIP Harvest</div>
          <div className="flex">
            <button  onClick={closeModal}>X</button>
          </div>
        </div>
        <div className="p-8">
          <div className="text-lg font-bold">
            Harvesting:
          </div>
          <div className="text-[20px] mt-4 font-bold">
            1.280 DRIP
          </div>
          <div className="text-gray-400 font-bold">
            ~1.36 USD
          </div>
        </div>
      </HarvestModal>

      <StakeModal isOpen={isStakeModalOpen} isStake={isStake} onClose={closeStakeModal}>
        <div className="flex justify-between bg-gray-200 rounded-t-[32px] p-6">
          <div className="flex font-bold text-[20px]">{isStake ? `Stake in Pool` : `Unstake`}</div>
          <div className="flex">
            <button  onClick={closeStakeModal}>X</button>
          </div>
        </div>
      </StakeModal>

      <main>
        <div className="max-w-[1200px] mx-auto mt-10">
          <h1 className="leading-[1.5] text-[48px] font-bold my-6">
            DRIP-BNB LP Staking Pools
          </h1>
          <h1 className="text-2xl font-bold my-6">
            Just stake DRIP-BNB LP tokens to earn. <br />
          </h1>
          <div className="border rounded-2xl border-[#00000030] overflow-hidden">
            <div className="px-6 py-4 bg-white">
              <div className="flex items-start flex-wrap">
                <div className="flex items-center gap-2 w-1/3">
                  <div className="w-12 h-12 rounded-full border border-gray-700"></div>
                  <div className="">
                    <h5 className="font-bold text-xl">Earn DRIP</h5>
                    <p className="text-sm font-medium">Stake DRIP-BNB</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <p className="text-sm leading-4 font-medium">DRIP Earned</p>
                  <p className="text-xl leading-6 opacity-80 font-bold">0.0</p>
                  <p className="text-sm leading-4">0 USD</p>
                </div>
                <div className="w-1/3">
                  <p className="text-sm leading-4 font-medium">Total Staked</p>
                  <p className="text-xl leading-6 font-bold">301 DRIP-BNB</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-200 border-t-2 border-gray-50 flex">
              <div className="w-[200px]">
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">Ends In:</div>
                  <div className="text-sm font-semibold">214 days</div>
                </div>
                <a
                  href="#"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    See Token Info <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                </a>
                <a
                  href="#"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    View Project Site <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                </a>
                <a
                  href="#"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    View Contract <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                </a>
                <a
                  href="#"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    Add to wallet <MetamaskIcon />
                  </div>
                </a>
              </div>
              <div className="w-[calc(100%-240px)] ml-10 flex flex-col justify-center">
                <div className="flex items-center gap-5 justify-between">
                  <div className="border rounded-2xl border-gray-400 p-6 w-[calc(50%-10px)] flex items-center justify-between">
                    <div className="">
                      <p className="font-bold">
                        <span className="text-purple-600">DRIP</span> EARNED
                      </p>
                      <p className="text-2xl font-bold">0.0545</p>
                      <p className="text-sm font-bold opacity-60">~ 0.57 USD</p>
                    </div>
                    <button onClick={openModal} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg">
                      Harvest
                    </button>
                  </div>
                  <div className="border rounded-2xl border-gray-400 p-6 w-[calc(50%-10px)] flex items-center justify-between">
                    <div className="">
                      <p className="font-bold">
                        <span className="text-purple-600">DRIP-BNB LP</span> STAKED
                      </p>
                      <p className="text-2xl font-bold">0.03545</p>
                      <p className="text-sm font-bold opacity-60">~ 0.78 USD</p>
                    </div>
                    <div className="flex w-[calc(40%-10px)] justify-between">
                      <button onClick={() => {openStakeModal(false); }} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg">
                        -
                      </button>
                      <button onClick={() => {openStakeModal(true); }} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

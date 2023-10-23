import Header from "../components/Header";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import HarvestModal from "../components/HarvestModal";
import StakeModal from "../components/StakeModal";

import { useAccount } from "wagmi";
import {
  STAKING_CONTRACT_ADDRESS,
} from "../config/config";
import { formatEther } from "viem";
import { useStaking } from "../hook/useStaking";
import { useErc20 } from "../hook/useErc20";

function App() {
  const { isConnected, address } = useAccount();
  const { userInfo, pending } = useStaking();
  const { balanceOf } = useErc20();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStake, setIsStake] = useState(false);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  const [userRewardDebt, setUserRewardDebt] = useState(0);
  const [userStakeAmount, setUserStakeAmount] = useState(0);
  const [userLpBalance, setUserLpBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [pendingDrip, setPendingDrip] = useState(0);
  const [price, setPrice] = useState(0);

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

  const getPrice = () => {
    let interval = setInterval(() => {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=drip-network&vs_currencies=usd"
      )
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          return resp.json();
        })
        .then((json) => {
          // @ts-ignore
          console.log("========DRIP Price========", json["drip-network"].usd);
          setPrice(json["drip-network"].usd);
        })
        .catch((e) => {
          console.log(e);
        });
      getUserInfo();
    }, 5000);
    return interval;
  };

  const getUserInfo = async () => {
    console.log("get user info");
    if (address)
      console.log("=============================", await userInfo(address));
    if (address)
      console.log("=============================", await balanceOf(address));
    if (address) {
      const infoUser = await userInfo(address);
      const infoTotal = await balanceOf(STAKING_CONTRACT_ADDRESS);
      const infoPending = await pending(address);
      const infoBal = await balanceOf(address);

      if (infoUser) {
        // @ts-ignore
        setUserStakeAmount(Number(formatEther(infoUser[0])));
        // @ts-ignore
        setUserRewardDebt(Number(formatEther(infoUser[1])));
      }
      if (infoTotal) {
        // @ts-ignore
        setStakedAmount(Number(formatEther(infoTotal)));
      }
      if (infoPending) {
        // @ts-ignore
        setPendingDrip(Number(formatEther(infoPending)));
      }
      if (infoBal) {
        // @ts-ignore
        setUserLpBalance(Number(formatEther(infoBal)));
      }
    }
  };

  useEffect(() => {
    console.log("isConnected ", isConnected);
    if (isConnected && address) {
      getUserInfo();
    }
  }, [isConnected, address]);

  useEffect(() => {
    let interval = getPrice();
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Header />
      <HarvestModal
        isOpen={isModalOpen}
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

      <StakeModal
        isOpen={isStakeModalOpen}
        isStake={isStake}
        onClose={closeStakeModal}
        userStakeAmt={userStakeAmount}
        userLpBal={userLpBalance}
      >
        <div className="flex justify-between bg-gray-200 rounded-t-[32px] p-6">
          <div className="flex font-bold text-[20px]">
            {isStake ? `Stake in Pool` : `Unstake`}
          </div>
          <div className="flex">
            <button onClick={closeStakeModal}>X</button>
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
                  <div className="w-12 h-12 rounded-full border-2 border-blue-300">
                    <img src="/drip-network.png"></img>
                  </div>
                  <div className="">
                    <h5 className="font-bold text-xl">Earn DRIP</h5>
                    <p className="text-sm font-medium">Stake <span className="text-pink-400 font-bold">DRIP-BNB LP</span></p>
                  </div>
                </div>
                <div className="w-1/3">
                  <p className="text-sm leading-4 font-medium">DRIP Earned</p>
                  <p className="text-xl leading-6 opacity-80 font-bold">
                    {isConnected
                      ? `${userRewardDebt.toFixed(4)}`
                      : `--`}
                  </p>
                  <p className="text-sm leading-4">
                    {" "}
                    {isConnected
                      ? `~${(price * userRewardDebt).toFixed(3)}`
                      : `--`}{" "}
                    USD
                  </p>
                </div>
                <div className="w-1/3">
                  <p className="text-sm leading-4 font-medium">Total Staked</p>
                  <p className="text-xl leading-6 font-bold">
                    {isConnected ? `${stakedAmount.toFixed(4)}` : `--`} DRIP-BNB
                    LP
                  </p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-200 border-t-2 border-gray-50 flex">
              <div className="w-[200px]">
                <a
                  href="https://bscscan.com/token/0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333"
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
                  href="https://testnet.bscscan.com/address/0xd89B8Cc60DA769F79170c4703f2b4197B53Da497"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    View Contract <FaExternalLinkAlt className="w-3 h-3" />
                  </div>
                </a>
                {/* <a
                  href="#"
                  className="font-medium hover:underline"
                  target="_blank"
                >
                  <div className="flex items-center mt-2 gap-2 text-sm text-green-600">
                    Add to wallet <MetamaskIcon />
                  </div>
                </a> */}
              </div>
              <div className="w-[calc(100%-240px)] ml-10 flex flex-col justify-center">
                <div className="flex items-center gap-5 justify-between">
                  <div className="border rounded-2xl border-gray-400 p-6 w-[calc(50%-10px)] flex items-center justify-between">
                    <div className="">
                      <p className="font-bold">
                        <span className="text-purple-600">DRIP</span> TO EARN
                      </p>
                      <p className="text-2xl font-bold">
                        {isConnected ? `${pendingDrip.toFixed(4)}` : "--"}
                      </p>
                      <p className="text-sm font-bold opacity-60">
                        {isConnected
                          ? `~${(pendingDrip * price).toFixed(4)}`
                          : "--"}
                        USD
                      </p>
                    </div>
                    <button
                      onClick={openModal}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg"
                    >
                      Harvest
                    </button>
                  </div>
                  <div className="border rounded-2xl border-gray-400 p-6 w-[calc(50%-10px)] flex items-center justify-between">
                    <div className="">
                      <p className="font-bold">
                        <span className="text-purple-600">DRIP-BNB LP</span>{" "}
                        STAKED
                      </p>
                      <p className="text-2xl font-bold">
                        {isConnected ? `${userStakeAmount.toFixed(4)}` : `--`}
                      </p>
                      <p className="text-sm font-bold opacity-60">
                        DRIP-BNB LP
                      </p>
                    </div>
                    <div className="flex w-[calc(40%-10px)] justify-between">
                      <button
                        onClick={() => {
                          openStakeModal(false);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg"
                      >
                        -
                      </button>
                      <button
                        onClick={() => {
                          openStakeModal(true);
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg"
                      >
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

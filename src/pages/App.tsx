import Header from "../components/Header";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MetamaskIcon } from "../components/SvgIcons";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="max-w-[1200px] mx-auto mt-10">
          <h1 className="leading-[1.5] text-[48px] font-bold my-6">
            Syrup Pools
          </h1>
          <h1 className="text-2xl font-bold my-6">
            Just stake some tokens to earn. <br />
            High APR, low risk.
          </h1>
          <div className="border rounded-2xl border-[#00000030] overflow-hidden">
            <div className="px-6 py-4 bg-gray-100">
              <div className="flex items-start flex-wrap">
                <div className="flex items-center gap-2 w-1/5">
                  <div className="w-12 h-12 rounded-full border border-gray-700"></div>
                  <div className="">
                    <h5 className="font-bold text-xl">Earn CAKE2</h5>
                    <p className="text-sm font-medium">Stake WBNB</p>
                  </div>
                </div>
                <div className="w-1/5">
                  <p className="text-sm leading-4 font-medium">CAKE2 Earned</p>
                  <p className="text-xl leading-6 opacity-80 font-bold">0.0</p>
                  <p className="text-sm leading-4">0 USD</p>
                </div>
                <div className="w-1/5">
                  <p className="text-sm leading-4 font-medium">Total Staked</p>
                  <p className="text-xl leading-6 font-bold">301 WBNB</p>
                </div>
                <div className="w-1/5">
                  <p className="text-sm leading-4 font-medium">APR</p>
                  <p className="text-xl leading-6 opacity-80 font-bold">
                    0.0 %
                  </p>
                  <p className="text-sm leading-4">0 USD</p>
                </div>
                <div className="w-1/5">
                  <p className="text-sm leading-4 font-medium">Ends in</p>
                  <p className="text-lg leading-6 opacity-80 font-bold">
                    214 days
                  </p>
                  <p className="text-sm leading-4">0 USD</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-200 border-t-2 border-gray-300 flex">
              <div className="w-[200px]">
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">APR:</div>
                  <div className="text-sm font-semibold">0.00%</div>
                </div>
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
                        <span className="text-purple-600">CAKE2</span> EARNED
                      </p>
                      <p className="text-2xl font-bold">0.0545</p>
                      <p className="text-sm font-bold opacity-60">~ 0.57 USD</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg">
                      Harvest
                    </button>
                  </div>
                  <div className="border rounded-2xl border-gray-400 p-6 w-[calc(50%-10px)] flex items-center justify-between">
                    <div className="">
                      <p className="font-bold">
                        <span className="text-purple-600">WBNB</span> STAKED
                      </p>
                      <p className="text-2xl font-bold">0.03545</p>
                      <p className="text-sm font-bold opacity-60">~ 0.78 USD</p>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 text-[18px] font-bold rounded-md uppercase shadow-lg">
                      Harvest
                    </button>
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

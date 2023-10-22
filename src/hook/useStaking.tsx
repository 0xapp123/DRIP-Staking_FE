import { read, write } from "./utils";
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "../config/config";

export function useStaking() {
  const deposit = async (
    amount: bigint,
    boostMultiplier: bigint
  ) => {
    return write({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'deposit',
      args:[amount, boostMultiplier]
    })
  }

  const withdraw = async (
    amount: bigint,
  ) => {
    return write({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'withdraw',
      args:[amount]
    },
    )
  }

  const userInfo = async (accountAddress: string) => {
    return await read({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'userInfo',
      args: [accountAddress]
    })
  };

  const pending = async (accountAddress: string) => {
    return await read({
      address: STAKING_CONTRACT_ADDRESS,
      abi: STAKING_CONTRACT_ABI,
      functionName: 'pendingDrip',
      args: [accountAddress]
    })
  };

  return {
    deposit,
    withdraw,
    userInfo,
    pending
  };
}
import { useCallback } from "react";
import { etherscanBlockExplorers } from "wagmi";
import { targetChainId } from "../utils/contracts";

export function useEtherscan() {
  let explorerURL = etherscanBlockExplorers.mainnet.url;
  if (targetChainId === 5) {
    explorerURL = etherscanBlockExplorers.goerli.url;
  }

  const getTransactionUrl = useCallback(
    (hash: string) => `${explorerURL}/tx/${hash}`,
    [explorerURL]
  );

  const getAddressUrl = useCallback(
    (address: string) => `${explorerURL}/address/${address}`,
    [explorerURL]
  );

  return { getTransactionUrl, getAddressUrl };
}

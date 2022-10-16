import { useCallback } from "react";
import { etherscanBlockExplorers, useNetwork } from "wagmi";

export function useEtherscan() {
  const { chain } = useNetwork();
  let explorerURL = etherscanBlockExplorers.mainnet.url;
  if (chain?.id === 5) {
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

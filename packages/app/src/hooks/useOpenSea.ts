import { useCallback } from "react";
import { targetChainId } from "../utils/contracts";

export function useOpenSea() {
  let openSeaUrl = "https://opensea.io";
  let assetName = targetChainId === 5 ? "goerli" : "ethereum";

  if (targetChainId !== 1) {
    openSeaUrl = "https://testnets.opensea.io";
  }

  const getAssetUrl = useCallback(
    (contract: string, tokenId: string) =>
      `${openSeaUrl}/assets/${assetName}/${contract}/${tokenId}`,
    [openSeaUrl, assetName]
  );

  return { getAssetUrl };
}

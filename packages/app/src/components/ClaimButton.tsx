import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useEtherscan } from "../hooks/useEtherscan";
import { useIsMounted } from "../hooks/useIsMounted";
import { drops } from "../utils/contracts";
import { fetchPostJSON, ResponseError } from "../utils/fetch";
import { Button } from "./Button";
import { CustomConnectButton } from "./CustomConnectButton";
import { Mono } from "./Typography";

const TxArea = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: var(--background-emphasis);
  border-radius: 1rem;
`;

const TxMessage = styled(Mono)`
  padding: 1rem 1.5rem;
  text-align: center;
`;

interface Props {
  id: number;
  startsAt?: number;
  endsAt?: number;
}

export function ClaimButton({ id, startsAt, endsAt }: Props) {
  const isMounted = useIsMounted();
  const { address: connectedAddress } = useAccount();

  const {
    data: signatureRes,
    isLoading: isLoadingSignature,
    error: signatureError,
  } = useQuery(
    ["signature", connectedAddress, id],
    async () => {
      return await fetchPostJSON(`/api/signature/drop-${id}`, {
        address: connectedAddress,
      });
    },
    {
      retry: false,
      enabled: Boolean(connectedAddress),
    }
  );

  let errorMessage;
  if (signatureError && signatureError instanceof ResponseError) {
    switch (signatureError.code) {
      case "ALREADY_OWNED":
        errorMessage = "You already own this drop";
        break;
      case "NOT_AVAILABLE_FOR_ADDRESS":
        errorMessage = "Sadly your wallet is not in the snapshot for this drop";
        break;
      case "NOT_AVAILABLE_YET":
        errorMessage = "Cannot claim yet";
        break;
      case "NOT_AVAILABLE_ANYMORE":
        errorMessage = "Drop is no longer available";
        break;
      default:
        errorMessage = "Unable to claim this drop";
        break;
    }
  }

  const signature: `0x${string}` | undefined =
    signatureRes && signatureRes.signature;

  // Prepare the mint transaction
  const { config, error } = usePrepareContractWrite({
    ...drops,
    functionName: "claimDrop",
    args: [BigNumber.from(id), BigNumber.from(1), signature || "0x"],
    enabled: Boolean(signature),
  });

  if (error) {
    console.error(error);
  }

  // Send the transaction
  const {
    write,
    data: txData,
    isLoading: isWaitingOnWallet,
  } = useContractWrite(config);

  // Watch the for the transaction receipt
  const { isLoading: isWaitingOnTx, isSuccess } = useWaitForTransaction({
    confirmations: 1,
    hash: txData?.hash,
  });

  // Get the block explorer URL
  const { getTransactionUrl } = useEtherscan();
  const transactionLink = txData && getTransactionUrl(txData.hash);

  if (!isMounted) return null;

  const now = Date.now();

  if (startsAt && now < startsAt * 1000) {
    return (
      <TxArea>
        <TxMessage subdued>Cannot claim yet</TxMessage>
      </TxArea>
    );
  }

  if (endsAt && now > endsAt * 1000) {
    return (
      <TxArea>
        <TxMessage subdued>Drop is no longer available</TxMessage>
      </TxArea>
    );
  }

  const canClaim = Boolean(connectedAddress && signature && write && !error);

  return (
    <>
      {!connectedAddress ? (
        <CustomConnectButton notConnectedText="Connect to claim" />
      ) : (
        <TxArea>
          {isLoadingSignature && (
            <Button onClick={() => {}} isLoading>
              Generating signature
            </Button>
          )}

          {canClaim && !isLoadingSignature && (
            <Button
              onClick={() => write?.()}
              disabled={!canClaim || isSuccess}
              isLoading={isWaitingOnWallet || isWaitingOnTx}
            >
              {!isSuccess ? "Claim this drop" : "Claimed"}
            </Button>
          )}

          {isWaitingOnWallet && (
            <TxMessage subdued>Confirm in your wallet</TxMessage>
          )}

          {isWaitingOnTx && (
            <TxMessage subdued>
              <span>
                Transaction sending…{" "}
                {transactionLink && (
                  <>
                    <a href={transactionLink}>View on explorer</a> &rarr;
                  </>
                )}
              </span>
            </TxMessage>
          )}

          {isSuccess && (
            <TxMessage subdued>
              Transaction sent successfully!{" "}
              {transactionLink && (
                <>
                  <a href={transactionLink}>View on explorer</a> &rarr;
                </>
              )}
            </TxMessage>
          )}

          {errorMessage && <TxMessage subdued>{errorMessage}</TxMessage>}
        </TxArea>
      )}
    </>
  );
}

import styled from "@emotion/styled";
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
import { trpc } from "../utils/trpc";
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

  // Get the signature to see if it can be claimed
  const {
    data: signature,
    isLoading: isLoadingSignature,
    error: signatureError,
  } = trpc.getSignatureForDrop.useQuery(
    {
      dropId: id,
      address: connectedAddress,
    },
    { retry: false, enabled: Boolean(connectedAddress) }
  );

  // Get any error messages
  const errorMessage = signatureError && signatureError.message;

  // Prepare the mint transaction
  const prepare = usePrepareContractWrite({
    ...drops,
    functionName: "claimDrop",
    args: [BigNumber.from(id), BigNumber.from(1), signature || "0x"],
    enabled: Boolean(signature),
  });

  // Send the transaction
  const {
    write,
    data: txData,
    isLoading: isWaitingOnWallet,
  } = useContractWrite(prepare.config);

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

  const canClaim = Boolean(connectedAddress && signature);

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
              disabled={Boolean(!write || prepare.error || isSuccess)}
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

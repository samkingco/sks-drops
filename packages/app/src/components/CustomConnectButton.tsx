import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useENS } from "../hooks/useENS";
import { Button } from "./Button";

interface Props {
  notConnectedText?: string;
}

export function CustomConnectButton({
  notConnectedText = "Connect Wallet",
}: Props) {
  const { address: connectedAddress } = useAccount();
  const { displayName } = useENS(connectedAddress);

  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const connected = mounted && account && chain;

          return (
            <>
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal}>
                      {notConnectedText}
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal}>Wrong network</Button>
                  );
                }

                return (
                  <Button onClick={openAccountModal}>{displayName}</Button>
                );
              })()}
            </>
          );
        }}
      </ConnectButton.Custom>

      {/* <ConnectKitButton.Custom>
        {({ isConnected, show }) => {
          return (
            <Button onClick={show}>
              {isConnected ? displayName : notConnectedText}
            </Button>
          );
        }}
      </ConnectKitButton.Custom> */}
    </>
  );
}

import { ConnectKitProvider, getDefaultClient } from "connectkit";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { targetChainId } from "../utils/contracts";

// TODO: Replace with the project name, will show when connecting a wallet
const appName = "Drops from Sam King Studio";

// Get the alchemy API key to set up a provider
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const { chains, provider } = configureChains(
  defaultChains.filter((c) => c.id === targetChainId),
  [
    ...(alchemyId ? [alchemyProvider({ apiKey: alchemyId })] : []),
    publicProvider(),
  ]
);

const client = createClient(
  getDefaultClient({
    appName,
    alchemyId,
    chains: defaultChains.filter((c) => c.id === targetChainId),
  })
);

// export const client = createClient({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({
//       chains,
//       options: {
//         shimDisconnect: true,
//         shimChainChangedDisconnect: false,
//         UNSTABLE_shimOnConnectSelectAccount: true,
//       },
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         shimDisconnect: true,
//         name: (detectedName) =>
//           `Injected (${
//             typeof detectedName === "string"
//               ? detectedName
//               : detectedName.join(", ")
//           })`,
//       },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         qrcode: false,
//       },
//     }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName,
//         headlessMode: true,
//       },
//     }),
//   ],
//   provider,
// });

interface Props {
  children: React.ReactNode;
}

export function EthereumProviders({ children }: Props) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}

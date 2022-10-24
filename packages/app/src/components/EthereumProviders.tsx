import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
const appName = "SK web3";

// Filter chains to target chain ID
const targetChains = defaultChains.filter((c) => c.id === targetChainId);

// Get the alchemy API key to set up a provider
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export const { chains, provider, webSocketProvider } = configureChains(
  targetChains,
  [
    ...(alchemyApiKey ? [alchemyProvider({ apiKey: alchemyApiKey })] : []),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName,
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

interface Props {
  children: React.ReactNode;
}

export function EthereumProviders({ children }: Props) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

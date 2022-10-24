import { Global } from "@emotion/react";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Script from "next/script";
import { EthereumProviders } from "../components/EthereumProviders";
import { globalStyle } from "../components/GlobalStyle";
import SocialMeta from "../components/SocialMeta";

export const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocialMeta />
      <Global styles={globalStyle} />
      <EthereumProviders>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </EthereumProviders>
      <Script
        defer
        data-domain="drops.samking.studio"
        src="https://plausible.io/js/plausible.js"
        strategy="afterInteractive"
      />
    </>
  );
}

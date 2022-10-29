import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { EthereumProviders } from "../components/EthereumProviders";
import { globalStyle } from "../components/GlobalStyle";
import SocialMeta from "../components/SocialMeta";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocialMeta />
      <Global styles={globalStyle} />
      <EthereumProviders>
        <Component {...pageProps} />
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

export default trpc.withTRPC(MyApp);

import styled from "@emotion/styled";
import Link from "next/link";
import { CustomConnectButton } from "./CustomConnectButton";
import { Mono, Title } from "./Typography";

const Wrapper = styled.div`
  padding: 2em;
  max-width: 48em;
  margin: 0 auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;
  margin-bottom: 3em;

  @media (min-width: 32rem) {
    grid-template-columns: 1fr max-content;
    align-items: center;
  }
`;

const Footer = styled.footer`
  display: flex;
  gap: 1em;
  margin-top: 3em;
`;

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Wrapper>
      <Main>
        <Header>
          <div>
            <Title>
              <Link href="/">
                <a>Drops</a>
              </Link>
            </Title>
            <Mono subdued margin="-8 0 0">
              From <a href="https://samking.studio">Sam King Studio</a>
            </Mono>
          </div>
          <CustomConnectButton />
        </Header>

        {children}
      </Main>

      <Footer>
        <Mono subdued>
          <Link href="/license">
            <a>License</a>
          </Link>
        </Mono>
        <Mono subdued>&bull;</Mono>
        <Mono subdued>
          <Link href="/contract">
            <a>Contract</a>
          </Link>
        </Mono>
      </Footer>
    </Wrapper>
  );
}

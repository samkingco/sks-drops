import styled from "@emotion/styled";
import dropOneMetadata from "@sks-drops/tokens/drop-1/metadata.json";
import { CustomConnectButton } from "../components/CustomConnectButton";
import { DropCard } from "../components/DropCard";
import { Mono, Title } from "../components/Typography";

const Wrapper = styled.div`
  padding: 2rem 2rem 8rem;
  max-width: 48em;
  margin: 0 auto;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;
  align-items: baseline;
  margin-bottom: 3em;

  @media (min-width: 32rem) {
    grid-template-columns: 1fr max-content;
    align-items: baseline;
  }
`;

export default function HomePage() {
  return (
    <Wrapper>
      <Header>
        <div>
          <Title>Drops</Title>
          <Mono subdued margin="-8 0 0">
            From <a href="https://samking.studio">Sam King Studio</a>
          </Mono>
        </div>
        <CustomConnectButton />
      </Header>

      <DropCard id={1} {...dropOneMetadata} />
    </Wrapper>
  );
}

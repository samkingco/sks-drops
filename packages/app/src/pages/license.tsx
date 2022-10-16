import styled from "@emotion/styled";
import Link from "next/link";
import { Body, Mono, Title } from "../components/Typography";

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 48em;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const List = styled.ul`
  margin-top: 0;
  padding-left: 0.5em;
  list-style: none;

  li {
    position: relative;
    display: flex;
    padding-left: 1.25em;
    padding-right: 0;
  }

  li + li {
    margin-top: 0.25em;
  }

  li:before {
    content: "✼";
    position: absolute;
    left: 0;
    opacity: 0.48;
  }
`;

export default function License() {
  return (
    <Wrapper>
      <Link href="/">
        <a>
          <Mono as="span" subdued>
            &larr; Drops
          </Mono>
        </a>
      </Link>
      <Title margin="24 0 0">License</Title>
      <Body>
        Token metadata and images licensed as{" "}
        <a href="https://creativecommons.org/licenses/by-nc/4.0/">
          CC BY-NC 4.0
        </a>
      </Body>
      <Body>You are free to:</Body>
      <List>
        <li>
          <Body>
            <Mono as="span">Share:</Mono> copy and redistribute the material in
            any medium or format.
          </Body>
        </li>
        <li>
          <Body>
            <Mono as="span">Adapt:</Mono> remix, transform, and build upon the
            material.
          </Body>
        </li>
      </List>

      <Body>Under the following terms:</Body>
      <List>
        <li>
          <Body>
            <Mono as="span">Attribution:</Mono> You must give appropriate
            credit, provide a link to the license, and indicate if changes were
            made. You may do so in any reasonable manner, but not in any way
            that suggests the licensor endorses you or your use.
          </Body>
        </li>
        <li>
          <Body>
            <Mono as="span">NonCommercial:</Mono> You may not use the material
            for commercial purposes.
          </Body>
        </li>
        <li>
          <Body>
            <Mono as="span">No additional restrictions:</Mono> You may not apply
            legal terms or technological measures that legally restrict others
            from doing anything the license permits.
          </Body>
        </li>
      </List>
    </Wrapper>
  );
}

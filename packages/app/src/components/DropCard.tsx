import styled from "@emotion/styled";
import Image from "next/image";
import { drops } from "../utils/contracts";
import { ClaimButton } from "./ClaimButton";
import { Markdown } from "./Markdown";
import { Heading, Mono } from "./Typography";

const ImageWrapper = styled.div`
  border-radius: 1em;
  overflow: hidden;
  line-height: 0;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2em;
`;

interface Attribute {
  trait_type: string;
  value: any;
}

interface Props {
  id: number;
  name: string;
  description: string;
  attributes?: Attribute[];
}

export function DropCard({ id, name, description, attributes }: Props) {
  const dropDate =
    attributes && attributes.find((i) => i.trait_type == "Drop date")?.value;

  return (
    <Wrapper>
      <ImageWrapper>
        <a href={`https://opensea.io/assets/ethereum/${drops.address}/${id}`}>
          <Image src={`/drop-${id}-web.jpg`} width={2048} height={2048} />
        </a>
      </ImageWrapper>

      <div>
        <Mono subdued margin="0 0 8">
          Drop #{id}
          {dropDate ? ` — ${dropDate}` : null}
        </Mono>
        <Heading>{name}</Heading>
        <Markdown>{description}</Markdown>
      </div>

      <ClaimButton id={id} />
    </Wrapper>
  );
}

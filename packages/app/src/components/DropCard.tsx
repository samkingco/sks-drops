import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useOpenSea } from "../hooks/useOpenSea";
import { drops } from "../utils/contracts";
import { Drop } from "../utils/drops";
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
  margin-bottom: 4em;
`;

export function DropCard({
  id,
  name,
  description,
  attributes,
  startsAt,
  endsAt,
  webImageWidth,
  webImageHeight,
}: Drop) {
  const dropDate =
    attributes && attributes.find((i) => i.trait_type == "Drop date")?.value;
  const { getAssetUrl } = useOpenSea();

  return (
    <Wrapper>
      <ImageWrapper>
        <a href={getAssetUrl(drops.address, id.toString())}>
          <Image
            src={`/drop-${id}-web.jpg`}
            width={webImageWidth}
            height={webImageHeight}
          />
        </a>
      </ImageWrapper>

      <div>
        <Mono subdued margin="0 0 8">
          Drop #{id}
          {dropDate ? ` — ${dropDate}` : null}
        </Mono>
        <Heading>
          <Link href={`/drops/${id}`}>
            <a>{name}</a>
          </Link>
        </Heading>
        <Markdown>{description}</Markdown>
      </div>

      <ClaimButton id={id} startsAt={startsAt} endsAt={endsAt} />
    </Wrapper>
  );
}

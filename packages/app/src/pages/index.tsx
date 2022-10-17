import dropOneMetadata from "@sks-drops/tokens/drop-1/metadata.json";
import { DropCard } from "../components/DropCard";
import { Layout } from "../components/Layout";

export default function HomePage() {
  return (
    <Layout>
      <DropCard id={1} {...dropOneMetadata} />
    </Layout>
  );
}

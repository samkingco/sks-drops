import { DropCard } from "../components/DropCard";
import { Layout } from "../components/Layout";
import { DROP_1, DROP_2 } from "../utils/drops";

export default function HomePage() {
  return (
    <Layout>
      <DropCard {...DROP_2} />
      <DropCard {...DROP_1} />
    </Layout>
  );
}

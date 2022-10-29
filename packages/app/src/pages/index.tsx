import { DropCard } from "../components/DropCard";
import { Layout } from "../components/Layout";
import { allDropsOrdered } from "../utils/drops";

export default function HomePage() {
  return (
    <Layout>
      {allDropsOrdered.map((drop) => (
        <DropCard key={drop.id} {...drop} />
      ))}
    </Layout>
  );
}

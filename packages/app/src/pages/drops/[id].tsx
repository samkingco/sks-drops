import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { DropCard } from "../../components/DropCard";
import { Layout } from "../../components/Layout";
import SocialMeta from "../../components/SocialMeta";
import { allDrops, Drop } from "../../utils/drops";
import { firstParam } from "../../utils/firstParam";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<{
  drop: Drop;
}> = async (context) => {
  const { id } = context.params as IParams;
  const dropIdParam = firstParam(id);

  const drop = allDrops.find(
    (i) => dropIdParam && i.id === parseInt(dropIdParam, 10)
  );

  if (!drop) {
    return {
      notFound: true,
    };
  }

  return {
    props: { drop },
  };
};

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const paths = allDrops.map((i) => ({ params: { id: i.id.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export default function DropPage({
  drop,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <SocialMeta
        title={`${drop.name} — Drop #${drop.id}`}
        description={drop.description}
        socialImage={`/social/og-drop-${drop.id}.jpg`}
      />
      <Layout>
        <DropCard {...drop} />
      </Layout>
    </>
  );
}

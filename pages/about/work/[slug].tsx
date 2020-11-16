import React from "react";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { groq } from "next-sanity";
import { PostTitle } from "components/ui/PostTitle";
import { Layout } from "components/core/Layout";
import Image from "next/image";
import { getClient, urlFor, createBlockContent } from "utils/sanity";

const query = groq`*[_type == "work" && slug.current == $slug][0] {
  ...,
  "mainImage": mainImage.asset->{
    url,
    metadata {
      dimensions,
    }
  }
}`;

type Props = {
  workData?: any;
  preview?: boolean;
};

const Work = ({ workData, preview }: Props) => {
  const router = useRouter();
  const { locale } = router;

  if (!router.isFallback && !workData.slug.current) {
    return <ErrorPage statusCode={404} />;
  }

  const imageUrl = workData && urlFor(workData.mainImage).url();
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="my-32">
            <Head>
              <title>{workData.company} | #</title>
            </Head>
            <Layout size="md">
              <div className="mb-12">
                <PostTitle>{workData.company}</PostTitle>
              </div>
            </Layout>
            <div className="mb-12 md:mb-16 sm:mx-0 h-64 md:h-128 w-full flex items-center overflow-hidden justify-center">
              <Image
                src={workData.mainImage.url}
                width={workData.mainImage.metadata.dimensions.width}
                height={workData.mainImage.metadata.dimensions.height}
              />
            </div>
            <Layout size="xs">
              {createBlockContent(workData.body[locale])}
              <div className="text-lg font-bold text-action text-center my-12">
                # MERCI
              </div>
            </Layout>
          </article>
        </>
      )}
    </>
  );
};

export default Work;

export async function getStaticProps({ params, preview = false }) {
  const workData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  return {
    props: { preview, workData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "work" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

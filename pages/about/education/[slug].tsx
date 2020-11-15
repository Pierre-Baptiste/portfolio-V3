import React from "react";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { groq } from "next-sanity";
import { PostTitle } from "components/ui/PostTitle";
import { PostBody } from "components/ui/PostBody";
import { Layout } from "components/core/Layout";
import { DateFormatter } from "components/core/date-formatter";
import { CoverImage } from "components/ui/CoverImage";
import Image from "next/image";
import {
  getClient,
  usePreviewSubscription,
  urlFor,
  createBlockContent,
} from "utils/sanity";
const BlockContent = require("@sanity/block-content-to-react");
import css from "./work-styles.module.css";

const query = groq`*[_type == "education" && slug.current == $slug][0] {
  ...,
  "mainImage": mainImage.asset->{
    url,
    metadata {
      dimensions,
    }
  }
}`;

type Props = {
  educationData?: any;
  preview?: boolean;
};

const Education = ({ educationData, preview }: Props) => {
  const router = useRouter();
  const { locale } = router;

  if (!router.isFallback && !educationData.slug.current) {
    return <ErrorPage statusCode={404} />;
  }

  const imageUrl = educationData && urlFor(educationData.mainImage).url();
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="my-32">
            <Head>
              <title>{educationData.school[locale]} | #</title>
            </Head>
            <Layout size="md">
              <div className="mb-12">
                <PostTitle>{educationData.school[locale]}</PostTitle>
              </div>
            </Layout>
            <div className="mb-12 md:mb-16 sm:mx-0 h-64 md:h-128 w-full flex items-center overflow-hidden">
              <Image
                src={educationData.mainImage.url}
                width={educationData.mainImage.metadata.dimensions.width}
                height={educationData.mainImage.metadata.dimensions.height}
              />
            </div>
            <Layout size="xs">
              {createBlockContent(educationData.body[locale])}
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

export default Education;

export async function getStaticProps({ params, preview = false }) {
  const educationData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  return {
    props: { preview, educationData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "education" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

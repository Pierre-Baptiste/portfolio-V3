import React from "react";

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import { groq } from "next-sanity";
import { PostTitle } from "components/ui/PostTitle";
import { Layout } from "components/core/Layout";
import { DateFormatter } from "components/core/date-formatter";
import Image from "next/image";
import { getClient, urlFor, createBlockContent } from "utils/sanity";

const query = groq`*[_type == "project" && slug.current == $slug][0] {
  ...,
  "mainImage": mainImage.asset->{
    url,
    metadata {
      dimensions,
    }
  }
}`;

type Props = {
  projectData?: any;
  preview?: boolean;
};

const Project = ({ projectData, preview }: Props) => {
  const router = useRouter();
  const { locale } = router;

  if (!router.isFallback && !projectData.slug.current) {
    return <ErrorPage statusCode={404} />;
  }

  const imageUrl = projectData && urlFor(projectData.mainImage).url();
  return (
    <>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article className="my-32">
            <Head>
              <title>{projectData.heading[locale]} | #</title>
            </Head>
            <Layout size="md">
              <div className="mb-12">
                <PostTitle
                  year={() => (
                    <DateFormatter
                      dateString={projectData.year}
                      format="yyyy"
                    />
                  )}
                >
                  {projectData.heading[locale]}
                </PostTitle>
              </div>
            </Layout>
            <div className="mb-12 md:mb-16 sm:mx-0 h-64 md:h-128 w-full flex items-center overflow-hidden">
              <Image
                src={projectData.mainImage.url}
                width={projectData.mainImage.metadata.dimensions.width}
                height={projectData.mainImage.metadata.dimensions.height}
              />
            </div>
            <Layout size="xs">
              {createBlockContent(projectData.body[locale])}
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

export default Project;

export async function getStaticProps({ params, preview = false }) {
  const projectData = await getClient(preview).fetch(query, {
    slug: params.slug,
  });

  return {
    props: { preview, projectData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { WorkCard } from "components/ui/WorkCard";
import { FormattedMessage } from "react-intl";
import { getClient } from "utils/sanity";
import { groq } from "next-sanity";

const query = groq`*[_type == "project" ]`;

export default function Projects({ projectData }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <Layout>
          <Hero page="works" />
          <div className="flex flex-wrap max-w-4xl mx-auto justify-between my-4">
            {projectData.length > 0 &&
              projectData.map((work) => {
                return (
                  <div key={work._id} className="w-72 my-2 px-2 h-80">
                    <WorkCard {...work} />
                  </div>
                );
              })}
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const projectData = await getClient().fetch(query);

  return {
    props: { projectData },
  };
}

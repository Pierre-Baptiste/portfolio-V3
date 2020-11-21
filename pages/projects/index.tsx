import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { WorkCard } from "components/ui/WorkCard";
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
          <Hero page="projects" />
          <div className="mx-auto max-w-4xl my-4">
            <div className="flex flex-wrap flex-col sm:flex-row justify-between mx-auto -my-4">
              {projectData.length > 0 &&
                projectData.map((work) => {
                  return (
                    <div
                      key={work._id}
                      className="w-full sm:w-1/2 lg:w-72 my-4 px-2 h-80"
                    >
                      <WorkCard {...work} />
                    </div>
                  );
                })}
            </div>
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

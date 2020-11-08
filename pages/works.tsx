import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { WorkCard } from "components/ui/WorkCard";
import { FormattedMessage } from "react-intl";
import { getAllPosts } from "lib/api";

export default function Works({ allPosts }) {
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
            {allPosts.length > 0 &&
              allPosts.map((post) => {
                return (
                  <div key={post.slug} className="w-72 my-2">
                    <WorkCard {...post} />
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
  const { locale } = context;
  /* const allPosts = getAllPosts(
    "works",
    ["title", "date", "slug", "coverImage", "excerpt"],
    locale
  ); */

  const allPosts = [];

  return {
    props: { allPosts },
  };
}

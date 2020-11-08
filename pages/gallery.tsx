import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

export default function Works() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <Layout>
          <Hero page="gallery" />
        </Layout>
      </main>
    </>
  );
}

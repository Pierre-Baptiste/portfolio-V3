import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { FormattedMessage } from "react-intl";
/* import Typist from "react-typist"; */
import { useRouter } from "next/router";

const blueDot = <span className="text-action">.</span>;

/* const Animation = (locale) => {
  return (
    <Typist startDelay={1000}>
      <span>
        Pierre-Baptiste
        {blueDot}
      </span>
      <Typist.Backspace count={16} delay={1000} />
      <span>
        {locale === "fr" ? "ingénieur" : "an engineer"}
        {blueDot}
      </span>
      <Typist.Backspace count={10} delay={1000} />
      <span>
        {locale === "fr" ? "développeur" : "a developer"}
        {blueDot}
      </span>
      <Typist.Backspace count={12} delay={1000} />
      <span>
        {locale === "fr" ? "passionné" : "passionate"}
        {blueDot}
      </span>
    </Typist>
  );
}; */

export default function Home() {
  const router = useRouter();
  const { locale } = router;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <div
          style={{
            backgroundImage: "url(/assets/landing/landing.jpg)",
            maxWidth: "1920px",
            backgroundPosition: "85% top",
          }}
          className="h-screen w-screen bg-cover fixed"
        >
          <Layout>
            <div className="text-6xl font-extrabold font-sans leading-none mt-48">
              <FormattedMessage
                id="landing.title.hello"
                description="landing title element - hello"
                defaultMessage="Hello"
              />
              ,
              <div className="flex flex-row">
                <FormattedMessage
                  id="landing.title.iam"
                  description="landing title element - i am"
                  defaultMessage="I am"
                />
                &nbsp;
                {/* {Animation(locale)} */}
              </div>
            </div>
          </Layout>
        </div>
      </main>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";

import Head from "next/head";
import Image from "next/image";
import { Layout } from "components/core/Layout";
import { FormattedMessage } from "react-intl";
import Typist from "react-typist";
import { Facebook, Twitter, Linkedin, GitHub, Mail } from "react-feather";
import Link from "next/link";
import "react-typist/dist/Typist.css";

import { useRouter } from "next/router";

const blueDot = <span className="text-action">.</span>;

const Social = ({ renderIcon, href }) => {
  return (
    <Link href={href}>
      <div className="my-4 text-gray-600 hover:scale-150 transform hover:text-action transition-all duration-150 cursor-pointer">
        {renderIcon(20)}
      </div>
    </Link>
  );
};

export default function Home() {
  const router = useRouter();
  const { locale } = router;

  const [imageLoaded, setImageLoaded] = useState(false);

  const image = useRef(null);

  useEffect(() => {
    if (image?.current?.complete) {
      setImageLoaded(true);
    }
  }, [image]);

  return (
    <>
      <Head>
        <title>Pierre-Baptiste 👨🏼‍💻</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <div className="h-screen w-screen bg-cover bg-paper fixed">
          <Layout>
            <div className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl lg:font-extrabold font-bold font-sans leading-none xl:mt-48 lg:mt-32 md:mt-32 sm:mt-24 mt-16 z-50">
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
                <Typist startDelay={1000}>
                  <span>
                    Pierre-Baptiste
                    {blueDot}
                  </span>
                </Typist>
              </div>
            </div>
          </Layout>
          <div className="fixed left-0 bottom-0 top-0 right-0 flex justify-start mx-auto max-w-container px-6 pointer-events-none">
            <div className="flex items-end pointer-events-auto">
              <div className="flex flex-col">
                <div className="my-6">
                  <Social
                    renderIcon={(size) => <Facebook size={size} />}
                    href="https://www.facebook.com/pierrebaptiste.dupire"
                  />
                  <Social
                    renderIcon={(size) => <Linkedin size={size} />}
                    href="https://www.linkedin.com/in/pb-dupire/"
                  />
                  <Social
                    renderIcon={(size) => <Twitter size={size} />}
                    href="https://twitter.com/PBDupire"
                  />
                  <Social
                    renderIcon={(size) => <GitHub size={size} />}
                    href="https://github.com/Pierre-Baptiste"
                  />
                  <Social
                    renderIcon={(size) => <Mail size={size} />}
                    href={"mailto:p.b.dupire@gmail.com"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 left-0 z-0 md:mt-32 xl:mr-40 lg:mr-24 md:-mr-8 sm:mr-0 -mr-32 mt-48 pointer-events-none">
            <div
              className={`${
                imageLoaded ? "opacity-0" : "opacity-100"
              } absolute right-0 transition-opacity duration-1000 ease-in-out`}
            >
              <img src="/bg.svg" width={570} height={1000} ref={image} />
            </div>
            <div
              className={`${
                imageLoaded ? "opacity-100" : "opacity-0"
              } absolute right-0 transition-opacity duration-1000 ease-in-out`}
            >
              <Image
                src="/bg.png"
                width={570}
                height={1000}
                quality={100}
                priority={true}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

import React from "react";

import { FormattedMessage } from "react-intl";
import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { DateFormatter } from "components/core/date-formatter";
import Link from "next/link";

import Image from "next/image";
import { groq } from "next-sanity";
import { getClient, urlFor } from "utils/sanity";
import { useRouter } from "next/router";

const query = groq`*[_type in ["work", "education", "skill"]]`;

const Title = ({ titleId }) => (
  <h1 className="font-sans text-2xl font-bold">
    <FormattedMessage
      id={`about.${titleId}`}
      description={`title element - ${titleId}`}
      defaultMessage={titleId}
    />
  </h1>
);

const Elements = ({
  data,
  locale,
  type,
}: {
  data: any;
  locale: string;
  type: "work" | "education";
}) => (
  <div className="flex flex-col mt-4 mb-12">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className=" overflow-hidden sm:rounded-lg ">
          <table className="min-w-full">
            <tbody className="bg-white ">
              {data.map((el, index) => {
                const logoUrl = el.logo && urlFor(el.logo).url();
                const lastItemIndex = data.length - 1;
                return (
                  <Link
                    as={`/about/${type}/${el.slug.current}`}
                    href={`/about/${type}/[slug]`}
                    key={el.tile}
                  >
                    <tr
                      className={`flex flex-row w-full items-center md:px-4 py-4 px-1 hover:bg-gray-100 cursor-pointer transition-colors duration-100 ${
                        index !== lastItemIndex && "border-b"
                      }`}
                    >
                      <td className="flex md:px-4 px-1">
                        <div className="flex-shrink-0 h-12 w-12">
                          <Image
                            className="h-12 w-12 rounded-full"
                            src={logoUrl}
                            width={100}
                            height={100}
                            alt={el.logo.alt}
                          />
                        </div>
                      </td>
                      <td className="w-full flex md:flex-row md:items-center flex-col">
                        <td className="lg:w-1/2 md:w-1/2 flex md:flex-col pl-4 md:pr-12">
                          <div className="leading-5 font-medium flex-wrap flex">
                            <span className="hover:underline">
                              {type === "education"
                                ? el.school[locale || "en"]
                                : el.company}
                            </span>
                          </div>
                        </td>
                        <td className="flex justify-between lg:w-1/2 md:w-1/2 px-4">
                          <div className="flex flex-col">
                            <div className="text-sm leading-5 text-gray-600">
                              {type === "education"
                                ? el.diploma && el.diploma[locale || "en"]
                                : el.role[locale || "en"]}
                            </div>
                            <div className="text-sm leading-5 text-gray-600 whitespace-no-wrap">
                              <DateFormatter
                                dateString={el.beginning}
                                format="MMM yyyy"
                                locale={locale}
                              />{" "}
                              -{" "}
                              <DateFormatter
                                dateString={el.end}
                                format="MMM yyyy"
                                locale={locale}
                              />
                            </div>
                          </div>
                        </td>
                      </td>
                    </tr>
                  </Link>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const LogoElements = ({ skills }) => {
  return (
    <div className="flex justify-center flex-wrap mx-12 my-12">
      {skills.map((skill) => {
        const logoUrl = skill.logo && urlFor(skill.logo).url();
        return (
          <div className="m-2 transition-transform flex items-center transform hover:scale-110 duration-150">
            <img src={logoUrl} className="h-12" alt={skill.logo.alt} />
          </div>
        );
      })}
    </div>
  );
};

export default function About({ aboutData }) {
  const router = useRouter();
  const { locale } = router;

  const data = aboutData.reduce(
    (acc, curr) => {
      if (curr._type === "work") {
        acc.work.push(curr);
      } else if (curr._type === "education") {
        acc.education.push(curr);
      } else if (curr._type === "skill") {
        acc.skills.push(curr);
      }
      return acc;
    },
    { work: [], education: [], skills: [] }
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <Layout size="sm">
          <Hero page="about" />
          <Title titleId="experiences" />
          <Elements data={data.work} locale={locale} type="work" />
          <Title titleId="education" />
          <Elements data={data.education} locale={locale} type="education" />
          <Title titleId="skills" />
          <Layout size="xs">
            <LogoElements skills={data.skills} />
          </Layout>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const aboutData = await getClient().fetch(query);

  return {
    props: { aboutData },
  };
}

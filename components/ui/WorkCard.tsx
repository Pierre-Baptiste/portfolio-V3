import React from "react";
import Link from "next/link";
import { getClient, usePreviewSubscription, urlFor } from "utils/sanity";

import { DateFormatter } from "components/core/date-formatter";
import { CoverImage } from "components/ui/CoverImage";

import { useRouter } from "next/router";

const WorkCard = ({ heading, mainImage, year, blurb, slug }) => {
  const router = useRouter();
  const { locale } = router;

  const imageUrl = mainImage && urlFor(mainImage).url();
  return (
    <div className="border-2 rounded border-black h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <Link as={`/works/${slug.current}`} href="/works/[slug]">
        <div className="cursor-pointer">
          <div className="h-40 flex items-center overflow-hidden">
            <img src={imageUrl} alt="test" />
            {/* <CoverImage slug={slug.current} title={title} {...coverImage} /> */}
          </div>
          <div className="mx-4">
            <div className="mb-2 mt-4 text-gray-600 text-sm">
              <DateFormatter dateString={year} format="yyyy" />
            </div>
            <h3 className="text-base mb-2 leading-snug font-semibold">
              <a className="hover:underline">{`• ${heading[locale]} •`}</a>
            </h3>

            <p className="text-xs mb-4 text-gray-800">{blurb[locale]}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { WorkCard };

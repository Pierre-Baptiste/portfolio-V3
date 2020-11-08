import React from "react";
import Link from "next/link";

import { DateFormatter } from "components/core/date-formatter";
import { CoverImage } from "components/ui/CoverImage";

const WorkCard = ({ title, coverImage, date, excerpt, slug }) => {
  return (
    <div className="border-2 rounded border-black h-full hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <Link as={`/works/${slug}`} href="/works/[slug]">
        <div className="cursor-pointer">
          <div className="h-40 flex items-center overflow-hidden">
            <CoverImage slug={slug} title={title} {...coverImage} />
          </div>
          <div className="mx-4">
            <div className="mb-2 mt-4 text-gray-600 text-sm">
              <DateFormatter dateString={date} />
            </div>
            <h3 className="text-base mb-2 leading-snug font-semibold">
              <a className="hover:underline">{`• ${title} •`}</a>
            </h3>

            <p className="text-xs mb-4 text-gray-800">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { WorkCard };

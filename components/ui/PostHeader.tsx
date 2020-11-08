import React from "react";
import { DateFormatter } from "components/core/date-formatter";
import { CoverImage } from "components/ui/CoverImage";
import { PostTitle } from "components/ui/PostTitle";

const PostHeader = ({ title, coverImage, date, author }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg text-gray-600">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export { PostHeader };

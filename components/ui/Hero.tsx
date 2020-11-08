import React from "react";
import { FormattedMessage } from "react-intl";

const Hero = ({ page }) => {
  return (
    <div className="my-8">
      <div className="font-bold text-center text-2xl mb-6">
        <FormattedMessage
          id={`${page}.hero.title`}
          description={`hero title element - title`}
          defaultMessage="Title"
        />
      </div>
      <div className="text-center max-w-3xl text-xs mx-auto text-gray-800">
        <FormattedMessage
          id={`${page}.hero.subtitle`}
          description={`hero title element - subtitle`}
          defaultMessage="SubTitle"
        />
      </div>
    </div>
  );
};

export { Hero };

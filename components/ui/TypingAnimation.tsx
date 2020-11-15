import React from "react";
import Typing from "react-typing-animation";
import { FormattedMessage } from "react-intl";
const blueDot = <span className="text-action">.</span>;

const TypingAnimation = ({ locale }) => {
  return (
    <Typing
      startDelay={500}
      loop={true}
      cursor={<span className="text-black">|</span>}
    >
      <span>
        Pierre-Baptiste
        {blueDot}
      </span>
      <Typing.Backspace count={16} delay={1000} speed={0.25} />
    </Typing>
  );
};

export { TypingAnimation };

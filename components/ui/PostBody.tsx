import React from "react";
import markdownStyles from "./markdown-styles.module.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

const PostBody = ({ content }) => {
  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter
          style={materialOceanic}
          language={language}
          children={value}
        />
      );
    },
    paragraph: (props) => {
      const { node, children } = props;
      return <p className="my-4">{children}</p>;
    },
    heading: (props) => {
      const { level, children } = props;
      const sizeMap = {
        1: "text-4xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
        2: "text-3xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
        3: "text-2xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
        4: "text-xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
        5: "text-xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
        6: "text-xl font-extrabold mb-8 md:mt-16 mt-12 uppercase font-sans",
      };
      switch (level) {
        case 1:
          return <h1 className={sizeMap[level]}>{children}</h1>;
        case 2:
          return <h2 className={sizeMap[level]}>{children}</h2>;
        case 3:
          return <h3 className={sizeMap[level]}>{children}</h3>;
        case 4:
          return <h4 className={sizeMap[level]}>{children}</h4>;
        case 5:
          return <h5 className={sizeMap[level]}>{children}</h5>;
        case 6:
          return <h6 className={sizeMap[level]}>{children}</h6>;
        default:
          return <h6 className={sizeMap[level]}>{children}</h6>;
      }
    },
    image: (props) => {
      const { src, alt } = props;
      const slug = src.split("$");
      const imageSrc = slug[0];
      const [width, height] = slug[1].split("x");
      return <Image src={imageSrc} alt={alt} height={height} width={width} />;
    },
    emphasis: (props) => {
      const { node, children } = props;
      return (
        <em className="italic text-gray-500 flex justify-end pr-8">
          {children}
        </em>
      );
    },
    list: (props) => {
      const { node, children } = props;
      return <ul className="list-disc pl-12">{children}</ul>;
    },
  };

  return (
    <div className="text-sm leading-snug text-gray-700">
      <ReactMarkdown escapeHtml={true} source={content} renderers={renderers} />
    </div>
  );
};

export { PostBody };

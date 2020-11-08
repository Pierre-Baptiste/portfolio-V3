import remark from "remark";
import html from "remark-html";
import ReactMarkdown from "react-markdown";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return {
    react: <ReactMarkdown source={markdown} />,
    html: result.toString(),
  };
  /* return result.toString(); */
}

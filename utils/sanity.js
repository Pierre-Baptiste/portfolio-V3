import {
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from "next-sanity";

const BlockContent = require("@sanity/block-content-to-react");

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
};

if (!config.projectId) {
  throw Error("The Project ID is not set. Check your environment variables.");
}
if (!config.dataset) {
  throw Error("The dataset name is not set. Check your environment variables.");
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

const BlockRenderer = (props) => {
  const { style = "p" } = props.node;

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, "");
    return React.createElement(
      style,
      {
        className: `heading-${level} text-2xl font-bold mb-8 md:mt-16 mt-12 uppercase font-sans text-black`,
      },
      props.children
    );
  }

  if (style === "blockquote") {
    return <blockquote>- {props.children}</blockquote>;
  }

  if (style === "p") {
    return React.createElement(
      style,
      {
        className: `my-4`,
      },
      props.children
    );
  }

  if (style === "normal") {
    return React.createElement(
      style,
      {
        className: `my-4`,
      },
      props.children
    );
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

const highlight = (props) => {
  return (
    <span className="text-5xl leading-5 font-serif font-bold text-black">
      {props.children}
    </span>
  );
};

export const createBlockContent = (blocks) => {
  return (
    <BlockContent
      blocks={blocks}
      {...config}
      serializers={{
        container: (props) => {
          return (
            <div className="text-sm leading-5 text-gray-700 pt-8">
              {props.children}
            </div>
          );
        },
        types: {
          code: (props) => (
            <pre data-language={props.node.language}>
              <code>{props.node.code}</code>
            </pre>
          ),
          block: BlockRenderer,
        },
        list: (props) => <ul className="list-disc pl-12">{props.children}</ul>,
        marks: { highlight },
      }}
    />
  );
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);
// Set up a preview client with serverless authentication for drafts

export const previewClient = createClient({
  ...config,
  useCdn: false,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient;

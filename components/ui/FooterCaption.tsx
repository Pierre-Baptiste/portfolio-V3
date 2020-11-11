import React from "react";

const Caption = ({ isModal, ...props }) => {
  const Tag = props.href ? "a" : "span";

  return <Tag {...props} />;
};

const FooterCaption = (props) => {
  const { currentView, isModal } = props;
  const { url, caption } = currentView;

  return (
    <span>
      {caption ? (
        <Caption
          href={url}
          target={url ? "_blank" : null}
          isModal={isModal}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {caption}
        </Caption>
      ) : null}
    </span>
  );
};

export { FooterCaption };

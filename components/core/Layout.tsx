import React from "react";
import cn from "classnames";

const Layout = ({ children, size = "lg" }) => {
  return (
    <div
      className={cn("px-6 m-auto", {
        "max-w-container": size === "lg",
        "max-w-screen-xl": size === "md",
        "max-w-screen-lg": size === "sm",
        "max-w-2xl": size === "xs",
      })}
    >
      {children}
    </div>
  );
};

export { Layout };

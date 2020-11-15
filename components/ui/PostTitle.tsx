import React from "react";

const PostTitle = ({ children, year }: { children: any; year?: any }) => {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none font-sans">
        {children}
      </h1>
      <div className="mt-1 text-lg text-gray-500">
        {typeof year === "function" ? year() : null}
      </div>
    </div>
  );
};

export { PostTitle };

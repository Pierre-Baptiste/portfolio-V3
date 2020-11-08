import React, { useState } from "react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { Layout } from "components/core/Layout";

import { Menu } from "react-feather";

const AppBar = () => {
  const router = useRouter();
  const { locale } = router;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = [
    { href: "/", labelId: "home" },
    { href: "/works", labelId: "works" },
    { href: "/about", labelId: "about" },
    { href: "/gallery", labelId: "gallery" },
    { href: "/contact", labelId: "contact" },
  ];

  const menuItems = content
    .map((link, index) => (
      <Link href={link.href} key={link.labelId}>
        <a className="inline-flex px-3 text-lightgray items-center hover:text-action font-mono font-hairline text-xs">
          {`0${index + 1} : `}
          <FormattedMessage
            id={`app_bar.${link.labelId}`}
            description={`app bar menu item - ${link.labelId}`}
            defaultMessage={link.labelId}
          />
        </a>
      </Link>
    ))
    .flatMap((value, index, array) =>
      array.length - 1 !== index // check for the last item
        ? [value, " | "]
        : value
    );

  const dropDownMenuItems = content.map((link, index) => (
    <Link href={link.href} key={link.labelId + "dropdown"}>
      <a className="px-4 py-3 hover:bg-paper transition-colors duration-200 ease-in-out text-lightgray hover:text-action font-mono font-hairline text-xs">
        {`0${index + 1} : `}
        <FormattedMessage
          id={`app_bar.${link.labelId}`}
          description={`app bar menu item - ${link.labelId}`}
          defaultMessage={link.labelId}
        />
      </a>
    </Link>
  ));

  const languageItems = ["En", "Fr"]
    .map((language) => (
      <Link
        href={router.pathname}
        locale={language.toLowerCase()}
        key={language}
      >
        <a
          className={`lg:inlineflex px-1 font-hairline text-xs font-mono ${
            locale.toLowerCase() === language.toLowerCase()
              ? "text-action"
              : "text-lightgray"
          } items-center hover:text-action`}
        >
          {language}
        </a>
      </Link>
    ))
    .flatMap((value, index, array) =>
      array.length - 1 !== index // check for the last item
        ? [value, " | "]
        : value
    );

  return (
    <div className="bg-white absolute top-0 right-0 left-0">
      <Layout>
        <nav
          className="m-auto flex items-center flex-wrap justify-between w-full py-5"
          id="navigation"
        >
          <div>
            <div className="hidden flex-row w-full items-center lg:flex ">
              {menuItems}
            </div>
            <div className="relative lg:hidden z-50">
              <button
                onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
              >
                <Menu className="text-gray-600 z-50" />
              </button>
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-smoke"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="absolute w-full bg-white flex flex-col py-2">
                    {dropDownMenuItems}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>{languageItems}</div>
        </nav>
      </Layout>
    </div>
  );
};

export { AppBar };

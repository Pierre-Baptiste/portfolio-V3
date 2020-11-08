import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

const CoverImage = ({
  title,
  src,
  width,
  height,
  slug,
}: {
  title: string;
  src: string;
  slug?: string;
  width: number;
  height: number;
}) => {
  if (!src) {
    return null;
  }

  const image = (
    <Image
      src={src}
      width={width}
      height={height}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small object-cover w-full", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/works/${slug}`} href="/works/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export { CoverImage };

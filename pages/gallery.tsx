import React from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { groq } from "next-sanity";
import { getClient } from "utils/sanity";
import Gallery from "react-photo-gallery";
import Image from "next/image";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

const query = groq`*[_type == "gallery"] {
  ...,
	"caption":photo.caption,
	"alt":photo.alt,
  "photo": photo.asset->{
    url,
    metadata {
      location,
      dimensions,
      palette {
        dominant {
          background,
          foreground
        }
      }
    }
  }
}`;

export default function gallery({ photos }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full ">
        <Layout size="md">
          <Hero page="gallery" />
          <div className="mt-12">
            <LightgalleryProvider
              lightgallerySettings={{
                download: false,
                startClass: "lg-fade",
                showAfterLoad: false,
                thumbnail: false,
              }}
            >
              <Gallery
                photos={photos}
                renderImage={({ photo, index }) => (
                  <LightgalleryItem
                    group="gallery"
                    src={photo.src}
                    itemClassName="-my-1"
                    subHtml={`<a href=${photos[index].captionLink}><h4>${photos[index].caption}</h4></a>`}
                    key={photo.src}
                  >
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      key={photo.src}
                      data-index={index}
                      className="hover:scale-110 cursor-pointer transition-transform duration-200 transform overflow-hidden"
                      alt={photos[index].alt}
                    />
                  </LightgalleryItem>
                )}
              />
            </LightgalleryProvider>
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const photosData = await getClient().fetch(query);

  const photos = photosData.reduce((acc, curr) => {
    const { photo, caption, link, alt } = curr;
    const { metadata } = photo;
    const photoObject = {
      src: photo.url,
      width: metadata.dimensions.width,
      height: metadata.dimensions.height,
      captionLink: link.href,
      caption: caption,
      alt: alt || null,
    };
    acc.push(photoObject);
    return acc;
  }, []);

  return {
    props: { photos },
  };
}

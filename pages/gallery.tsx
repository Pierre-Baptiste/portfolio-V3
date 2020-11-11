import React, { useState, useCallback } from "react";

import Head from "next/head";
import { Layout } from "components/core/Layout";
import { Hero } from "components/ui/Hero";
import { FooterCaption } from "components/ui/FooterCaption";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { groq } from "next-sanity";
import {
  getClient,
  usePreviewSubscription,
  PortableText,
  urlFor,
} from "utils/sanity";
import Gallery from "react-photo-gallery";
import Image from "next/image";
import Carousel, { Modal, ModalGateway } from "react-images";

const query = groq`*[_type == "gallery"] {
  ...,
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

const View = (props) => {
  const { currentView } = props;
  const { src, height, width } = currentView;

  return <Image src={src} height={height} width={width} />;
};

export default function gallery({ photos }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((e) => {
    setCurrentImage(+e.target.dataset.index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = ({ photo, index, onClick }) => {
    return (
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        key={photo.src}
        onClick={openLightbox}
        data-index={index}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="absolute right-0 left-0 top-0 min-h-full">
        <Layout>
          <Hero page="gallery" />
          <div>
            <Gallery
              photos={photos}
              onClick={openLightbox}
              renderImage={imageRenderer}
            />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    components={{ FooterCaption, View }}
                    currentIndex={currentImage}
                    views={photos.map((photo) => {
                      return {
                        src: photo.src,
                        caption: "test",
                        url: "pbdupire.com",
                        ...photo,
                      };
                    })}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </Layout>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const photosData = await getClient().fetch(query);

  const photos = photosData.reduce((acc, curr) => {
    const { photo } = curr;
    const { metadata } = photo;
    const photoObject = {
      src: photo.url,
      width: metadata.dimensions.width,
      height: metadata.dimensions.height,
    };
    acc.push(photoObject);
    return acc;
  }, []);

  return {
    props: { photos },
  };
}

import { MdLocalDrink } from "react-icons/md";

export default {
  name: "project",
  title: "Project",
  type: "document",
  icon: MdLocalDrink,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "heading",
      title: "Heading",
      type: "localeString",
    },
    {
      title: "Year",
      name: "year",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    },
    {
      title: "Main image",
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "blurb",
      title: "Blurb",
      type: "localeString",
    },
    {
      name: "body",
      title: "Body",
      type: "localeBlockContent",
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "tags",
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};

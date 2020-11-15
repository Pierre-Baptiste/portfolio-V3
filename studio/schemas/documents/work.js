import { MdWork } from "react-icons/md";

export default {
  name: "work",
  title: "Work",
  type: "document",
  icon: MdWork,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "localeString",
    },
    {
      name: "isCurrent",
      title: "Is Current",
      type: "boolean",
    },
    {
      title: "Beginning",
      name: "beginning",
      type: "date",
      options: {
        dateFormat: "MMMM YYYY",
      },
    },
    {
      title: "End",
      name: "end",
      type: "date",
      options: {
        dateFormat: "MMMM YYYY",
      },
    },
    {
      title: "Main image",
      name: "mainImage",
      type: "figure",
    },
    {
      title: "Location",
      name: "location",
      type: "localeString",
    },
    {
      title: "Logo",
      name: "logo",
      type: "figure",
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

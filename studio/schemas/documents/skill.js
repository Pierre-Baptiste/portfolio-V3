import { MdMusicNote } from "react-icons/md";

export default {
  name: "skill",
  title: "Skill",
  type: "document",
  icon: MdMusicNote,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      title: "Logo",
      name: "logo",
      type: "figure",
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
  ],
};

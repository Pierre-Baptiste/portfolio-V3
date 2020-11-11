import { MdInsertPhoto } from "react-icons/md";

export default {
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: MdInsertPhoto,
  options: {
    metadata: ["location", "palette", "dimensions"],
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "figure",
    },
    { name: "link", title: "Link", type: "link" },
  ],
};

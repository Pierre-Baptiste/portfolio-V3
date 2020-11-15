import S from "@sanity/desk-tool/structure-builder";
import { MdWeb, MdSettings, MdWhatshot, MdLooks } from "react-icons/md";

export default () =>
  S.list()
    .title("Portfolio")
    .items([...S.documentTypeListItems()]);

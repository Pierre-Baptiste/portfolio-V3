import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "content");

export function getPostSlugs(category, locale) {
  return fs.readdirSync(`${postsDirectory}/${locale}/${category}`);
}

export function getPostBySlug(slug, category, fields = [], locale = "en") {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(
    `${postsDirectory}/${locale}/${category}`,
    `${realSlug}.md`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(category, fields = [], locale = "en") {
  const slugs = getPostSlugs(category, locale);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, category, fields, locale))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? "-1" : "1"));
  return posts;
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type ProjectFrontmatter = {
  title: string;
  tagline: string;
  stack: string[];
  status: string;
  featured?: boolean;
  relatedBlogSlug?: string; // optional — links to a blog post about this project
  links: {
    github?: string;
    live?: string;
  };
  coverImage?: string;
};

export type BlogFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
};

type ContentType = "projects" | "blog";

// Reads one MDX file by slug, returns its raw content + parsed frontmatter.
// Throws if the file doesn't exist — callers (page components) should
// let Next.js's notFound() handle that, not swallow it silently.
export function getContentBySlug(type: ContentType, slug: string) {
  const filePath = path.join(contentDir, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as ProjectFrontmatter & BlogFrontmatter };
}

// Reads every MDX file in a content directory, returns frontmatter + slug
// for each. Skips (doesn't crash on) malformed files — logs a warning instead,
// so one broken file doesn't take down the whole list page.
export function getAllContent(type: ContentType) {
  const dirPath = path.join(contentDir, type);

  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx"));

  const items = files.flatMap((file) => {
    const slug = file.replace(/\.mdx$/, "");
    try {
      const { frontmatter } = getContentBySlug(type, slug);
      return [{ slug, frontmatter }];
    } catch (err) {
      console.warn(`Skipping malformed content file: ${type}/${file}`, err);
      return [];
    }
  });

  // Blog posts sort newest-first; projects keep file order (you control via filenames)
  if (type === "blog") {
    return items.sort(
      (a, b) =>
        new Date((b.frontmatter as BlogFrontmatter).date).getTime() -
        new Date((a.frontmatter as BlogFrontmatter).date).getTime()
    );
  }

  return items;
}
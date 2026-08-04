import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type MDXOptions = NonNullable<MDXRemoteProps["options"]>;

export const mdxOptions: MDXOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: true }],
    ],
  },
};
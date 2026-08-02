import rehypePrettyCode from "rehype-pretty-code";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type MDXOptions = NonNullable<MDXRemoteProps["options"]>;

export const mdxOptions: MDXOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: true }],
    ],
  },
};
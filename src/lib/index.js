"use server";

import fs from "fs";
import path from "path";
import { cachedCompileMDX } from "./mdx-cache";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

const blogsContentDirectory = path.join(
  process.cwd(),
  "src",
  "app",
  "content",
  "blogsContent"
);

const caseStudiesContentDirectory = path.join(
  process.cwd(),
  "src",
  "app",
  "content",
  "caseStudiesContent"
);

const changelogsContentDirectory = path.join(
  process.cwd(),
  "src",
  "app",
  "content",
  "changelogsContent"
);

/* For selected blog gets all the content for that blog post*/
export const getPostBySlug = async (slug) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(blogsContentDirectory, `${realSlug}.mdx`);
  let fileContent;

  try { 
    console.log(filePath);
    fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  } catch (error) {
    console.log(error);
    return { meta: { slug: realSlug }, content: "" };
  }

  const { frontmatter, content } = await cachedCompileMDX(
    filePath,
    fileContent,
    {
      parseFrontmatter: true,
      mdxOptions: {
        // problem with remarkGfm?
        remarkPlugins: [remarkMath, remarkGfm],
        // remarkPlugins: [ remarkMath],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypeKatex, { output: "mathml" }],
          rehypePrettyCode,
        ],
      },
    }
  );

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

const getChangeLogsByDate = async (date) => {
  console.log(date);
  const realSlug = date.replace(/\.mdx$/, "");
  const filePath = path.join(changelogsContentDirectory, `${realSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });

  const { frontmatter, content } = await cachedCompileMDX(
    filePath,
    fileContent,
    {
      parseFrontmatter: true,
      mdxOptions: {
        // problem with remarkGfm?
        remarkPlugins: [remarkMath, remarkGfm],
        // remarkPlugins: [ remarkMath],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypeKatex, { output: "mathml" }],
          rehypePrettyCode,
        ],
      },
    }
  );

  return { ...frontmatter, slug: realSlug, content };
};

export const getChangeLogs = async () => {
  const files = fs.readdirSync(changelogsContentDirectory);

  let changelogsData = [];

  for (const file of files) {
    const changelogContent = await getChangeLogsByDate(file);
    changelogsData.push(changelogContent);
  }

  await changelogsData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return changelogsData;
};

/* For blog page gets all the blog posts meta data */
export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(blogsContentDirectory);

  let posts = [];

  for (const file of files) {
    const { meta } = await getPostBySlug(file);
    posts.push(meta);
  }

  await posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
};

/* For case studies page gets all case studies meta data */
export const getAllCaseStudiesMeta = async () => {
  const files = fs.readdirSync(caseStudiesContentDirectory);

  let studies = [];

  for (const file of files) {
    const { meta } = await getCaseStudyBySlug(file);
    studies.push(meta);
  }

  return studies;
};

/* For selected case study gets all the content */
export const getCaseStudyBySlug = async (slug) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(caseStudiesContentDirectory, `${realSlug}.mdx`);
  let fileContent;

  try {
    fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  } catch (error) {
    console.log(error);
    throw error;
  }

  const { frontmatter, content } = await cachedCompileMDX(
    filePath,
    fileContent,
    {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          [rehypeKatex, { output: "mathml" }],
          rehypePrettyCode,
        ],
      },
    }
  );

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

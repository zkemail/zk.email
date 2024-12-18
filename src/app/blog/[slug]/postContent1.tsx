"use client";

import { PageContent } from "@/app/types";

const PostContent = ({ meta, content }: PageContent) => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <p className="h2">{meta.title}</p>
        <p className="h5 font-semibold" style={{ color: "#D4D4D4" }}>
          {meta.description}
        </p>
        <p className="subtitle2" style={{ color: "#A8A8A8" }}>
          {new Date(meta.date).toISOString().split("T")[0]}{" "}
          <span className="mx-2">◆</span> {meta.category}
        </p>
      </div>
      <article
        className={`prose lg:prose-xl prose-invert dark:prose-invert-xl max-w-full mt-16`}
      >
        {content}
      </article>
    </div>
  );
};

export default PostContent;

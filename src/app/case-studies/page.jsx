import { getAllCaseStudiesMeta } from "../../lib/index";
import BlogsPage from "../blog/PostContainer";

export const metadata = {
  title: "ZK Email | Case Studies",
};

const CaseStudies = async () => {
  const studies = await getAllCaseStudiesMeta();
  return (
    <BlogsPage
      posts={studies}
      title="Case Studies"
      subtitle="Latest case studies from our integrations"
      type="case-study"
    />
  );
};

export default CaseStudies;

import { getPostBySlug } from '@/lib';
import 'highlight.js/styles/github-dark.css'
import PostContent from './postContent'

const getPageContent = async (slug) => {
  try {
    const { meta, content } = await getPostBySlug(slug);
    return { meta, content };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params
  let meta;

  try {
    meta = await getPageContent(slug);
  } catch (error) {
    console.log(error);
    throw error;
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: meta.ogImage ? `https://zk.email${meta.ogImage}` : `https://zk.email/blog-media/default/zk-email-default-banner.webp`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = await params

  const { meta, content } = await getPageContent(slug);

  return <div className='container-width container-padding m-auto my-40'><PostContent meta={meta} content={content} /></div>
};

export default Page;

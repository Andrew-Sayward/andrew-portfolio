import BlogPost from "@/components/BlogPost/blog-post";
import Header from "@/components/Header/header";
import { BlogPostData, readBlogPostPage } from "@/helpers/data/read-blog-post-page";
import { GetStaticPropsResult } from "next";

import HeaderAlt from "@/components/HeaderAlt/header-alt";
import { useEffect } from "react";

type Props = {
  page: BlogPostData;
};

const BlogListing = (props: Props) => {
  useEffect(() => {
    // Wait for your animation to finish or delay the scroll as needed
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // Adjust time based on your animation needs

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeaderAlt />
      <BlogPost
        page={{
          title: props.page.title,
          coverImage: {
            url: props.page.coverImage.url,
            alt: props.page.coverImage.alt,
          },
          content: props.page.content,
        }}
      />
    </>
  );
};

export default BlogListing;

export async function getServerSideProps(context: any): Promise<GetStaticPropsResult<Props>> {
  const slug = context.params!.id as string;

  try {
    const page = await readBlogPostPage(slug);
    return {
      props: {
        page,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return {
      notFound: true,
    };
  }
}

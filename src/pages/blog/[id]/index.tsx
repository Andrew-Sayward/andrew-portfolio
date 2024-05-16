import BlogPost from "@/components/BlogPost/blog-post";
import HeaderAlt from "@/components/HeaderAlt/header-alt";
import { BlogPostData, readBlogPostPage } from "@/helpers/data/read-blog-post-page";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

type Props = {
  page: BlogPostData;
};

const BlogListing = ({ page }: Props) => {
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
          title: page.title,
          coverImage: {
            url: page.coverImage.url,
            alt: page.coverImage.alt,
          },
          content: page.content,
        }}
      />
    </>
  );
};

export default BlogListing;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const slug = context.params?.id as string;

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
};

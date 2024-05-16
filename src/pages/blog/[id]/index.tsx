import BlogPost from "@/components/BlogPost/blog-post";
import Header from "@/components/Header/header";
import { BlogPostData, readBlogPostPage } from "@/helpers/data/read-blog-post-page";
import { GetStaticPropsResult } from "next";

import HeaderAlt from "@/components/HeaderAlt/header-alt";

type Props = {
  page: BlogPostData;
};

const BlogListing = (props: Props) => {
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

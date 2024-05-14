import { getAllBlogPostSlugs } from "@/helpers/data/get-all-blog-post-slugs";
import { BlogPostData, readBlogPostPage } from "@/helpers/data/read-blog-post-page";
import { GetStaticPropsResult } from "next";

type Props = {
  page: BlogPostData;
};

const BlogListing = (props: Props) => {
  return (
    <article>
      <h1>{props.page.title}</h1>
    </article>
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

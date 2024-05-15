import BlogList from "@/components/BlogList/blog-list";
import Header from "@/components/Header/header";
import { readAllBlogs } from "@/helpers/data/read-all-blogs";
import { readBlogListing } from "@/helpers/data/read-blog-listing";

type Props = {
  page: any;
  blogs: any[];
};

const BlogListing = (props: Props) => {
  return (
    <>
      <Header hasScrolled={false} />
      <BlogList blogs={props.blogs}></BlogList>
    </>
  );
};
export default BlogListing;

export async function getStaticProps(context: any): Promise<{ props: Props }> {
  const [page, blogs] = await Promise.all([readBlogListing(), readAllBlogs()]);

  return {
    props: {
      page,
      blogs,
    },
  };
}

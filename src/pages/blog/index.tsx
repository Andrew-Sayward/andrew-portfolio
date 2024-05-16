import BlogList from "@/components/BlogList/blog-list";
import HeaderAlt from "@/components/HeaderAlt/header-alt";
import { readAllBlogs } from "@/helpers/data/read-all-blogs";
import { readBlogListing } from "@/helpers/data/read-blog-listing";

type Props = {
  page: any;
  blogs: any[];
};

const BlogListing = (props: Props) => {
  return (
    <>
      <HeaderAlt />
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

import BlogList from "@/components/BlogList/blog-list";
import HeaderAlt from "@/components/HeaderAlt/header-alt";
import { readAllBlogs } from "@/helpers/data/read-all-blogs";
import { BlogCardData } from "@/helpers/models/blog-card-data";
import { useEffect } from "react";

type Props = {
  blogs: BlogCardData[];
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
      <BlogList blogs={props.blogs} />
    </>
  );
};
export default BlogListing;

export async function getServerSideProps(context: any): Promise<{ props: Props }> {
  const [blogs] = await Promise.all([readAllBlogs()]);

  return {
    props: {
      blogs,
    },
  };
}

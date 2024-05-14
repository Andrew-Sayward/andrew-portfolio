import { BlogCardData } from "@/helpers/models/blog-card-data";
import styles from "./blog-list.module.scss";

type Props = {
  blogs: BlogCardData[];
};

const BlogList = ({ blogs }: Props) => {
  return (
    <section>
      {blogs.map((item, index) => {
        return item.slug;
      })}
    </section>
  );
};

export default BlogList;

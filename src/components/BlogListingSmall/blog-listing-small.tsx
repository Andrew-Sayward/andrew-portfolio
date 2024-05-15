import { BlogCardData } from "@/helpers/models/blog-card-data";
import styles from "./blog-listing-small.module.scss";
import Link from "next/link";
import Image from "next/image";

type Props = {
  blogs: Array<BlogCardData>;
};

const BlogListingSmall = ({ blogs }: Props) => {
  return (
    <section className={styles.blogListingSmall} id="blog">
      <div className={styles.inner}>
        <h2>Blog</h2>
        <div className={styles.blogCards}>
          {blogs.slice(0, 3).map((item, index) => {
            return (
              <Link href={"/blog/" + item.slug} key={index}>
                <div className={styles.blogCard}>
                  <div className={styles.image}>
                    <Image src={item.coverImage.url} alt={item.coverImage.alt} fill />
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.link}>
          <Link className={styles.view} href="/blog/">
            View all blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogListingSmall;

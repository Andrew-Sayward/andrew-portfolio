import { BlogCardData } from "@/helpers/models/blog-card-data";
import styles from "./blog-list.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { sortByDate } from "@/helpers/sort-by-date";

type Props = {
  blogs: BlogCardData[];
};

const BlogList = ({ blogs }: Props) => {
  const [loadSize, setLoadSize] = useState(6);

  return (
    <section className={styles.blogList}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <h1>Blog</h1>
          <p>A collection of articles around my life and experiences</p>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.blogCards}>
          {sortByDate(blogs)
            .slice(0, loadSize)
            .map((item, index) => {
              return (
                <Link href={"/blog/" + item.slug} key={index} scroll={false}>
                  <div className={styles.blogCard}>
                    <div className={styles.image}>
                      <Image src={item.coverImage.url} alt={item.coverImage.alt} fill />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      {item.excerpt && <p>{item.excerpt}</p>}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      {blogs.length > loadSize && (
        <div className={styles.loadMoreSection}>
          <button
            onClick={() => {
              setLoadSize(loadSize + 6);
            }}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogList;

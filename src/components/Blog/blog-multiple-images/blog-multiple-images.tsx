import { ImageDataTypes } from "@/helpers/models/image-data";
import styles from "./blog-multiple-images.module.scss";
import Image from "next/image";

type Props = {
  images: ImageDataTypes[];
};

const BlogMultipleImages = ({ images }: Props) => {
  return (
    <section className={styles.multiImageContainer}>
      {images.map((item, index) => {
        return (
          <div key={index} className={styles.multiImage}>
            <Image src={item.url} alt={item.alt} fill />
          </div>
        );
      })}
    </section>
  );
};

export default BlogMultipleImages;

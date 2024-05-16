import Image from "next/image";
import styles from "./styles.module.scss";
import { ImageDataTypes } from "@/helpers/models/image-data";

type Props = {
  image: ImageDataTypes;
};

const BlogImage = (props: Props) => {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={props.image.url}
        alt={props.image.alt}
        width={props.image.width ? props.image.width / 4 : 0}
        height={props.image.height ? props.image.height / 4 : 0}
      />
    </div>
  );
};

export default BlogImage;

import { BlogPostData } from "@/helpers/data/read-blog-post-page";
import styles from "./blog-post.module.scss";
import { StructuredText } from "react-datocms/structured-text";
import { render as toPlainText } from "datocms-structured-text-to-plain-text";
import { renderNodeRule } from "datocms-structured-text-to-plain-text";
import { isHeading, isParagraph, isBlockquote } from "datocms-structured-text-utils";
import BlogImage from "../Blog/blog-image/blog-image";
import BodyText from "../Blog/body-text/body-text";
import PullQuote from "../Blog/pull-quote/pull-quote";
import Subheading from "../Blog/subheading/subheading";
import Image from "next/image";

type Props = {
  page: BlogPostData;
};

const BlogPost = ({ page }: Props) => {
  return (
    <article>
      <div className={styles.header}>
        <div className={styles.inner}>
          <h1>{page.title}</h1>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.image}>
          <Image src={page.coverImage.url} alt={page.coverImage.alt} fill />
        </div>
      </div>
      <div>
        <div className={styles.inner}>
          <div className={styles.content}>
            <StructuredText
              data={page.content}
              customNodeRules={[
                // Heading
                renderNodeRule(isHeading, ({ node, key }) => {
                  const heading = toPlainText(node);
                  return <Subheading key={key} subheading={heading ? heading : ""} />;
                }),
                // Quote
                renderNodeRule(isBlockquote, ({ node, key }) => {
                  const quote = toPlainText(node);
                  return <PullQuote key={key} quote={quote ? quote : ""} />;
                }),
                // Paragraph
                renderNodeRule(isParagraph, ({ adapter: { renderNode }, children, key }) => {
                  return <BodyText key={key}>{renderNode("p", { key }, children)}</BodyText>;
                }),
              ]}
              renderBlock={({ record }) => {
                switch (record.__typename) {
                  case "FileField":
                    return <BlogImage image={record.image as any} />;
                  default:
                    return null;
                }
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;

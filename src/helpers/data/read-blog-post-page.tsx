import { gql } from "graphql-request";
import { readCmsData } from "./read-cms-data";
import { ImageDataTypes } from "../models/image-data";
import { StructuredTextDocument } from "datocms-structured-text-to-plain-text";

export type BlogPostData = {
  title: string;
  coverImage: ImageDataTypes;
  slug?: string;
  content: StructuredTextDocument;
};

const blogPostQuery = (slug: string) => gql`
  {
    post(filter: { slug: { eq: "chasing-the-northern-lights-in-iceland" } }) {
      id
      title
      _status
      _firstPublishedAt
      _publishedAt
      date
      excerpt
      slug
      seoSettings {
        twitterCard
        title
        image {
          alt
          url
        }
        description
      }
      category {
        name
      }
      content {
        value
        links
        blocks {
          __typename
          ... on ImageBlockRecord {
            __typename
            image {
              url
              alt
              width
              height
            }
          }
          ... on MultipleImageRecord {
            __typename
            id
            imageGallery {
              alt
              url
            }
          }
        }
      }
      coverImage {
        alt
        url
      }
    }
  }
`;

export async function readBlogPostPage(slug: string): Promise<BlogPostData> {
  const QUERY = blogPostQuery(slug);
  return readCmsData<BlogPostData>(QUERY, "post");
}

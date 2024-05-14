import { gql } from "graphql-request";
import { readCmsData } from "./read-cms-data";
import { ImageDataTypes } from "../models/image-data";

export type BlogPostData = {
  title: string;
  coverImage: ImageDataTypes;
  slug: string;
};

const blogPostQuery = (slug: string) => gql`
    {
      post(filter: {slug: {eq: "${slug}"}}) {      
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
            image {
              alt
              url
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

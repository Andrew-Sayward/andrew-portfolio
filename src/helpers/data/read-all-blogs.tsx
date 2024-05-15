import { gql } from "graphql-request";

import { readCmsData } from "./read-cms-data";
import { BlogPostData } from "./read-blog-post-page";
import { BlogCardData } from "../models/blog-card-data";

const blogPostQuery = () => gql`
  {
    allPosts {
      id
      title
      _status
      _firstPublishedAt
      _publishedAt
      date
      excerpt
      slug
      coverImage {
        alt
        url
      }
    }
  }
`;

export async function readAllBlogs(): Promise<BlogCardData[]> {
  const QUERY = blogPostQuery();
  return readCmsData<BlogCardData[]>(QUERY, "allPosts");
}

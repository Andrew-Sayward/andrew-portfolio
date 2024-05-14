import { gql } from "graphql-request";

import { readCmsData } from "./read-cms-data";
import { BlogPostData } from "./read-blog-post-page";

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

export async function readAllBlogs(): Promise<BlogPostData[]> {
  const QUERY = blogPostQuery();
  return readCmsData<BlogPostData[]>(QUERY, "allPosts");
}

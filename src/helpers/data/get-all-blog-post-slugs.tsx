import { gql } from "graphql-request";

import { readCmsData } from "./read-cms-data";

type BlogPostData = {};

const blogPostQuery = () => gql`
  {
    allPosts {
      slug
    }
  }
`;

export async function getAllBlogPostSlugs(): Promise<BlogPostData[]> {
  const QUERY = blogPostQuery();
  return readCmsData<BlogPostData[]>(QUERY, "allPosts");
}

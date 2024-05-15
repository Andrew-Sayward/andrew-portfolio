import { gql } from "graphql-request";
import { readCmsData } from "./read-cms-data";

type BlogListingData = {};

const blogListingQuery = () => gql`
  {
    blog {
      seo {
        twitterCard
        title
        description
      }
    }
  }
`;

export async function readBlogListing(): Promise<BlogListingData> {
  const QUERY = blogListingQuery();
  return readCmsData<BlogListingData>(QUERY, "blog");
}

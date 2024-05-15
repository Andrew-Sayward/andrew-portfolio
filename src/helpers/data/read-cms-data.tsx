import { GraphQLClient } from "graphql-request";
import { readCmsAccessToken } from "./read-cms-access-token";

export interface QueryResponse<T> {
  [key: string]: T;
}

export async function readCmsData<T>(
  query: string,
  key: keyof QueryResponse<T>,
  includeDrafts: boolean = false
): Promise<T> {
  const token = readCmsAccessToken();

  const headers: { [key: string]: string } = {
    authorization: `Bearer ${token}`,
  };

  if (includeDrafts) {
    headers["X-Include-Drafts"] = "true";
  }

  const client = new GraphQLClient("https://graphql.datocms.com", { headers });
  const data = await client.request<QueryResponse<T>>(query);
  return data[key];
}

export function readCmsAccessToken(): string {
  const CMS_ACCESS_TOKEN: string | undefined = process.env.NEXT_PUBLIC_CMS_ACCESS_TOKEN;
  if (!CMS_ACCESS_TOKEN) {
    throw new Error("CMS_ACCESS_TOKEN is not defined!");
  }
  return CMS_ACCESS_TOKEN;
}

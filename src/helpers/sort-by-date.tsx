import { BlogCardData } from "./models/blog-card-data";

export const sortByDate = (array: Array<BlogCardData>) => {
  return array.sort(
    (a: { date: string | number | Date }, b: { date: string | number | Date }) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

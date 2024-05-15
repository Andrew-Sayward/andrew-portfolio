export const regulate = (item: string) => {
  return item
    .trim() // Remove leading and trailing whitespace
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .split("") // Split into characters
    .join("") // Rejoin characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[{}()]/g, "") // Remove brackets
    .replace(/&/g, "and")
    .toLowerCase();
};

export function formatTitle(title: string) {
  const words = title.split(" ");
  if (words.length > 1) {
    // Insert a non-breaking space between the last two words
    words.splice(words.length - 2, 2, `${words[words.length - 2]}&nbsp;${words[words.length - 1]}`);
  }
  return words.join(" ");
}

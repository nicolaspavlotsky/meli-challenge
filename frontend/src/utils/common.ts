export const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalizeWordsInSentence = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

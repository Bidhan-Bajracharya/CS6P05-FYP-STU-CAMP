import { vulgarWords } from "../data/words";

const checkforVulgarContents = (content) => {
  // checking for vulgar content
  const lowerCaseParagraph = content.toLowerCase();

  const wordRegExps = vulgarWords.map(
    (badWord) => new RegExp(`\\b${badWord}\\b`, "i")
  );

  // check for vulgar words in body before submission
  const result = wordRegExps.some((word) =>
    // lowerCaseParagraph.includes(word)
    word.test(lowerCaseParagraph)
  );

  return result;
};

export default checkforVulgarContents;

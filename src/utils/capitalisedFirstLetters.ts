export const capitalisedFirstLetters = (words: string) => {
  // Using RegEx, it capitalises the first letter of each word in the user's name.
  const capitalised = words.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
    letter.toUpperCase()
  );
  return capitalised;
};

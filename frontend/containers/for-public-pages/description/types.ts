export type DescriptionProps = {
  // Main title of the page.
  title: string | JSX.Element;
  // Blocks of text to show as description below the main title
  descriptions: string[] | JSX.Element[];
  // Texts displayed on the left block, with titles and descriptions.
  leftTexts: { title: string | JSX.Element; description: string | JSX.Element }[];
  // Text displayed on the right block, with a title and description.
  rightText: { title: string | JSX.Element; description: string | JSX.Element };
};

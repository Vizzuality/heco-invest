export type DescriptionProps = {
  title: string | JSX.Element;
  descriptions: string | JSX.Element[];
  leftTexts: { title: string | JSX.Element; description: string | JSX.Element }[];
  rightText: { title: string | JSX.Element; description: string | JSX.Element };
};

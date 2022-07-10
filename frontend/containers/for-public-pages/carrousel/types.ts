export type PublicPageCarrouselProps = {
  texts: { title: string | JSX.Element; description: string | JSX.Element }[];
  images: string[];
  subtitle: string | JSX.Element;
  title?: string | JSX.Element;
};

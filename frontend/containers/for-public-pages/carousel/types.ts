export type PublicPageCarouselProps = {
  // The carousel title.
  title?: string | JSX.Element;
  // The carousel subtitle.
  subtitle: string | JSX.Element;
  // Array of images urls displayed on each slide. The functional images are the first 3 of the array, the other ones will be displayed as image preview.
  images: string[];
  // Array of texts displayed on each slide
  texts: { title: string | JSX.Element; description: string | JSX.Element }[];
};

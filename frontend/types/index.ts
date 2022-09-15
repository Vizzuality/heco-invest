import { Languages } from 'enums';

export interface LayoutStaticProp<PageProps = {}, Props = {}> {
  Component?: React.FC<Props>;
  props?: Props | ((props: PageProps) => Props);
}

/**
 * Type of the Page components
 */
export type PageComponent<PageProps = {}, LayoutProps = {}> = React.FC<PageProps> & {
  layout?: LayoutStaticProp<PageProps, LayoutProps>;
};

/**
 * Type for Language
 */
export type LanguageType = `${Languages}`;

/**
 * Type for Account Type
 */

export type AccountType = 'investor' | 'project-developer';

export type Picture = {
  small: string;
  medium: string;
  original: string;
};

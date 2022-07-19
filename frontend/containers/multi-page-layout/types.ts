import { PropsWithChildren } from 'react';

import { LayoutContainerProps } from 'components/layout-container';
import { LanguageType } from 'types';

import { MultiPageLayoutFooterProps } from './footer';
import { MultiPageLayoutHeaderProps } from './header';

export type MultiPageLayoutProps = PropsWithChildren<
  {
    /** Classnames to apply to the container */
    className?: string;
    /** Locale of the layout to display in a tag in the header */
    locale?: LanguageType;
    /** Whether to show the outro page */
    showOutro?: boolean;
    /** Whether to show the footer on the outro page. Defaults to `false` */
    showOutroFooter?: boolean;
    /** Whether the Layout should auto handle navigation (Previous, Next, Page numbers click). Defaults to `true` */
    autoNavigation?: boolean;
    /** Current page to display */
    page?: number;
    /** Callback when the "Previous" button is clicked */
    onPreviousClick?: (page: number) => void;
    /** Callback when the "Next" button is clicked */
    onNextClick?: (page: number) => void;
    /** Callback when a page number button is clicked */
    onPageClick?: (page: number) => void;
    /** Returns the total number of pages */
    getTotalPages?: (totalPages: number) => void;
  } & Pick<LayoutContainerProps, 'layout'> &
    Pick<MultiPageLayoutHeaderProps, 'title' | 'onCloseClick' | 'leaveButtonText'> &
    Pick<
      MultiPageLayoutFooterProps,
      | 'footerElements'
      | 'alert'
      | 'showProgressBar'
      | 'isSubmitting'
      | 'onSubmitClick'
      | 'onCompleteClick'
      | 'nextButtonText'
      | 'previousButtonText'
      | 'submitButtonText'
      | 'outroButtonText'
    >
>;

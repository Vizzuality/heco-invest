import { PropsWithChildren } from 'react';

import { LayoutContainerProps } from 'components/layout-container';

import { MultiPageFormFooterProps } from './footer';
import { MultiPageFormHeaderProps } from './header';

export type MultiPageFormProps = PropsWithChildren<
  {
    /** Classnames to apply to the container */
    className?: string;
    /** Whether the form has been completed successfully */
    isComplete?: boolean;
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
  } & Pick<LayoutContainerProps, 'layout'> &
    Pick<MultiPageFormHeaderProps, 'title' | 'onCloseClick'> &
    Pick<
      MultiPageFormFooterProps,
      | 'alert'
      | 'showProgressBar'
      | 'isSubmitting'
      | 'onSubmitClick'
      | 'onCompleteClick'
      | 'completeButtonText'
    >
>;

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

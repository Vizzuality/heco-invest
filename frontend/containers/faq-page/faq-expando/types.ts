import { PropsWithChildren } from 'react';

import { FaqQuestions } from 'hooks/useFaq';

export type FaqExpandoProps = PropsWithChildren<{
  /** ClassNames to apply to the container */
  className?: string;
  /** Id of the question */
  questionId: FaqQuestions;
  /** Question for the FAQ Expando, displayed in the title */
  question: string;
  /** Whether the Expand defaults to open. Default: `false` */
  defaultOpen?: boolean;
}>;

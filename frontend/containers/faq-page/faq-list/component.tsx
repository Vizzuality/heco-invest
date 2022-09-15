import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { FaqListProps, ListItemProps, ItemValidationTypes } from './types';

export const FaqList: FC<FaqListProps> = ({ className, level = 'one', children }: FaqListProps) => {
  return (
    <ol
      className={cx({
        'ml-6': true,
        'my-4 font-medium list-decimal': level === 'one',
        'font-normal list-lower-latin': level === 'two',
        'text-sm list-lower-roman': level === 'three',
        [className]: !!className,
      })}
    >
      {children}
    </ol>
  );
};

export const ListItem: FC<ListItemProps> = ({
  className,
  title,
  description,
  inlineDescription = false,
  mandatory = false,
  validationType,
  children,
}: ListItemProps) => {
  return (
    <li
      className={cx({
        [className]: !!className,
      })}
    >
      {title}
      {inlineDescription && ': '}
      {validationType && (
        <>
          {' '}
          <span className="italic font-normal">
            (
            {validationType === ItemValidationTypes.Max600Chars && (
              <FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />
            )}
            {validationType === ItemValidationTypes.SelectMultiple && (
              <FormattedMessage defaultMessage="select multiple" id="rsWAqe" />
            )}
            {validationType === ItemValidationTypes.SelectOne && (
              <FormattedMessage defaultMessage="select one" id="gwLlk9" />
            )}
            {validationType === ItemValidationTypes.YesNo && (
              <FormattedMessage defaultMessage="Yes / No" id="aNY6/x" />
            )}
            {validationType === ItemValidationTypes.Max36Months && (
              <FormattedMessage defaultMessage="max 36 months" id="f9DtLB" />
            )}
            )
          </span>
        </>
      )}
      {mandatory && ' *'}
      {description && (
        <p
          className={cx({
            'font-normal text-gray-700': true,
            inline: inlineDescription,
          })}
        >
          {description}
        </p>
      )}
      {children}
    </li>
  );
};

export default FaqList;

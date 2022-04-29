import { FC, useCallback } from 'react';

import { MapPin as MapPinIcon } from 'react-feather';
import { useIntl } from 'react-intl';

import Icon from 'components/icon';

import type { FitBoundsControlProps } from './types';

export const FitBoundsControl: FC<FitBoundsControlProps> = ({
  bounds,
  className,
  onFitBoundsChange,
}: FitBoundsControlProps) => {
  const intl = useIntl();

  const handleFitBoundsChange = useCallback(() => {
    onFitBoundsChange(bounds);
  }, [bounds, onFitBoundsChange]);

  return (
    <div className={className}>
      <button
        className="p-2 mb-1 text-gray-800 transition-all bg-white rounded shadow-sm focus-visible:outline-green-dark hover:text-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-opacity-60 disabled:pointer-events-none"
        title={intl.formatMessage({ defaultMessage: 'Fit bounds', id: 'k62/kN' })}
        type="button"
        disabled={!bounds}
        onClick={handleFitBoundsChange}
      >
        <Icon icon={MapPinIcon} />
      </button>
    </div>
  );
};

export default FitBoundsControl;

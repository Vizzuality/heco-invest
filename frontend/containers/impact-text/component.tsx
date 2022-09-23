import { FC, useMemo } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

import Link from 'next/link';

import { FaqPaths } from 'hooks/useFaq';

import { ImpactAreas, Impacts } from 'enums';

import { useEnums } from 'services/enums/enumService';

import type { ImpactTextProps } from './types';

export const ImpactText: FC<ImpactTextProps> = ({
  className,
  area,
  impact,
  impactCalculated,
  linkToFAQ = false,
  shortText = false,
}) => {
  const intl = useIntl();

  const {
    isLoading: isLoadingAllImpacts,
    data: { impact: allImpacts },
  } = useEnums();

  const { id: highestImpactId, value: highestImpactValue } = useMemo(
    () =>
      Object.values(Impacts).reduce(
        (acc, impactId) => {
          if (!impact || !impact[impactId]) return acc;
          if (impact[impactId] <= acc.value) return acc;
          return { id: impactId, value: impact[impactId] };
        },
        { id: null, value: 0 }
      ),
    [impact]
  );

  const impactAreaStr = useMemo(() => {
    switch (area) {
      case ImpactAreas.Municipality:
        return intl.formatMessage({ defaultMessage: 'Municipality', id: '9I1zvK' }).toLowerCase();
      case ImpactAreas.Hydrobasin:
        return intl.formatMessage({ defaultMessage: 'Hydrobasin', id: 'VVlH2M' }).toLowerCase();
      case ImpactAreas.PriorityLandscape:
        return intl
          .formatMessage({ defaultMessage: 'Priority Landscape', id: 'EVKdUn' })
          .toLowerCase();
      default:
        return null;
    }
  }, [area, intl]);

  const [highestImpactDimension, highestImpactScore] = useMemo(() => {
    const highestImpact = allImpacts?.find((impact) => highestImpactId === impact.id);

    if (!highestImpact) {
      return ['−', '0'];
    }

    return [highestImpact.name, impact[highestImpactId].toFixed(1) ?? '0'];
  }, [allImpacts, impact, highestImpactId]);

  if (isLoadingAllImpacts) return null;

  return (
    <div className={className}>
      <p>
        {!impactCalculated && (
          <FormattedMessage
            defaultMessage="The impact of this project isn’t available. Impact calculations may take some time to be available."
            id="xnQiBM"
          />
        )}
        {highestImpactValue === 0 && shortText && (
          <FormattedMessage defaultMessage="The impact of this project is 0." id="VJPvoR" />
        )}
        {highestImpactValue === 0 && !shortText && (
          <FormattedMessage defaultMessage="The impact score of this project is 0." id="/oLNw7" />
        )}
        {highestImpactValue > 0 && (
          <FormattedMessage
            defaultMessage="In the {area} the highest impact of the project is on <b>{impactDimension}</b> with a <b>score</b> of {score}."
            id="NdyMBg"
            values={{
              area: impactAreaStr,
              impactDimension: highestImpactDimension,
              score: highestImpactScore,
              b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
            }}
          />
        )}
        {linkToFAQ && (
          <>
            {' '}
            <Link href={FaqPaths['how-is-the-impact-calculated']}>
              <a className="underline text-green-dark" target="_blank">
                <FormattedMessage defaultMessage="Learn more" id="TdTXXf" />
              </a>
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default ImpactText;

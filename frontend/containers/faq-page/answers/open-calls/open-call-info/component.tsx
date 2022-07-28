import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const OpenCallInfo: FC = () => {
  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create an open call you will need the following information."
          id="iSPvEQ"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the open call public page."
          id="ltUH9L"
        />
      </p>
      <ol className="my-4 ml-6 font-medium list-decimal">
        <li>
          <FormattedMessage defaultMessage="Open call name" id="8Gp8gS" /> *
        </li>
        <li>
          <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="A picture can make your open call page more attractive."
              id="iFQwyC"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Country" id="vONi+O" /> *
        </li>
        <li>
          <FormattedMessage defaultMessage="State" id="ku+mDU" />
        </li>
        <li>
          <FormattedMessage defaultMessage="Municipality" id="9I1zvK" />
        </li>
        <li>
          <FormattedMessage defaultMessage="What’s the open call about" id="4zUbhC" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Describe briefly the impact that the project is expected to generate."
              id="jqCFCY"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="SDG’s" id="/apC0L" />
        </li>
        <li>
          <FormattedMessage defaultMessage="Maximum funding available per project" id="9GzPsf" /> *
        </li>
        <li>
          <FormattedMessage defaultMessage="Financial instrument available" id="m38DjH" /> *
        </li>
        <li>
          <FormattedMessage defaultMessage="Funding priorities" id="P1f6hp" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="What type of projects the funding is covering."
              id="b3Iz6I"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Funding exclusions" id="gQ16Mj" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="What type of projects the funding is not covering."
              id="ydCOwz"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Deadline" id="8/Da7A" /> *
        </li>
      </ol>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default OpenCallInfo;

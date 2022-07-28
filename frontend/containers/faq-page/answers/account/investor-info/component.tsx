import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const InvestorInfo: FC = () => {
  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create an Investor account you will need the following information."
          id="pHaFj5"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the Investor public profile page except questions."
          id="0v43t3"
        />
      </p>
      <ol className="my-4 ml-6 font-medium list-decimal">
        <li>
          <FormattedMessage defaultMessage="Account language" id="WU9L8h" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Select the account language in which you want to write the content of this account (including profile information and future projects). This will avoid mixed content in the platform."
              id="si4NjO"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Picture" id="wvoA3H" />
          <p className="text-base text-gray-600">
            <FormattedMessage
              defaultMessage="Add your logo or a picture that identifies the account."
              id="2Cbk6h"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Profile name" id="s+n2ku" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="The name that will identify the account across the platform."
              id="nlIkQG"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Contacts" id="4S241U" />
          <ol className="ml-6 list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Email" id="sy+pv5" /> *
              <p className="font-light text-gray-600">
                <FormattedMessage
                  defaultMessage="The email where you want to receive contacts from Project Developers or other Investors"
                  id="z3jrKr"
                />
              </p>
            </li>
            <li>
              <FormattedMessage defaultMessage="Phone number" id="jdJhOL" />
              <p className="font-light text-gray-600">
                <FormattedMessage
                  defaultMessage="The phone number for Project Developers or other Investors to reach you/your team"
                  id="rbmO5C"
                />
              </p>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Investor/ Funder type" id="roJe5R" /> *
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Investor" id="nEvNJb" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Angel investor" id="fW6hrZ" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Commercial bank" id="g8xSgQ" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Family office" id="CtWJFx" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Institutional investor" id="g5JslF" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Investment bank" id="3i3sH1" />
            </li>
            <li>
              <FormattedMessage defaultMessage="International Financial Institution" id="E/uR6M" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Micro finance" id="ygx9Jx" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Non-VC Investment vehicle" id="VNrnq9" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Venture capital / private equity" id="tjj29g" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Carbon fund" id="MmBQFd" />
            </li>
            <li>
              <FormattedMessage defaultMessage="NGO" id="LDgw6G" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Foundation" id="q9swhp" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Corporate foundation" id="Qd/1Cb" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Philanthropy" id="RPrfBJ" />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="High-Net-Worth Individual (HNWI) or celebrity"
                id="A/or0n"
              />
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Online Presence" id="V+X/MZ" />
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Website" id="JkLHGw" />
            </li>
            <li>
              <FormattedMessage defaultMessage="LinkedIn" id="Rb/hb9" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Facebook" id="EmpHyB" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Twitter" id="8ywLSf" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Instagram" id="39PtLD" />
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="About" id="g5pX+a" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="What’s your mission?" id="t39CQq" />{' '}
          <span className="italic font-normal">
            <FormattedMessage defaultMessage="(max 600 characters) *" id="ZQW+yb" />
          </span>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Topics/sector categories that interests you"
            id="9o8/Wn"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />) *
          </span>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Sustainable agrosystem" id="hGDBI4" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="sustainable and regenerative agriculture, fishing, and aquaculture as well as manufacturing of derived subproducts."
                  id="PFbrpZ"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Tourism and recreation" id="hOp4Ue" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="accommodation, travel, transportation, hospitality, visitor experiences and eco-tourism projects."
                  id="MY++C0"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Forestry and agroforestry" id="sa2DTR" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="sustainable timber extraction and forest management practices, including reforestation and restoration."
                  id="gbBVhv"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Non-timber forest production" id="DZ+TNi" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="production of health, wellness, and cosmetic products; art, clothing, and  handcrafted products; production of food and drinks."
                  id="YtyJ9Z"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Human capital and Inclusion" id="MEywfd" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="adequate access to quality education, appropriate health services, and formal employment opportunities that respond to diverse skill profiles and are adapted to regional cultural diversity."
                  id="+qyVem"
                />
              </span>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Select the ticket size(s) that you provide"
            id="G6tmT0"
          />
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="<US$25,000 (Small grants)" id="kZ0sht" />
            </li>
            <li>
              <FormattedMessage defaultMessage="US$25,000 – 150,000 (Prototyping)" id="MZTu88" />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="US$150,000 – 750,000 (Market validation)"
                id="NLk0cp"
              />
            </li>
            <li>
              <FormattedMessage defaultMessage="> US$750,000 (Scaling)" id="E010/S" />
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Select the instrument type(s) you provide"
            id="CBfDLD"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />)
          </span>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Loan" id="OkH5va" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="a loan is a transaction in which a financial institution grants a predefined amount of money to develop a particular project. The institution or business that receives the loan is obliged to repay it within a certain period of time and to pay the agreed commissions, expenses and interest."
                  id="C3hduB"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Grant" id="3ciGOS" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="technical cooperation grants are resources provided by an entity to fulfil a well-defined purpose or objective. In general, they are non-reimbursable resources that are destined in particular to projects or enterprises in early stages of development."
                  id="NP4Cd6"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Equity" id="Kub2g2" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="an equity investment consists of the acquisition, by an entity specialized in private equity, of a package of shares of a company or enterprise. The private equity firm thus becomes one of the owners of the company."
                  id="TkWozN"
                />
              </span>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Have you previously invested in impact?" id="8XJceA" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="Yes / No" id="aNY6/x" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="Impact you prioritize" id="zfuq6W" /> *
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Biodiversity" id="mbTJWV" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="Impact of projects on biodiversity conservation, calculated from indicators of endemism, land conservation/restoration, connectivity, and development of sustainable social projects."
                  id="DrtKvj"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Climate" id="MuOp0t" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="Impact of projects that reduce carbon emissions from the land sector (deforestation/degradation), as wood and soil biomass as well as application of sustainable forest measures."
                  id="sWdxgq"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Community" id="4CrCbD" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="Impact of projects on ensuring and improving equal and inclusive physical, mental, economic, and spiritual health."
                  id="lpyO42"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Water" id="t7YvMF" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="Impact of projects  managing water cycling, quality and availability as well as the management of associated risks."
                  id="3BIClA"
                />
              </span>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="SDG’s" id="/apC0L" />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="What type of projects are you prioritizing?"
            id="stKKFV"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="Other relevant information" id="ee3r6Y" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />)
          </span>
        </li>
      </ol>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default InvestorInfo;

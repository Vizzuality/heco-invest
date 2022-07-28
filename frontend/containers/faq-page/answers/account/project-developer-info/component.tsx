import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const ProjectDeveloperInfo: FC = () => {
  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create a Project Developer account you will need the following information."
          id="qpp+jm"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the Project Developer public profile page except question 1 and 6."
          id="p+7s2E"
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
                  defaultMessage="The email where you want to receive contacts from Investors or other Project Developers"
                  id="ipYSrV"
                />
              </p>
            </li>
            <li>
              <FormattedMessage defaultMessage="Phone number" id="jdJhOL" />
              <p className="font-light text-gray-600">
                <FormattedMessage
                  defaultMessage="The phone number for Investors or other Project Developers to reach you/your team"
                  id="7A5ik/"
                />
              </p>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Project Developer type" id="VavuU5" /> *
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Academic" id="mbxIJy" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Business" id="w1Fanr" />
              <ol className="ml-6 text-sm list-lower-roman">
                <li>
                  <FormattedMessage defaultMessage="Cooperative" id="DTQxlC" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Large enterprise" id="LMjhPg" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Corporation" id="psPbog" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="SME and MSME" id="CiYFzk" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Start-up" id="R7Y3LS" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Entrepreneur" id="XGd7Tu" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Trade or business association" id="c8BbZZ" />
                </li>
              </ol>
            </li>
            <li>
              <FormattedMessage defaultMessage="Government" id="bh4rlK" />
              <ol className="ml-6 text-sm list-lower-roman">
                <li>
                  <FormattedMessage defaultMessage="National" id="Oy4O4U" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Sub-national" id="5IVVec" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Public-private organization" id="L51On4" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="NGO" id="LDgw6G" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="IPLC organization" id="osBdnp" />
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Entity legal registration number (NIT or RUT)"
            id="AiagLY"
          />{' '}
          *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Add your legal registration number so we can verify your legal entity. This information will not be publicly available."
              id="02KfzX"
            />
          </p>
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
            defaultMessage="Select the topics/sector categories that you work on"
            id="LmHPHR"
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
          <FormattedMessage defaultMessage="Expect to have impact on" id="YB8bt5" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />) *
          </span>
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
          <FormattedMessage
            defaultMessage="Select HeCo priority landscapes on which you will have impact"
            id="XaFc9D"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />)
          </span>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Amazon Heart" id="SFGITa" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Amazonian Piedmont - Massif" id="0ZkvWW" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Orinoquía" id="JHlWWV" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Orinoquía Transition" id="ybZSf7" />
            </li>
          </ol>
        </li>
      </ol>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default ProjectDeveloperInfo;

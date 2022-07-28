import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const ProjectInfo: FC = () => {
  return (
    <>
      <p>
        <FormattedMessage
          defaultMessage="To create a project you will need the following information."
          id="ET6OJw"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Note that all of this information will be visible in the project public page except questions 20 and 21."
          id="qyN+gs"
        />
      </p>
      <ol className="my-4 ml-6 font-medium list-decimal">
        <li>
          <FormattedMessage defaultMessage="Project name" id="D5RCKi" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="A great name is short, crisp, and easily understood."
              id="rPwaWt"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Project pictures" id="/FrBTj" />
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="The project gallery will be the first thing other users will see on your page, it will help you to showcase your project."
              id="6cU2pG"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Location" id="rvirM2" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage defaultMessage="Country, Municipality, State" id="ANTAp/" />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Location Area" id="0Bne2n" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Draw on the map or upload a file with the geographical area your project will have an impact on."
              id="YEYmEz"
            />
          </p>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Are there other Project developers involved in the project?"
            id="Xk8qys"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="Yes / No" id="aNY6/x" />) *
          </span>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Stage of development or maturity of the project"
            id="jUgR7w"
          />{' '}
          *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Select the stage of development of the project or solution at the time of submitting this pitch"
              id="3hV8r4"
            />
          </p>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Scaling - up" id="0ch6f/" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="consolidated, demonstrated project or solution that seeks to be scaled or replicated in other contexts and/or geographies."
                  id="CIcAVo"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Consolidation" id="xG6n98" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage
                  defaultMessage="project or solution already in implementation that seeks to be strengthened and consolidated."
                  id="q0vlJx"
                />
              </span>
            </li>
            <li>
              <FormattedMessage defaultMessage="Incipient" id="5/UUMs" />:{' '}
              <span className="font-normal text-gray-600">
                <FormattedMessage defaultMessage="idea to be developed from scratch." id="ui0dk9" />
              </span>
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Estimated duration of the project" id="Oc8Fmg" /> *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Enter the estimated implementation duration for the project. MAX 36 months."
              id="/Lbk/f"
            />
          </p>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Which of these topics/sector categories better describe your project?"
            id="i2AgQl"
          />{' '}
          *
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Select the stage of development of the project or solution at the time of submitting this pitch"
              id="3hV8r4"
            />
          </p>
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
          <FormattedMessage defaultMessage="Problem you are solving" id="xBZz+E" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Describe the problem or market need that your project or solution seeks to address. It should be a very specific problem, not a macro global issue like 'climate change' or 'poverty'. Make sure that you're showing that the problem is addressing a specific demand (is real) and it affects the poor and vulnerable population and/or the environment. We recommend using numbers to give a dimension of the problem."
              id="ZZPfwt"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="The solution or opportunity proposed" id="OSAxiC" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Describe the project or solution and describe clearly why you consider it is innovative, different from others and how it can generate an important change and impact towards the target groups. Highlight the characteristics that may attract partners, clients, or investors."
              id="eXDHt0"
            />
          </p>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Which of these topics/sector categories better describe your project?"
            id="i2AgQl"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients."
              id="Zht65f"
            />
          </p>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Farmers" id="zLCDho" />
            </li>
            <li>
              <FormattedMessage
                defaultMessage="Entrepreneurs and innovators - startups"
                id="/3K+SA"
              />
            </li>
            <li>
              <FormattedMessage defaultMessage="Small and medium businesses" id="Kx1fFv" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Urban populations" id="MfSkhN" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Indigenous peoples" id="4+kVuu" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Afro-descendant peoples" id="rPEEqE" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Peasants and traditional inhabitants" id="jCeHSc" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Migrants and displaced groups" id="EmEy56" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Groups with disabilities" id="tAug9g" />
            </li>
            <li>
              <FormattedMessage defaultMessage="LGTBQ+ groups" id="jC4Plq" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Others" id="fqJtkV" />
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage defaultMessage="Expected impact" id="XgaRPC" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Identify the target group(s) of this solution. Try to be very specific and do not cover an unrealistic range of beneficiaries or clients."
              id="Zht65f"
            />
          </p>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Select which areas your project will have an impact on"
            id="hg7Mex"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="This will help us measuring the impact of your project."
              id="3npveQ"
            />
          </p>
          <ol className="ml-6 font-normal list-lower-latin">
            <li>
              <FormattedMessage defaultMessage="Conservation" id="3BcZ1K" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Restoration" id="cIQfgu" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Pollutants reduction" id="u2WlCd" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Carbon emission reduction" id="rtcoCk" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Energy efficiency" id="3zi0sq" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Renewable energy" id="Kt3qxl" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Carbon storage or sequestration" id="49OGbh" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Water capacity or efficiency" id="+tol9p" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Hydrometeorological risk reduction" id="lfXAQ2" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Sustainable food" id="V1MZuC" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Gender equality jobs" id="vNQnTR" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Indigenous or ethnic jobs" id="nafhHM" />
            </li>
            <li>
              <FormattedMessage defaultMessage="Community empowerment" id="MQoSiG" />
            </li>
          </ol>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Select in which SDG’s your project will have impact"
            id="CPO6eS"
          />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select multiple" id="rsWAqe" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="Are you currently looking for funding?" id="u/E7xG" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="Yes / No" id="aNY6/x" />) *
          </span>
        </li>
        <li>
          <FormattedMessage defaultMessage="Funding needed" id="LanZ2z" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select one" id="gwLlk9" />)
          </span>
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
          <FormattedMessage defaultMessage="Financial instrument" id="+Hbd1j" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="select one" id="gwLlk9" />)
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
          <FormattedMessage defaultMessage="How will the money be used?" id="1t1fGY" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />)
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Please briefly describe the main groups of activities or components for the implementation of the project. It is not necessary to be very detailed, just a logical sequence of the general lines of action. These groups of activities should be used to define the estimated budget below."
              id="+4Udxw"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Has this project been funded before?" id="GdS9Mk" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="Yes / No" id="aNY6/x" />) *
          </span>
        </li>
        <li>
          <FormattedMessage
            defaultMessage="How much money did the project received or raised?"
            id="Nqe54a"
          />
        </li>
        <li>
          <FormattedMessage defaultMessage="From which investor or funder?" id="SXKvVa" />
        </li>
        <li>
          <FormattedMessage defaultMessage="Replicability of the project" id="qoImFc" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />)
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Explain how the solution or project can be replicated in other contexts and geographies. Think practically about the existing opportunities, the partners and allies needed as well as the barriers that this replication effort may face such as climate issues, regulations and legal frameworks, land tenure, institutional capacity, etc."
              id="6MoU6D"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Sustainability of the project" id="8MAKwj" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />)
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Explain how the impact of the solution or project will be maintained after funding.  Try to be specific and not too vague. Is the solution or project will be financially viable? How? What are the key elements to ensure sustainability (business model, partners, partnerships with governments, etc.)?"
              id="oN8abW"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Progress and impact tracking" id="JJQfhh" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />)
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="How do you plan to measure the progress and impact of the project or solution? What would be the key indicators to be used for these measurements?"
              id="yb3Bot"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Short description of the project" id="YWQkk+" />{' '}
          <span className="italic font-normal">
            (<FormattedMessage defaultMessage="max 600 characters" id="UhT/Dv" />) *
          </span>
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="This description should succinctly explain your project. It should be a catching text since it's the first thing investors will read."
              id="VaC9C0"
            />
          </p>
        </li>
        <li>
          <FormattedMessage defaultMessage="Relevant links" id="Si0U4V" />{' '}
          <p className="font-light text-gray-600">
            <FormattedMessage
              defaultMessage="Use this space to share links to documents, videos and websites that support your pitch."
              id="efZTBX"
            />
          </p>
        </li>
      </ol>

      <div className="mt-4">
        * <FormattedMessage defaultMessage="mandatory fields" id="Gxnfj4" />
      </div>
    </>
  );
};

export default ProjectInfo;

import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

export const ProjectImpact: FC = () => (
  <>
    <p>
      <FormattedMessage
        defaultMessage="HeCo Invest relies on the ARIES ARtificial Intelligence platform to estimate − in a scientifically-informed and accurate manner − the impact of each project in each one of our four “sustainability dimensions”, based on existing knowledge and data. These impacts are calculated on a scale from 0 to 10, as shown in the chart of impact, considering a combination of landscape-level variables and self-reported project data."
        id="BMrTK1"
      />
    </p>
    <ol className="mt-4 ml-6 list-disc">
      <li>
        <FormattedMessage
          defaultMessage="<b>Biodiversity</b>: areas of great ecosystem diversity as well as with a degree of threat or protection for flora and fauna, and where more investments in conservation, restoration, and scientific knowledge are needed."
          id="up42nX"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </li>
      <li className="mt-2">
        <FormattedMessage
          defaultMessage="<b>Climate</b>: areas with high carbon storage potential where land sector interventions can be implemented for climate regulation."
          id="62884j"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </li>
      <li className="mt-2">
        <FormattedMessage
          defaultMessage="<b>Water</b>: areas with environmental factors that will help maintain the availability and regulation of water resources, including reducing risks such as floods and droughts."
          id="v9JR0p"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </li>
      <li className="mt-2">
        <FormattedMessage
          defaultMessage="<b>Community</b>: areas with production systems and sustainable practices where local and indigenous communities can thrive while enhancing their adaptation to climate change."
          id="f6GN1M"
          values={{
            b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
          }}
        />
      </li>
    </ol>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="The methodology that estimates the project’s impacts is based on a supply-and-demand framework, where <b>Demand</b> responds to the question: “what does the local context need?” and <b>Supply</b> to the question “What is the project providing?”. For a project to satisfy the needs of a local context, supply needs to meet the demand, and vice versa."
        id="dYFllx"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="A score of expected impact along the four sustainability dimensions is assigned to every project. These scores are calculated using a combination of landscape-level variables (<b>Demand</b>) and self-reported project data (<b>Supply</b>)."
        id="Dm1lEK"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="At the <b>Landscape level</b>, a composite index combining the set of indicators identified for each dimension is used to calculate <b>Context scores</b>, with values ranging from 0 to 1. <b>Demand</b> is then computed as 1 - <b>Context score</b>, representing the “quantity” missing to reach 1, where 1 assumes the best sustainability conditions. Because the demand can be considered at multiple scales (namely, municipality, hydrological basins, and HeCo Priority Landscapes), the demand score is computed using zonal statistics at a user-specified scale, with the municipality level being the default. Unlike municipalities and hydrographic basins, the HeCo Priority Landscapes don’t cover the entire country, and therefore <b>if the project area doesn't fall into any of the Priority Landscapes, the impact of that project will be zero at that particular scale</b>."
        id="BqrQ5O"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="At the <b>Project level</b>, the analysis is meant to communicate the expected impact of individual projects on the ground. This information is provided by project developers during the project registration phase. The following key indicators have been identified to inform if the project is appropriate in its local context."
        id="H0r0a5"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="<b>Biodiversity</b>:"
        id="du2+Gq"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <ol className="mt-4 ml-6 list-disc">
      <li>
        <FormattedMessage defaultMessage="Conservation" id="3BcZ1K" />
      </li>
      <li>
        <FormattedMessage defaultMessage="Restoration" id="cIQfgu" />
      </li>
      <li>
        <FormattedMessage defaultMessage="Pollutants reduction" id="u2WlCd" />
      </li>
    </ol>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="<b>Climate</b>:"
        id="rb3Hsm"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <ol className="mt-4 ml-6 list-disc">
      <li>
        <FormattedMessage defaultMessage="Carbon emissions reduction" id="8IPyXf" />
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
    </ol>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="<b>Water</b>:"
        id="r333tD"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <ol className="mt-4 ml-6 list-disc">
      <li>
        <FormattedMessage defaultMessage="Water capacity or efficiency" id="+tol9p" />
      </li>
      <li>
        <FormattedMessage defaultMessage="Hydro-meteorological risk reduction" id="zkzBCh" />
      </li>
      <li>
        <FormattedMessage defaultMessage="Sustainable food" id="V1MZuC" />
      </li>
    </ol>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="<b>Community</b>:"
        id="xQArDr"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <ol className="mt-4 ml-6 list-disc">
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
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="To estimate the project’s impact, 0 (non-selected) and 1 (selected) are assigned for each indicator. The <b>Supply</b> score of each sustainability dimension is then computed by taking the mean value of the corresponding indicators. <b>However, if all the indicators of a given dimension are selected, then the supply score of that dimension goes automatically to 0</b>. This is to make sure that the project developers only report the direct impacts of their projects and do not overstretch the project’s scope."
        id="HQuME/"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
    <p className="mt-4">
      <FormattedMessage
        defaultMessage="With a known <b>Demand</b> and <b>Supply</b>, a <b>Net value</b> is generated as <b>Supply</b> - <b>Demand</b>. This value ranges from -1 to 1. The closest the net value to 0 the better because it means that supply meets demand and vice versa. The Net value is then transformed into an <b>impact score</b>, using the formula y = - (x^​2) + 1. The results range from 0 to 1, where 0 is the low positive impact and 1 is a high positive impact, in relation to the context demand. Finally, this value is multiplied by 10 to rescale it from 0 to 10."
        id="LxYOKo"
        values={{
          b: (chunks: string) => <span className="font-semibold">{chunks}</span>,
        }}
      />
    </p>
  </>
);

export default ProjectImpact;

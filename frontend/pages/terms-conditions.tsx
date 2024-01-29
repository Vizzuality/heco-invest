import { FormattedMessage, useIntl } from 'react-intl';

import { withLocalizedRequests } from 'hoc/locale';

import { InferGetStaticPropsType } from 'next';

import { loadI18nMessages } from 'helpers/i18n';

import Head from 'components/head';
import LayoutContainer from 'components/layout-container';
import { StaticPageLayoutProps } from 'layouts/static-page';
import { PageComponent } from 'types';

export const getStaticProps = withLocalizedRequests(async ({ locale }) => {
  return {
    props: {
      intlMessages: await loadI18nMessages({ locale }),
    },
  };
});

type TermsConditionsProps = InferGetStaticPropsType<typeof getStaticProps>;

// CONTENT FROM: https://docs.google.com/document/d/1c-AEEilczfLNjzBZy11h0JGfft0elL-0/edit

const TermsConditions: PageComponent<TermsConditionsProps, StaticPageLayoutProps> = () => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Head title={formatMessage({ defaultMessage: 'Terms & Conditions', id: 'arPp4e' })} />
      <LayoutContainer className="bg-background-light overflow-hidden">
        <div className="h-auto">
          <h1 className="mb-6 font-serif text-xl text-center text-green-dark">
            <FormattedMessage
              defaultMessage="TERMS AND CONDITIONS OF THE HeCo Invest PLATFORM"
              id="6HVIBd"
            />
          </h1>
          <div className="my-4 mb-12 space-y-4">
            {formatMessage(
              {
                defaultMessage: `
                <p>Please read these Terms and Conditions carefully. This is a legal, binding contract between you and the Fondo Mundial para la Naturaleza Colombia (“<n>WWF Colombia</n>”), as manager of the HeCo Invest Platform. These Terms of Service apply to your access to and use of the Platform as a registered user and to the capabilities and information made available to you by using it. By clicking the "I AGREE" button, you confirm that you understand these Terms and Conditions and expressly agree to be bound by them in their entirety. If you are requesting to use the Platform on behalf of a third party, whether an organization or other legal entity, you also declare that you have the authority to bind the legal entity and that the legal entity is duly incorporated, valid and aware of its obligations. You further agree that the legal entity shall be bound by and liable for any breach of these Terms and Conditions.</p>
                <p>This Platform and its functionalities are provided for professional use only. By registering as a User, you acknowledge that the Platform and any content may not be used for personal, family or household purposes.</p>
                <p>The Platform is provided by WWF Colombia free of charge and solely as a space for exchanging information. WWF Colombia reserves the right to suspend or terminate any registered account and its associated User I.D. at any time, at its sole discretion, and for any or no reason.</p>
                <p>Any person who intends to use the "HeCo Invest" Platform declares to have read, understood, and fully accepted these Terms and Conditions, as well as any document attached to them and other conditions referred to in other binding documents, such as the Privacy Policy of WWF Colombia, which can be accessed at the following link: https://wwf. panda.org/en/privacy/. If you do not accept any one of the provisions included in these Terms and Conditions, you may not register to use the Platform and should abstain from using it. However, you can obtain and / or exchange information about the Projects through channels other than the Platform.</p>
                <p>These terms and conditions shall describe the relationship between (i) WWF Colombia, as authorized administrator of the Platform, (ii) the bidders or implementers of the Projects; and (iii) the potential donors or investors of the Projects, as defined below. These terms and conditions include the rights, duties and limitations of the Participating Agents (as defined below) interacting on the Platform, as well as the rules under which the relationship will be maintained.</p>
                <p>By registering for and entering the Platform, requesting the Projects’ monitoring and progress status, applying for Projects, or any other unequivocal expression to use the Platform and/or the express electronic acceptance of these Terms and Conditions, the Participating Agent states their consent and acceptance of them. All of the above materializes when you click and / or double-click on the links the Platform's website has available for such purposes, as well as when entering and accessing the Platform's information.</p>
                <p>Moreover, by performing any of the aforementioned actions, the Participating Agents declare and guarantee that they have the legal capacity and necessary powers to be bound, in accordance with these Terms and Conditions and the particular conditions that may come about between the different Participating Agents as a consequence of using the Platform.</p>
                <p>The Participating Agents declare that they have carefully read and fully accepted these Terms and Conditions, our Privacy Policy (<a>https://wwf.panda.org/es/privacidad/</a>), and any other documents referenced in these Terms and Conditions.</p>
                `,
                id: 'ekD+NP',
              },
              {
                n: (...chunks) => <span className="font-semibold">{chunks}</span>,
                a: (...chunks) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                    href="https://wwf.panda.org/en/privacy/"
                  >
                    {chunks}
                  </a>
                ),
                p: (...chunks) => <p className="">{chunks}</p>,
              }
            )}
          </div>
          <ol className="ml-6 my-8 space-y-12 offset-target-anchor [counter-reset:section]">
            <li className="[counter-increment:section] marker:[content:counters(section,'.')'.\00a0']">
              <a href="#definitions">
                <h2 id="definitions" className="font-semibold underline">
                  <FormattedMessage defaultMessage="DEFINITIONS" id="VIxyu8" />
                </h2>
              </a>
              <p className="my-4">
                <FormattedMessage
                  defaultMessage="The following expressions shall have the meaning indicated below:"
                  id="so6v6Q"
                />
              </p>
              <ol className="[counter-reset:subsection]">
                {formatMessage(
                  {
                    defaultMessage: `
                <li>
                  <p><n>Manager:</n> The administrator of the Platform is WWF Colombia, or the entity that acts in its stead in this function. They may define the projects and respective information for publication within the Platform.</p>
                </li>
                <li>
                  <p><n>Donor Agent or Investor:</n> Any person who is a registered user of the Platform and intends to directly contribute resources to a Project, by means of a Donation or investment, for its implementation and / or execution.</p>
                </li>
                <li>
                  <p><n>Participating Agent:</n> The Donor Agents, Investors and Bidders or Implementers of the Projects, jointly, who are registered users of the Platform.</p>
                </li>
                <li>
                  <p><n>Donation:</n> An action by which a Donor Agent freely, gratuitously and irrevocably transfers a portion of its assets to the Bidders or Implementers of a Project to make the Project financially feasible and stable.</p>
                </li>
                <li>
                  <p><n>Project Bidders or Implementers:</n> These are the people responsible for developing and / or managing the projects and their implementation, and those who will publish relevant information about their Projects through the Platform with the objective of attracting and mobilizing Donor Agents or Investors.</p>
                </li>
                <li>
                  <p><n>Platform:</n> The digital platform designed to promote interaction between Participating Agents to encourage and facilitate financing Projects. The Platform will allow visualizing the Projects, for Donor Agents or Investors to be able to have the relevant information about them.</p>
                </li>
                <li>
                  <p><n>Project:</n> These are conservation and sustainable development projects within the territory of the Republic of Colombia, to be implemented and/or executed by the Project Owners or administrators.</p>
                </li>`,
                    id: 'VADZzs',
                  },
                  {
                    n: (...chunks) => <span className="font-semibold">{chunks}</span>,
                    p: (...chunks) => <p className="">{chunks}</p>,
                    li: (...chunks) => (
                      <li className="ml-14 [counter-increment:subsection] marker:[content:'1.'counters(subsection,'.')'.\00a0']">
                        {chunks}
                      </li>
                    ),
                  }
                )}
              </ol>
            </li>
            <li className="list-decimal">
              <a href="#platform_administrator">
                <h2 id="platform_administrator" className="font-semibold underline my-4">
                  PLATFORM ADMINISTRATOR
                </h2>
              </a>
              <p>
                {formatMessage(
                  {
                    defaultMessage:
                      'The “HeCo Invest” is administered by World Wildlife Fund Colombia (WWF), a non-profit entity identified with TIN No. 901.285.046-1 and with its registered office in the city of Bogotá D.C. (hereinafter "<n>WWF Colombia</n>" or simply the "<n>Administrator</n>").',
                    id: 'iq+ywW',
                  },
                  {
                    n: (...chunks) => <span className="font-semibold">{chunks}</span>,
                  }
                )}
              </p>
            </li>
            <li className="list-decimal">
              <a href="#nature_of_the_platform">
                <h2 id="nature_of_the_platform" className="font-semibold underline">
                  <FormattedMessage defaultMessage="NATURE OF THE PLATFORM" id="+SGEOY" />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                  <p>The Platform is designed to generate an online space and ecosystem that encourages the dissemination of projects with a socio-environmental impact in the Colombian Amazon and other areas within the Republic of Colombia. It allows Donor Agents or Investors to learn about the different Projects that are designed and presented by their respective Bidders or Implementers.</p>
                  <p>It is expressly established that neither the Platform nor WWF Colombia are or will be responsible for the design, preparation, status, development, execution, feasibility, financial stability, solvency, performance, or completion of the Projects. Nor shall they be responsible for or interfere in any way in receiving or transferring Donations, which shall be made and agreed upon directly between the Donor Agents or Investors and the Project Bidders or Implementers, through means and/or channels outside the Platform.</p>
                  <p>The Platform will use technology and algorithms to provide smart data and tools in a single place, seeking to connect governments, donors, investors and philanthropists with carefully identified investments, projects and stakeholders in high-priority locations. The Platform will have a baseline impact measurement tool, which will provide information to potential investors on the Project's compliance with social and environmental aspects.</p>
                  <p>The Donor Agents or investors understand and declare under oath that the Platform is not designed to satisfy consumption needs and, therefore, Project financing and the result of the investments will be destined towards fulfilling the needs inherent to their corporate purposes and corresponding economic activities. Consequently, any relationship that arises with effects or from using the Platform shall be regulated in accordance with the contractual, commercial and regulatory terms that apply to the very nature of the agreement entered into between the respective Participating Agents (without any interference or intervention by WWF Colombia). It also explicitly excludes the application of Law 1480 of 2011 and its regulatory decrees.</p>
                  <p>Notwithstanding the above, in the event the Donor Agent or Investor makes contributions to a Project without the purpose of obtaining returns and for mere liberality or philanthropy, they also acknowledge that the Platform and WWF Colombia, its controlling company, controlled companies and / or agents do NOT participate in the contractual or commercial relationship that may arise with the Project Bidders or Implementers.</p>`,
                    id: 'Wikb8J',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#intended_platform_users">
                <h2 id="intended_platform_users" className="font-semibold underline">
                  <FormattedMessage defaultMessage="INTENDED PLATFORM USERS" id="0BG19M" />
                </h2>
              </a>
              <p className="my-4">
                <FormattedMessage
                  defaultMessage="The Platform has been designed and is intended to be a means through which Donor Agents or Investors can learn about the Projects, to be able to eventually contact the Project Bidders or Implementers and establish a contractual relationship between them, independently and without any intervention by WWF Colombia, that leads to the Donor Agent or Investor eventually donating or investing resources to a specific Project."
                  id="YTmla9"
                />
              </p>
            </li>
            <li className="list-decimal">
              <a href="#requirements_for_participating_in_the_platform">
                <h2
                  id="requirements_for_participating_in_the_platform"
                  className="font-semibold underline"
                >
                  <FormattedMessage
                    defaultMessage="REQUIREMENTS FOR PARTICIPATING IN THE PLATFORM"
                    id="L0XQ5n"
                  />
                </h2>
              </a>
              <p className="my-4">
                <FormattedMessage
                  defaultMessage="In addition to fully accepting these Terms and Conditions, in order for Participating Agents to access and use the Platform, they must comply with the following requirements established according to the corresponding profile in which they intend to participate:"
                  id="0wVDCr"
                />
              </p>
              <ul className="space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                  <li>
                    In the case of Project Bidders or Implementers:
                    <ul>
                    <lis>Publishing projects that meet the parameters and criteria established by WWF Colombia (including environmental and social safeguards) and that WWF Colombia will make available to registered users within the Platform.</lis>
                    <lis>Providing the minimum information on the Project, which includes, but is not limited to, the following information: (i) the person in charge of the Project; (ii) the geographic location of the Project; (iii) a description of the socio-environmental benefits of the Project; (iv) the estimated amount for the Project’s execution and sustainability; (v) the estimated date of the Project’s start-up of operations, if it is not yet operational; and (vi) contact information.</lis>
                    <lis>Having a virtual, telephone or face-to-face contact site through which interested Donor Agents or Investors can contact the Project Bidder or Implementer and make a Donation.</lis>
                    <lis>By accepting these Terms and Conditions, and in accordance with the provisions set forth in section 6 below, a free license is expressly authorized and granted in favor of the Administrator, as well as its controlling entities, controlled entities and / or agents appointed by the latter, for them to use and reproduce the trademarks, trade names, images, videos, recordings, information, materials, and any other intellectual work provided by the Project Bidders and Implementers, to be used on the Platform and because of it.</lis>
                    <lis>By accepting these Terms and Conditions, they expressly authorize Processing their Personal Data or that of their shareholders, contributors, agents or any person appointed to communicate with the Administrator, its controlling company and controlled companies and / or agents appointed by the latter.</lis>
                    <lis>They declare that they have read and fully accepted the Platform's Personal Data Processing Policy, available at <a>https://www.wwf.org.co/politica_de_tratamiento_de_datos/</a>.</lis>
                    <lis>Abstaining from using the Platform for illegal purposes, going against good faith. Furthermore, they must abstain from using tools designed for copying algorithms, source codes or any Platform functionality.</lis>
                    <lis>Ensuring the veracity and timeliness of the information on the Projects, immediately informing the Administrator of any inconsistencies or errors in the information about the Projects and cooperating in the information’s timely correction.</lis>
                    </ul>
                  </li>
                  <li>
                    The Donor Agents or Investors:
                    <ul>
                    <lis>They declare that they have read and fully accepted the Platform's Personal Data Processing Policy, available at <a>https://www.wwf.org.co/politica_de_tratamiento_de_datos/</a></lis>
                    <lis>By accepting these Terms and Conditions, they expressly authorize Processing their Personal Data or that of their shareholders, contributors, agents or any person appointed to communicate with the Administrator, its controlling company and controlled companies and / or agents appointed by the latter.</lis>
                    <lis>Contacting the Project Bidder or Implementer to make a Donation under the terms to be agreed upon directly (and outside the Platform) between the Donor Agent or investor and the Project Bidder or Implementer.</lis>
                    <lis>Abstaining from using the Platform for illegal purposes, going against good faith. Furthermore, they must abstain from using tools designed for copying algorithms, source codes or any Platform functionality.</lis>
                    <lis>Immediately informing the Administrator of any inconsistencies or errors in the information about the Projects.</lis>
                    </ul>
                  </li>
                  `,
                    id: 'qHFOUd',
                  },
                  {
                    ul: (...chunks) => <ul className="space-y-4 mt-4">{chunks}</ul>,
                    li: (...chunks) => <li className="list-lower-latin ml-9">{chunks}</li>,
                    lis: (...chunks) => <li className="list-disc ml-8">{chunks}</li>,
                    a: (...chunks) => (
                      <a
                        href="https://www.wwf.org.co/politica_de_tratamiento_de_datos/"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {chunks}
                      </a>
                    ),
                  }
                )}
              </ul>
            </li>
            <li className="list-decimal">
              <a href="#content_provided">
                <h2 id="content_provided" className="font-semibold underline">
                  <FormattedMessage
                    defaultMessage="CONTENT PROVIDED TO WWF COLOMBIA OR PUBLISHED ON THE PLATFORM"
                    id="qTYGjp"
                  />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>With respect to the way you use the Platform, you may provide and submit certain information and / or content to WWF Colombia and/or the Platform over which you have any and all required ownership or usage rights (the "Shared Information"). Based on the ownership or required rights you hereby represent and warrant you have over the Shared Information, you grant WWF Colombia a non-exclusive, irrevocable, worldwide, royalty-free right to copy, distribute, transmit, display, publish, remove, preserve, translate, analyze, reformat, edit and use (including individually and in collective works) any Shared Information you provide in connection with the Projects or your use of the Platform, and to publish your name with respect to your Shared Information, in any manner now known or hereafter discovered, without any further consent or notice to you or any third party, which shall be a License. The License includes WWF Colombia’s right to authorize Users (whether or not they are Registered Users), free of royalties, to copy, distribute and otherwise exploit any of the Shared Information, in accordance with the rights granted to WWF Colombia under this Agreement. In this regard, no compensation will be paid to you or any third party with respect to using your Shared Information and the License granted as provided in this section.</p>
                      <p>You understand and agree that, in the event you choose to remove any information and / or content you previously posted, (i) there can be no assurance that such information and / or content will thereafter cease to be accessible to the public (whether on the Platform or otherwise) and (ii) any person who has previously downloaded or otherwise copied such information and/or content will continue to have all rights to use the information and / or content as granted by you, in accordance with these Terms and Conditions.</p>
                      <p>By providing any Shared Information to the Platform, you represent and warrant that you have all the necessary rights to submit such information, and that the content thereof is accurate, non-confidential and does not violate any contractual restrictions or other third party rights. You further warrant that, in the event there is copyrighted material included in the Shared Information, such material is your original work or is your property, and that you have all rights and authorizations required to assign all the rights necessary to grant the License and any other rights granted by you, pursuant to these Terms and Conditions, to WWF Colombia and other Participating Agents for the full term of the protection. Finally, you represent and warrant that you have the financial, intellectual and human resources necessary to carry out the activities proposed in your Confidential Information.</p>
                      <p>On the other hand, WWF Colombia has not undertaken to monitor, review, evaluate, edit, filter or validate such information and/or content. WWF Colombia, on its own and with its affiliates, excludes any warranty with respect to any information and / or content, features or functions available on or through the Platform. However, WWF Colombia reserves the right to reject, refuse to post or remove any Shared Information posted by you, or to deny, restrict, suspend or terminate your access to all or any part of the Platform at any time, for any or no reason, with or without prior notice or explanation, and without liability. To be clear, WWF Colombia has no obligation to store, maintain or provide you a copy of any information and / or content that you or other Participating Agents provide when using the Platform, whether during the term of your registration or at the time of or after your termination. You are solely responsible for backing up your own Shared Information and any electronic communications you send or receive using the Platform.</p>
                    `,
                    id: 'M6JiUw',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#conditions_for_use">
                <h2 id="conditions_for_use" className="font-semibold underline">
                  <FormattedMessage defaultMessage="CONDITIONS FOR USE" id="0n296E" />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>In order to register and activate the users' accounts, the Administrator reserves the right to require uploading or sending the necessary documentation to verify (i) the capacity in which the Participating Agent would act; (ii) the corporate purpose and / or economic activities of the Participating Agent, if applicable; (iii) in the case of the Project Bidders or Implementers, additional information on their characteristics, suitability, experience, equipment and relevant information on the Project; and (iv) any other matter or information the Administrator deems necessary to verify.</p>
                      <p>Failure to comply with any of the requirements listed above in these Terms and Conditions shall entitle the Administrator to deny or revoke permission to use the Platform.</p>
                      <p>Notwithstanding the above, in order to fully exercise their responsibilities, the Administrator reserves the right to review any information and / or materials provided by Participating Agents, to define the content published on the Platform, to use or not to use any information and / or materials provided by Participating Agents, to remove any information and / or materials uploaded from the Platform, and to suspend and close user accounts, at its sole discretion and without liability.</p>
                      <p>The Participating Agents declare that the Administrator is not and shall not be responsible for receiving or administering any resources or funds from the donations or investments the Donor Agents or Investors decide to make at their own risk in the Projects. Neither shall they be responsible for issuing donation certificates or any other document that certifies a donation or investment, nor for the existence of a relationship between the Donor Agents or Investors and the Project Bidders or Implementers.</p>
                      <p>WWF Colombia and its affiliates are not responsible for and do not guarantee, recommend or endorse, as the case may be: (i) the accuracy, quality or effectiveness of any Shared Information of any User, (ii) the suitability of the translation, if the original information and / or content is translated, (iii) the contents accessible through links to other sites, (iv) the success of any project or collaboration with another User or third party that may result from Shared Information. The Platform and WWF Colombia shall not be a party to or responsible in any way for overseeing any transaction between you and any other user or third party.</p>
                    `,
                    id: '42anRz',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#warranties_and_representations">
                <h2 id="warranties_and_representations" className="font-semibold underline">
                  <FormattedMessage defaultMessage="WARRANTIES AND REPRESENTATIONS" id="TYM9JW" />
                </h2>
              </a>
              <p className="my-4">
                <FormattedMessage
                  defaultMessage="Participating Agents who intend to use the Platform declare and commit themselves to the following:"
                  id="9A26z6"
                />
              </p>
              <ol className="space-y-4 ml-4 [counter-reset:subsection] [counter-set:'subsection 8']">
                {formatMessage(
                  {
                    defaultMessage: `
                  <li>Use the Platform according to the purposes and functionalities described in these Terms and Conditions.</li>
                  <li>Fulfill the promises of value that have been set forth in the Platform.</li>
                  <li>In the case of the Project Bidders or Implementers, to immediately inform any change in the financial, planning or execution status, or any other circumstance that may alter the Donor Agents or Investors’ decision to make their Donations.</li>
                  <li>Immediately inform the Administrator of any deviation or inconsistency between the information expressed in the Platform and that which was provided by the Project Owner or administrator at the time of direct negotiation between them.</li>
                  <li>Protect and maintain the confidential and reserved nature of their login credentials to the Platform (username, password, etc.), and instruct their designated agents on using these credentials and the possible consequences of publishing, circulating or using them improperly or without authorization for the Participating Agent. Each Participating Agent shall immediately notify WWF Colombia of any unauthorized use of its account or any other breach of security or account integrity.</li>
                  <li>Act in good faith, in accordance with the purposes and functionalities of the Platform, always displaying a transparent behavior through which, under no circumstances, false information or content is presented.</li>
                  <li>The Participating Agents, and particularly the Project Bidders or Implementers, shall guarantee and be solely responsible, in all cases, for the truthfulness, accuracy, validity and authenticity of the information each one of them presents and provides on the Platform.</li>
                  <li>The Participating Agents shall hold the Administrator harmless and indemnify them for any error, falsehood and/or inaccuracy in the information of the Projects they share or make available on the Platform.</li>
                  <li>Participating Agents agree and acknowledge that the Administrator will use the e-mail address registered in the account as the primary method of communication.</li>
                  <li>The Administrator may suspend or cancel an existing account or terminate a Project for any reason, at its sole discretion, including in the event the Administrator considers there has been a breach of these Terms and Conditions, the Privacy and Personal Data Processing Policy, Colombian law or good faith, or by committing acts (or omissions) that may damage or compromise the Administrator in any way.</li>
                  `,
                    id: 'HC+nYF',
                  },
                  {
                    li: (...chunks) => (
                      <li className="ml-9 [counter-increment:subsection] marker:[content:'8.'counters(subsection,'.')'.\00a0']">
                        {chunks}
                      </li>
                    ),
                  }
                )}
              </ol>
            </li>
            <li className="list-decimal">
              <a href="#hyperlinks_and_cookies">
                <h2 id="hyperlinks_and_cookies" className="font-semibold underline">
                  <FormattedMessage
                    defaultMessage="HYPERLINKS TO OTHER WEBSITES AND COOKIES"
                    id="lrDYpS"
                  />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>The Participating Agent accepts that the Administrator may use cookies and other similar technology, both in the Platform, its content, services, and in the e-mails or messages sent to the Participating Agents, for the following purposes, but not limited to these: authenticating users, recording activities on the Platform, improving the functionality of the Platform, recommending optimizations of the offered Projects, analyzing trends, analyzing the demographic information of those who visit the Platform and use the offered services, evaluating the effectiveness of its advertising, the behavior of the Platform’s Participating Agents, and the result of the activities executed there, determining who has opened the sent e-mail or message and the format in which it was sent. These tools allow obtaining, among others things, information regarding the type of browser and operating system that was used, the IP address, the time spent on the Platform and the number of visits made to the Platform, how it was used, the Projects visited by Participating Agents, and the Projects that have not led to effective contacts.</p>
                      <p>The Participating Agent may configure its browser to disable and delete cookies, in which case, although it may continue to visit the Platform, access to certain features of the Platform may be limited or restricted.</p>
                      <p>Finally, it is established that the Administrator shall not be responsible for the User's navigation within other URLs that may be accessed through the Platform.</p>
                    `,
                    id: '1L8hnq',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#intellectual_property_of_the_platform">
                <h2 id="intellectual_property_of_the_platform" className="font-semibold underline">
                  <FormattedMessage
                    defaultMessage="INTELLECTUAL PROPERTY OF THE PLATFORM"
                    id="pnOLJy"
                  />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>The Platform, trademarks and other distinctive signs included therein, as well as the rights over the intellectual creations and related rights, including the source codes used to properly operate the Platform, are protected by intellectual property laws and international treaties on the matter. The name, logos, and names associated with the Platform are registered trademarks of, and / or licensed by, WWF Colombia, and under no circumstances shall it be understood that any right or license is granted or conferred with respect to them.</p>
                      <p>Unless the Administrator has granted prior, express and written authorization, the Participating Agents may not copy, modify, distribute, sell, rent or exploit the trademarks, distinctive signs, or the information or content of the Platform in any other way. Moreover, the Participating Agents may not carry out reverse engineering operations or any other operation aimed at obtaining any source code contained in the Platform.</p>
                      <p>The trademarks, distinctive signs and other protected or potentially protectable works of the Project Bidders or Implementers that are displayed on the Platform will remain their property, authorizing the Administrator to use and reproduce them for the purposes of the Platform. The Participating Agents must abstain from carrying out any act or omission that may affect the rights of the Project Bidders or Implementers.</p>
                    `,
                    id: 'q23our',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#personal_data_protection">
                <h2 id="personal_data_protection" className="font-semibold underline">
                  <FormattedMessage defaultMessage="PERSONAL DATA PROTECTION" id="YEaYDm" />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>When the Participating Agent of the Platform, if an individual, finishes their registration for the Platform and accepts these Terms and Conditions, authorizes and provides consent to the following previously, freely, expressly and informedly, to <n>WWF Colombia</n>, a non-profit entity identified with NIT No. 901.285.046-1 and corporate address at Carrera 10ª No. 69ª-44 of the city of Bogotá D.C., telephone number +6014431550 and e-mail address <mail>info@wwf.org.co</mail>: to collect, store, circulate, transmit, transfer, delete, and generally process their personal data to manage their registration in the Platform, act as the initial point of contact between the Project Bidder or Implementer and the Donor Agent or Investor, as well as for the other purposes described in WWF Colombia’s Personal Data Processing Policy, which is available at the following link: <a>https://www.wwf.org.co/politica_de_tratamiento_de_datos/</a>.</p>
                      <p>The Participating Agent declares to have read and fully understood the aforementioned Personal Data Processing Policy, including the sections on their rights to know, update, correct and delete their data, be informed of how it has been used, file complaints before the Superintendence of Industry and Commerce, revoke their consent and the mechanisms to make their rights effective. In the event the Participating Agent does not grant or subsequently revokes its consent to processing personal data in accordance with this section, it may be limited or prevented from accessing its account and / or the Platform, as well as from navigating or using certain functionalities of the Platform.</p>
                      <p>You acknowledge, consent and agree that WWF Colombia may access, preserve and disclose your registration and any other provided information if required to do so by law or if its preservation or disclosure is reasonably necessary to: (i) comply with legal proceedings, including, but not limited to, civil and criminal subpoenas, court orders or other compulsory disclosures; (ii) enforce these Terms and Conditions; (iii) respond to claims of a violation of the rights of third parties, whether or not the third party is a User, individual or government agency; (iv) respond to customer service inquiries; or (v) protect the rights, property or personal safety of WWF Colombia and its affiliates, other Users or the public.</p>
                    `,
                    id: 'MWocTK',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                    a: (...chunks) => (
                      <a
                        href="https://www.wwf.org.co/politica_de_tratamiento_de_datos/"
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {chunks}
                      </a>
                    ),
                    mail: (...chunks) => (
                      <a className="underline" href="mailto:info@wwf.org.co">
                        {chunks}
                      </a>
                    ),
                    n: (...chunks) => <span className="font-semibold">{chunks}</span>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#future_developments">
                <h2 id="future_developments" className="font-semibold underline">
                  <FormattedMessage
                    defaultMessage="FUTURE DEVELOPMENTS; MODIFICATION TO THE TERMS AND CONDITIONS"
                    id="r+rPoX"
                  />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>The Administrator may update, modify, expand or reduce the functionalities, structure and/or presentation of the Platform without prior notice to the Participating Agents.</p>
                      <p>Additionally, WWF Colombia reserves the right to modify these Terms and Conditions under which the Platform is offered. Said modification shall enter into force at the moment WWF Colombia publishes it on the Platform. Your continued use of the Platform after WWF Colombia publishes any modification or update to these Terms and Conditions demonstrates your irrevocable acceptance of the new revised Terms and Conditions. Therefore, you should review these Terms and Conditions regularly to be aware of your rights and obligations.</p>
                    `,
                    id: 'TyyUdt',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#liability">
                <h2 id="liability" className="font-semibold underline">
                  <FormattedMessage defaultMessage="LIABILITY" id="7pa9RN" />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>In consideration of the characteristics and scope of the Platform and those related to its nature, the Administrator does not guarantee that the operation will be uninterrupted or free of defects (for example: bugs, incompatibility with certain software or hardware, etc.). More specifically, the Administrator cannot be held liable for any reason whatsoever due to technical problems or errors relating to: telephone networks or lines; computer systems, including on-line and / or on the cloud, server and / or provider; computer equipment; software; e-mail programs not working; plug-in use; technical problems; traffic congestion on the Internet or power failures.</p>
                      <p>The Administrator reserves the right to modify, suspend or interrupt the Platform’s operation, completely or partially, at any time, without notice and without having to justify the reasons for the limitation.</p>
                      <p>Therefore, the Participating Agents may not hold the Administrator liable, in any way, for a malfunction of the Platform, even if this malfunction may cause errors and / or delays related to negotiations between the Participating Agents that have arisen under the Platform.</p>
                    `,
                    id: 'hcfVKr',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#platform_failures">
                <h2 id="platform_failures" className="font-semibold underline">
                  <FormattedMessage defaultMessage="PLATFORM FAILURES" id="TPV0jP" />
                </h2>
              </a>
              <div className="my-4 space-y-4">
                {formatMessage(
                  {
                    defaultMessage: `
                      <p>The Administrator is not responsible for any damage, harm or loss caused due to failures in the Platform derived from the server or Internet. Neither shall the Administrator be liable for any viruses that may infect your computer as a result of your access to or use of the Platform or as a result of any transfer of data, files, images, text, or audio therein. The Participating Agent shall not be held liable for any loss of profit, nor shall it be entitled to demand payment for loss of profit due to damages resulting from technical difficulties or internet failures. The Administrator does not guarantee continuous or uninterrupted access to or use of its Platform.</p>
                      <p>The Platform may eventually be unavailable due to technical difficulties or internet failures, or due to any other circumstance beyond the Administrator's control. In these cases, efforts will be made to restore it as quickly as possible, without the Administrator being held liable in any way.</p>
                      <p>The Administrator shall not be liable for any errors or omissions by the Participating Agent within the Platform.</p>
                    `,
                    id: 'T9Kfvd',
                  },
                  {
                    p: (...chunks) => <p className="">{chunks}</p>,
                  }
                )}
              </div>
            </li>
            <li className="list-decimal">
              <a href="#applicable_law">
                <h2 id="applicable_law" className="font-semibold underline">
                  <FormattedMessage defaultMessage="APPLICABLE LAW" id="WpW0QR" />
                </h2>
              </a>
              <p className="mt-4">
                <FormattedMessage
                  defaultMessage="The Participating Agent agrees that these Terms and Conditions shall be governed by Colombian law. In this document’s analysis, the documents herein shall be interpreted in the following order: (i) these Terms and Conditions; (ii) the Privacy and Personal Data Processing Policies; and (iii) any other written document signed by the Participating Agent and the Administrator to be part of the binding documents.s"
                  id="CzqYh8"
                />
              </p>
            </li>
            <li className="list-decimal">
              <a href="#arbitration_claus">
                <h2 id="arbitration_claus" className="font-semibold underline">
                  <FormattedMessage defaultMessage="ARBITRATION CLAUSE" id="fsG4Ox" />
                </h2>
              </a>
              <p className="mt-4">
                <FormattedMessage
                  defaultMessage="Any dispute or claim a Participating Agent has from using the Platform and / or with respect to these Terms and Conditions shall be submitted to the decision of a Court of Arbitration convened by either party. The court will come to a decision according to the Law. The arbitration shall be administered by the Arbitration and Conciliation Center of the Chamber of Commerce of Bogotá and shall be subject to the rules of said center. The seat of the Court will be the city of Bogotá D.C. (Colombia). The Court shall be composed of one (1) sole arbitrator chosen by mutual agreement between the parties. In the event the parties cannot come to an agreement, the arbitrator shall be appointed by the Arbitration and Conciliation Center of the Chamber of Commerce of Bogotá at the request of any of the parties."
                  id="ZuCRiw"
                />
              </p>
            </li>
          </ol>
        </div>
      </LayoutContainer>
    </div>
  );
};

TermsConditions.layout = {
  props: {
    footerProps: {
      className: 'mt-0 ',
    },
  },
};

export default TermsConditions;

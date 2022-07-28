import { useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Paths } from 'enums';

/** FAQ Sections */
export enum FaqSections {
  Account = 'account',
  Projects = 'projects',
  OpenCalls = 'open-calls',
  VerificationBadges = 'verification-badges',
  HeCoPriorityLandscapes = 'heco-priority-landscapes',
}

/** FAQ Questions */
export enum FaqQuestions {
  /** Account */
  HowDoAccountsWork = 'how-do-accounts-work',
  CanIAddColleagues = 'can-i-add-colleagues-from-my-organization',
  WhyAccountIsPendingApproval = 'why-is-my-account-pending-approval',
  InfoNeededForPdAccount = 'what-information-do-i-need-to-create-a-project-developer-account',
  InfoNeededForInvestorAccount = 'what-information-do-i-need-to-create-an-investor-account',
  /** Projects */
  WhatIsAProject = 'what-is-a-project',
  ForWhoIsTheProjectFor = 'for-who-is-the-project-for',
  HowCanIFundAProject = 'how-can-i-fund-a-project',
  WhatInfoToCreateProject = 'what-information-do-i-need-to-create-a-project',
  /** Verification Badges */
  WhatIsAVerificationBadge = 'what-is-a-verification-badge',
  WhenWillTheProjectHaveTheVerificationBadge = 'when-will-the-project-have-the-verification-badge',
  WhenWillTheOpenCallHaveTheVerificationBadge = 'when-will-the-open-call-have-the-verification-badge',
}

export const FaqPaths = {
  /** Account */
  [FaqQuestions.HowDoAccountsWork]: `${Paths.FAQ}/${FaqSections.Account}/${FaqQuestions.HowDoAccountsWork}`,
  [FaqQuestions.CanIAddColleagues]: `${Paths.FAQ}/${FaqSections.Account}/${FaqQuestions.CanIAddColleagues}`,
  [FaqQuestions.WhyAccountIsPendingApproval]: `${Paths.FAQ}/${FaqSections.Account}/${FaqQuestions.WhyAccountIsPendingApproval}`,
  [FaqQuestions.InfoNeededForPdAccount]: `${Paths.FAQ}/${FaqSections.Account}/${FaqQuestions.InfoNeededForPdAccount}`,
  [FaqQuestions.InfoNeededForInvestorAccount]: `${Paths.FAQ}/${FaqSections.Account}/${FaqQuestions.InfoNeededForInvestorAccount}`,
  /** Projects */
  [FaqQuestions.WhatIsAProject]: `${Paths.FAQ}/${FaqSections.Projects}/${FaqQuestions.WhatIsAProject}`,
  [FaqQuestions.ForWhoIsTheProjectFor]: `${Paths.FAQ}/${FaqSections.Projects}/${FaqQuestions.ForWhoIsTheProjectFor}`,
  [FaqQuestions.HowCanIFundAProject]: `${Paths.FAQ}/${FaqSections.Projects}/${FaqQuestions.HowCanIFundAProject}`,
  // [FaqQuestions.WhatInfoToCreateProject]: `${Paths.FAQ}/${FaqSections.Projects}/${FaqQuestions.WhatInfoToCreateProject}`,
  [FaqQuestions.WhatIsAVerificationBadge]: `${Paths.FAQ}/${FaqSections.VerificationBadges}/${FaqQuestions.WhatIsAVerificationBadge}`,
  [FaqQuestions.WhenWillTheProjectHaveTheVerificationBadge]: `${Paths.FAQ}/${FaqSections.VerificationBadges}/${FaqQuestions.WhenWillTheProjectHaveTheVerificationBadge}`,
  // [FaqQuestions.WhenWillTheOpenCallHaveTheVerificationBadge]: `${Paths.FAQ}/${FaqSections.VerificationBadges}/${FaqQuestions.WhenWillTheOpenCallHaveTheVerificationBadge}`,
};

export const useFaq = () => {
  const { formatMessage } = useIntl();

  const faq = useMemo(
    () => [
      {
        sectionId: FaqSections.Account,
        name: formatMessage({ defaultMessage: 'Account', id: 'TwyMau' }),
        items: [
          {
            questionId: FaqQuestions.HowDoAccountsWork,
            question: formatMessage({ defaultMessage: 'How do accounts work?', id: '/ITXlB' }),
            answer: formatMessage({
              defaultMessage:
                'To be part of the HeCo Invest platform your organization, institution or business must create an account. An account is your organization profile and it contains all the basic information to describe it. There are two types of accounts HeCo Invest: one for organizations developing projects - Project Developers - and one for organizations investing in projects - Investors. Each account will have at least one contact: the account owner.',
              id: '+8XJbK',
            }),
          },
          {
            questionId: FaqQuestions.CanIAddColleagues,
            question: formatMessage({
              defaultMessage: 'Can I add colleagues from my organization to the account?',
              id: 'tDM2u5',
            }),
            answer: formatMessage({
              defaultMessage:
                'The account owner can invite other colleagues to the account. These will receive an invitation by email to join the account. Each email can only be associated with one account. Once you are set as an account user, you can manage the account. However, adding or removing other account users can only be managed by account owners.',
              id: 'OJfOvp',
            }),
          },
          {
            questionId: FaqQuestions.WhyAccountIsPendingApproval,
            question: formatMessage({
              defaultMessage: 'Why is my account pending approval?',
              id: 'I2yxwP',
            }),
            answer: formatMessage({
              defaultMessage:
                'Every new account created will need to be approved by the HeCo Invest staff - platform administrator. This approval process allows for the verification of each organization, institution or business that applies to the HeCo Invest platform, guaranteeing that only trustworthy organizations will present their projects or investment opportunities. Therefore, your account will only be visible on the HeCo Invest platform after the platform administrator completes this approval step.',
              id: 'Fg5HOn',
            }),
          },
          {
            questionId: FaqQuestions.InfoNeededForPdAccount,
            question: formatMessage({
              defaultMessage: 'What information do I need to create a Project Developer account?',
              id: 'orirkU',
            }),
            answer: null,
          },
          {
            questionId: FaqQuestions.InfoNeededForInvestorAccount,
            question: formatMessage({
              defaultMessage: 'What information do I need to create an Investor account?',
              id: 'JK13Ms',
            }),
            answer: null,
          },
        ],
      },
      {
        sectionId: FaqSections.Projects,
        name: formatMessage({ defaultMessage: 'Projects', id: 'UxTJRa' }),
        items: [
          {
            questionId: FaqQuestions.WhatIsAProject,
            question: formatMessage({ defaultMessage: 'What is a project?', id: 'yP7Lrl' }),
            answer: formatMessage({
              defaultMessage:
                'A project is an enterprise or initiative carefully planned and run by project developers in a given region with the objective of contributing to its environmental conservation. Projects are set up whenever a project developer is seeking visibility or needing investment.',
              id: 'XwmxKZ',
            }),
          },
          {
            questionId: FaqQuestions.ForWhoIsTheProjectFor,
            question: formatMessage({
              defaultMessage: 'For who is the project for?',
              id: 'etdw49',
            }),
            answer: formatMessage({
              defaultMessage:
                'Projects target investors. They are set up whenever a project developer is seeking visibility or needing investment. The project is intended to contribute to the environmental conservation of a specific region and benefit nature and people.',
              id: 'Vi/HrX',
            }),
          },
          {
            questionId: FaqQuestions.HowCanIFundAProject,
            question: formatMessage({
              defaultMessage: 'How can I invest/fund a project?',
              id: 'caaGgO',
            }),
            answer: formatMessage({
              defaultMessage:
                'The HeCo Invest platform connects governments, investors, donors, and philanthropists with selected investment opportunities and projects in high-priority areas for Herencia Colombia. If you find a project that matches your investment goals you can contact its project developer. The contact details will only be available for platform registered users. So if you want to reach out to a project developer, you first need to create an account or join an existing account. The beta version of the HeCo Invest platform does not include the actual attainment of the business deals. To fund a project, investors must carry out all business procedures outside the platform.',
              id: 'FVcGqA',
            }),
          },
          {
            questionId: FaqQuestions.WhatInfoToCreateProject,
            question: formatMessage({
              defaultMessage: 'What information do I need to create a project?',
              id: 'oRepRG',
            }),
            answer: null,
          },
        ],
      },
      {
        sectionId: FaqSections.OpenCalls,
        name: formatMessage({ defaultMessage: 'Open Calls', id: 'wpyHb9' }),
        items: [
          {
            questionId: FaqQuestions.WhatIsAnOpenCall,
            question: formatMessage({ defaultMessage: 'What is an open call?', id: 'MxllAO' }),
            answer: formatMessage({
              defaultMessage:
                'An open call is a call for projects made by a given investor. Open calls give investors the possibility to open specific opportunities in their topics of interest. All registered project developers have the possibility to submit their projects to an open call, if they match the open call criteria, and therefore apply to this particular funding.',
              id: 'kaAF7K',
            }),
          },
          {
            questionId: FaqQuestions.ForWhoIsTheOpenCallFor,
            question: formatMessage({
              defaultMessage: 'For who is the open call for?',
              id: '5g0Cah',
            }),
            answer: formatMessage({
              defaultMessage:
                'Open calls target project developers. They are a way for investors to call for projects within their specific scope. Project developers may submit their projects to a specific open call, if they match the open call criteria.',
              id: 'TM4C3M',
            }),
          },
          {
            questionId: FaqQuestions.HowCanIApplyToAnOpenCall,
            question: formatMessage({
              defaultMessage: 'How can I apply for an open call?',
              id: 'SZBXIx',
            }),
            answer: formatMessage({
              defaultMessage:
                'The HeCo Invest platform connects governments, investors, donors, and philanthropists with selected investment opportunities and projects in high-priority areas for Herencia Colombia. If you find an open call that matches your goals and needs, you can create a project tailored specifically to that open call criteria. Project creation is only available for registered project developer account users. Once your project is created, you can apply to the open call, using the “Apply now” button on the open call page. You can also contact the investor, if needed. The contact details will only be available for platform registered users. So if you want to reach out to an investor, you first need to create an account or join an existing account.',
              id: 'JSrP/U',
            }),
          },
          {
            questionId: FaqQuestions.WhatInfoToCreateOpenCall,
            question: formatMessage({
              defaultMessage: 'What information do I need to create an open call?',
              id: '1E9nN4',
            }),
            answer: null,
          },
        ],
      },
      {
        sectionId: FaqSections.VerificationBadges,
        name: formatMessage({ defaultMessage: 'Verification badges', id: 'AGwIKZ' }),
        items: [
          {
            questionId: FaqQuestions.WhatIsAVerificationBadge,
            question: formatMessage({
              defaultMessage: 'What is a verification badge?',
              id: 'qZPjW2',
            }),
            answer: null,
          },
          {
            questionId: FaqQuestions.WhenWillTheProjectHaveTheVerificationBadge,
            question: formatMessage({
              defaultMessage: 'When will the open call have the Verification badge?',
              id: '5DdRx+',
            }),
            answer: null,
          },
          {
            questionId: FaqQuestions.WhenWillTheOpenCallHaveTheVerificationBadge,
            question: formatMessage({
              defaultMessage: 'When will the project have the Verification badge?',
              id: 'E/YxHp',
            }),
            answer: null,
          },
        ],
      },
      {
        sectionId: FaqSections.HeCoPriorityLandscapes,
        name: formatMessage({ defaultMessage: 'HeCo Priority landscapes', id: 'BTFkyB' }),
        items: [
          {
            questionId: FaqQuestions.WhatAreHeCoPriorityLandscapes,
            question: formatMessage({
              defaultMessage: 'What are HeCo priority landscapes?',
              id: '8gJV79',
            }),
            answer: null,
          },
          {
            questionId: FaqQuestions.WhyAreThoseRegionsImportant,
            question: formatMessage({
              defaultMessage: 'Why are these regions important?',
              id: 'aRoGjo',
            }),
            answer: null,
          },
          {
            questionId: FaqQuestions.WhichAreTheHeCoProgramPriorityLandscapes,
            question: formatMessage({
              defaultMessage: 'Which are the HeCo Program priority landscapes?',
              id: 'qCZWRp',
            }),
            answer: null,
          },
        ],
      },
    ],
    [formatMessage]
  );

  return faq;
};

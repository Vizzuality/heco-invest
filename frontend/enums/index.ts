export enum Languages {
  ENGLISH = 'en',
  SPANISH = 'es',
  PORTUGUESE = 'pt',
}

export enum Paths {
  signup = '/sign-up',
  signin = '/sign-in',
  accountType = '/sign-up/account-type',
  forgotPassword = '/sign-in/forgot-password',
  dashboard = '/dashboard',
  FAQ = '/faq',
  SING_OUT = '/sign-out',
  SETTINGS = '/settings',
}

export enum QUERIES {
  /** Session user */
  USER = 'user',

  /** List of project developers */
  PROJECT_DEVELOPERS = 'project_developers',

  /** Single project developer */
  PROJECT_DEVELOPER = 'project_developer',

  /** List of investors */
  INVESTORS = 'investors',

  /** Single investor  */
  INVESTOR = 'investor',

  /** User account name and slug */
  ACCOUNT = 'account',
  SIGNUP = '/sign-up',
  ACCOUNT_TYPE = '/sign-up/account-type',
  FORGOT_PASSWORD = 'sign-in/forgot-password',
  DASHBOARD = '/dashboard',
  FAQ = '/faq',
}

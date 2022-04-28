export enum Languages {
  English = 'en',
  Spanish = 'es',
  Portuguese = 'pt',
}

export enum Paths {
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  AccountType = '/sign-up/account-type',
  ForgotPassword = '/sign-in/forgot-password',
  Dashboard = '/dashboard',
  FAQ = '/faq',
  SignOut = '/sign-out',
  Settings = '/settings',
  Project = '/project',
}

export enum UserRoles {
  Light = 'light',
  Investor = 'investor',
  ProjectDeveloper = 'project_developer',
}

/** React Query Queries */
export enum Queries {
  /** Session user */
  User = 'user',
  /** List of project developers */
  ProjectDeveloperList = 'project_developers',
  /** Single project developer */
  ProjectDeveloper = 'project_developer',
  /** The current user Project Developer */
  CurrentProjectDeveloper = 'current_project_developer',
  /** Single project */
  Project = 'project',
  /** List of investors */
  InvestorList = 'investors',
  /** Single investor  */
  Investor = 'investor',
  /** User account name and slug */
  Account = 'account',
  /** Mosaics (Region Locations) */
  Mosaics = 'mosaics',
  /** DB Enums */
  EnumList = 'enum_list',
  /** Locations */
  Locations = 'locations',
}

/** Location endpoint param location_type */
export enum LocationsTypes {
  Country = 'country',
  Department = 'department',
  Municipality = 'municipality',
  Region = 'region',
}

/** Enum types returned on 'enums' service endpoint */
export enum EnumTypes {
  Category = 'category',
  InstrumentType = 'instrument_type',
  TicketSize = 'ticket_size',
  Impact = 'impact',
  ProjectDeveloperType = 'project_developer_type',
  InvestorType = 'investor_type',
  LocationType = 'location_type',
  ProjectDevelopmentStage = 'project_development_stage',
  TargetGroup = 'project_target_group',
  Mosaic = 'mosaic',
}

/** Project development stages */
export enum DevelopmentStages {
  Incipient = 'incipient',
  Consolidaton = 'consolidaton',
  ScalingUp = 'scaling-up',
}

/** Project ticket sizes */
export enum TicketSizes {
  SmallGrants = 'small-grants',
  Prototyping = 'prototyping',
  Validation = 'validation',
  Scaling = 'scaling',
  SDGType = 'sdg',
  Mosaic = 'mosaic',
}

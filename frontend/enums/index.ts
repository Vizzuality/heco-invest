export enum Languages {
  English = 'en',
  Spanish = 'es',
  Portuguese = 'pt',
}

export enum Paths {
  Home = '/',
  SignUp = '/sign-up',
  SignIn = '/sign-in',
  SignOut = '/sign-out',
  AccountType = '/sign-up/account-type',
  ForgotPassword = '/sign-in/forgot-password',
  About = '/about',
  FAQ = '/faq',
  Discover = '/discover',
  Dashboard = '/dashboard',
  DashboardProjects = '/dashboard/projects',
  DashboardFavorites = '/dashboard/favorites',
  DashboardOpenCalls = '/dashboard/open-calls',
  DashboardOpenCallApplications = '/dashboard/open-call-applications',
  DashboardUsers = '/dashboard/users',
  DashboardAccountInfo = '/dashboard/account-information',
  Settings = '/settings',
  Project = '/project',
  Projects = '/discover/projects',
  ProjectCreation = '/projects/new',
  ProjectDeveloper = '/project-developer',
  NewProjectDeveloper = '/project-developers/new',
  EditProjectDeveloper = '/project-developers/edit',
  ProjectDevelopers = '/discover/project-developers',
  OpenCall = '/open-call',
  OpenCalls = '/discover/open-calls',
  OpenCallCreation = '/open-calls/new',
  Investor = '/investor',
  NewInvestor = '/investors/new',
  EditInvestor = '/investors/edit',
  Investors = '/discover/investors',
  Invitation = '/invitation',
  ForInvestors = '/for-investors',
  ForProjectDevelopers = '/for-project-developers',
  UserInformation = '/settings/information',
  UserPassword = '/settings/password',
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
  /** The current user Investor */
  CurrentInvestor = 'current_investor',
  /** List of projects */
  ProjectList = 'projects',
  /** Single project */
  Project = 'project',
  /** List of investors */
  InvestorList = 'investors',
  /** Single investor  */
  Investor = 'investor',
  /** User account name and slug */
  Account = 'account',
  /** DB Enums */
  EnumList = 'enum_list',
  /** Locations */
  Locations = 'locations',
  /** Single Project */
  ProjectQuery = 'project',
  /** Projects Map location */
  ProjectsMap = 'projects_map',
  /** Current user's account owner name */
  AccountOwnerName = 'account_owner_name',
  /** List of projects */
  AccountProjectList = 'account_projects',
  /** List of users */
  AccountUsersList = 'account_users',
  /** Invited User */
  InvitedUser = 'invited_user',
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
  ImpactAreas = 'impact_area',
  ProjectDeveloperType = 'project_developer_type',
  InvestorType = 'investor_type',
  LocationType = 'location_type',
  ProjectDevelopmentStage = 'project_development_stage',
  TargetGroup = 'project_target_group',
  Mosaic = 'mosaic',
  Images = 'image',
  Sdg = 'sdg',
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

export enum Impacts {
  Biodiversity = 'biodiversity',
  Climate = 'climate',
  Water = 'water',
  Community = 'community',
}

export enum ReviewStatus {
  Approved = 'approved',
  Unapproved = 'unapproved',
  Rejected = 'rejected',
}

export enum ImpactAreas {
  Municipality = 'municipality',
  Hydrobasin = 'hydrobasin',
  PriorityLandscape = 'priority_landscape',
}

export enum InvitationStatus {
  Waiting = 'waiting',
  Completed = 'completed',
  Expired = 'expired',
}

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
  DashboardFavoritesProjects = '/dashboard/favorites/projects',
  DashboardFavoritesOpenCalls = '/dashboard/favorites/open-calls',
  DashboardFavoritesInvestors = '/dashboard/favorites/investors',
  DashboardFavoritesProjectDevelopers = '/dashboard/favorites/project-developers',
  DashboardOpenCalls = '/dashboard/open-calls',
  DashboardOpenCallDetails = '/dashboard/open-call',
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
  TermsConditions = '/terms-conditions',
  UserInformation = '/settings/information',
  UserSecurity = '/settings/security',
  /** HIDDEN PAGES */
  HiddenPage = '/hidden-page',
  AccountDeleted = '/account-deleted',
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
  /** List of favorited project evelopers */
  FavoriteProjectDevelopersList = 'favorite_project_developers',
  /** Single project developer */
  ProjectDeveloper = 'project_developer',
  /** The current user Project Developer */
  CurrentProjectDeveloper = 'current_project_developer',
  /** The current user Investor */
  CurrentInvestor = 'current_investor',
  /** List of projects */
  ProjectList = 'projects',
  /** List of favorited projects */
  FavoriteProjectsList = 'favorite_projects',
  /** Single project */
  Project = 'project',
  /** List of open calls */
  OpenCallList = 'open_calls',
  /** List of favorited projects */
  FavoriteOpenCallsList = 'favorite_open_calls',
  /** Single open call */
  OpenCall = 'open_call',
  /** List of investors */
  InvestorList = 'investors',
  /** List of favorited investors */
  FavoriteInvestorsList = 'favorite_investors',
  /** Single investor  */
  Investor = 'investor',
  /** User account name and slug */
  Account = 'account',
  /** DB Enums */
  EnumList = 'enum_list',
  /** Locations */
  Locations = 'locations',
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
  /** List of open calls */
  AccountOpenCallsList = 'account_open_calls',
  /** Single account open call application */
  AccountOpenCallApplication = 'account_open_call_application',
  /** List of account open call applications */
  AccountOpenCallApplicationsList = 'account_open_call_applications',
  /** Priority Landscapes */
  PriorityLandscapes = 'priority_landscapes',
}

/** Location endpoint param location_type */
export enum LocationsTypes {
  Country = 'country',
  Department = 'department',
  Municipality = 'municipality',
  Region = 'region',
  PriorityLandscapes = 'priority_landscape',
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

export enum ProjectStatus {
  Published = 'published',
  Draft = 'draft',
}

export enum OpenCallStatus {
  Draft = 'draft',
  Launched = 'launched',
  Closed = 'closed',
}

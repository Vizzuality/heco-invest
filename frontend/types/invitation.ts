export type InvitedUserInfo = {
  email: string;
  account_name: string;
  requires_registration: boolean;
};

export type UsersInvitationForm = {
  email: string;
  emails: string[];
};

export type InviteUsersDto = {
  data: string[];
};

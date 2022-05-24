import { User } from 'types/user';

/**
 * Return the initials of the user
 */
export const getUserInitials = (user: User) => {
  if (user) {
    const { first_name, last_name } = user;
    return `${first_name?.substring(0, 1)}${last_name?.substring(0, 1)}`.toUpperCase();
  }
  return '';
};

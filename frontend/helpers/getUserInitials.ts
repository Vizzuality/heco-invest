import { User } from 'types/user';

export default (user: User) => {
  if (user?.attributes) {
    const { first_name, last_name } = user.attributes;
    return `${first_name.substring(0, 1).toUpperCase()}${last_name.substring(0, 1).toUpperCase()}`;
  }
  return '';
};

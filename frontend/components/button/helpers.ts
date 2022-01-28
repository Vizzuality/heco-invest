import { ButtonProps, HTMLAnchorProps } from './types';

/**
 * Return whether the props are the ones of an anchor button
 * @param props Props of the button
 * @returns `true` if the props are the ones of an anchor button
 */
export const isAnchorButton = (props: ButtonProps): props is HTMLAnchorProps => 'to' in props;

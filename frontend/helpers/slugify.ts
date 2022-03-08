import { default as slugifyExt } from 'slugify';

/**
 * Return a slug based on a string
 * @param string String to slugify
 */
export const slugify = (string: string) => slugifyExt(string, { lower: true });

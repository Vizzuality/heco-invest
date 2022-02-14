/**
 * This component comes from Next.js' repository:
 * https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.js
 */
import React, { useState, useEffect, Children } from 'react';

import cx from 'classnames';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ActiveLinkProps } from './types';

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  activeClassName,
  children,
  ...props
}: ActiveLinkProps) => {
  const { asPath, isReady } = useRouter();

  const child = Children.only(children);
  const childClassName = child.props.className ?? '';
  const [className, setClassName] = useState(childClassName);
  const [additionalProps, setAdditionalProps] = useState({});

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL((props.as ?? props.href).toString(), window.location.href)
        .pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, window.location.href).pathname;
      const isActive = linkPathname === activePathname;

      setClassName(
        cx({
          [childClassName]: true,
          [activeClassName]: isActive,
        })
      );

      setAdditionalProps({ 'aria-current': isActive ? 'page' : undefined });
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    childClassName,
    activeClassName,
    setClassName,
    className,
  ]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className ?? undefined,
        ...additionalProps,
      })}
    </Link>
  );
};

export default ActiveLink;

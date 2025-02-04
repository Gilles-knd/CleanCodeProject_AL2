import React, { HTMLAttributes, HTMLProps, ReactElement } from "react";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";

interface StyledLinkProps extends HTMLAttributes<HTMLAnchorElement>, LinkProps {
  highlighted?: boolean;
}

export const StyledLink: React.FC<StyledLinkProps> = (props) => {
  const { children, highlighted = false, className, as, href, replace, scroll, shallow, passHref, ...rest } = props;
  const cn = classNames("hover:underline hover:text-primary-700 text-gray-900", className, {
    "underline text-primary-700": highlighted,
  });

  return (
    <Link
      className={cn}
      as={as}
      href={href}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      {...rest}>
      {children}
    </Link>
  );
};

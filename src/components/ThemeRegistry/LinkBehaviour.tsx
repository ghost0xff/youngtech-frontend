import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

const LinkBehaviour = forwardRef<HTMLAnchorElement, NextLinkProps>(
  function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
  }
);

export default LinkBehaviour;

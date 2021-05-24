import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement, useMemo } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  shouldMatchExactHref = false,
  ...props
}) => {
  const { asPath } = useRouter();

  const isActive = useMemo(() => {
    if (
      shouldMatchExactHref &&
      (asPath === props.href || asPath === props.as)
    ) {
      return true;
    }

    if (
      !shouldMatchExactHref &&
      (asPath.startsWith(String(props.href)) ||
        asPath.startsWith(String(props.as)))
    ) {
      return true;
    }

    return false;
  }, [asPath]);

  return (
    <Link {...props}>
      {cloneElement(children, { color: isActive ? "pink.400" : "gray.50" })}
    </Link>
  );
};

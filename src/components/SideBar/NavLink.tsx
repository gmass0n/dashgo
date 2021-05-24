import { ElementType } from "react";
import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";
import { useAuth } from "../../hooks/auth";
import { validateUserPermissions } from "../../utils/validateUserPermissions";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  href: string;
  permissions?: string[];
}

export const NavLink: React.FC<NavLinkProps> = ({
  icon,
  children,
  href,
  permissions,
  ...props
}) => {
  const { user } = useAuth();

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
  });

  if (!userHasValidPermissions) return null;

  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" py="1" {...props}>
        <Icon as={icon} fontSize="20" />

        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
};

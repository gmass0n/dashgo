import { ElementType } from "react";
import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  href: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  icon,
  children,
  href,
  ...props
}) => {
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

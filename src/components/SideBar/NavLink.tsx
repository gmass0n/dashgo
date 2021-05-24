import { ElementType } from "react";
import {
  Icon,
  Link,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
}

export const NavLink: React.FC<NavLinkProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <Link display="flex" align="center" py="1" {...props}>
      <Icon as={icon} fontSize="20" />

      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
};

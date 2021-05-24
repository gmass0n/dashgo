import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { RiLogoutBoxLine, RiNotificationLine } from "react-icons/ri";

import { signOut } from "../../hooks/auth";

export const NotificationsNav: React.FC = () => {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={RiNotificationLine} fontSize="20" />

      <Tooltip label="Sair" aria-label="Sign out" hasArrow>
        <IconButton
          aria-label="Sign out"
          variant="unstyled"
          icon={<Icon as={RiLogoutBoxLine} fontSize="20" />}
          _hover={{ opacity: 0.7 }}
          onClick={signOut}
        />
      </Tooltip>
    </HStack>
  );
};

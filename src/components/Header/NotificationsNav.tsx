import { HStack } from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";

import { signOut } from "../../hooks/auth";

import { NotificationsNavButton } from "./NotificationsNavButton";

export const NotificationsNav: React.FC = () => {
  return (
    <HStack
      spacing="3"
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      {/* <NotificationsNavButton
        label="Notificações"
        aria-label="Show notifications"
        icon={RiNotificationLine}
      /> */}

      <NotificationsNavButton
        label="Sair"
        aria-label="Sign out"
        icon={RiLogoutBoxLine}
        onClick={signOut}
      />
    </HStack>
  );
};

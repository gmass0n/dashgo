import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

import { useSidebarDrawer } from "../../hooks/sidebarDrawer";

import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { NotificationsNav } from "./NotificationsNav";
import { Logo } from "./Logo";

export const Header: React.FC = () => {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          fontSize="24"
          icon={<Icon as={RiMenuLine}></Icon>}
        ></IconButton>
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};

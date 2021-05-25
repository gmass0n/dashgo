import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import Link from "next/link";

import { useSidebarDrawer } from "../../hooks/sidebarDrawer";
import { useAuth } from "../../hooks/auth";

import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { NotificationsNav } from "./NotificationsNav";
import { Logo } from "../Logo";

export const Header: React.FC = () => {
  const { onOpen } = useSidebarDrawer();
  const { user } = useAuth();

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
          icon={<Icon as={RiMenuLine} />}
        />
      )}

      <Link href="/dashboard">
        <a>
          <Logo w="64" transition="all 0.4s" _hover={{ opacity: 0.7 }} />
        </a>
      </Link>

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile
          user={{ avatar: user.avatar, name: user.name, email: user.email }}
          showProfileData={isWideVersion}
        />
      </Flex>
    </Flex>
  );
};

import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGroupLine } from "react-icons/ri";

import { permissions } from "../../constants/permissions";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export const SidebarNav: React.FC = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>

        <NavLink
          href="/roles"
          icon={RiGroupLine}
          permissions={[permissions.roles.list]}
        >
          Grupos de permissões
        </NavLink>

        <NavLink
          href="/users"
          icon={RiContactsLine}
          permissions={[permissions.roles.create]}
        >
          Usuários
        </NavLink>
      </NavSection>
    </Stack>
  );
};

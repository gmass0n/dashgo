import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGroupLine } from "react-icons/ri";

import { LIST_ROLES, LIST_USERS } from "../../constants/permissions";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export const SidebarNav: React.FC = () => {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>

        <NavLink href="/roles" icon={RiGroupLine} permissions={[LIST_ROLES]}>
          Grupos de permissões
        </NavLink>

        <NavLink href="/users" icon={RiContactsLine} permissions={[LIST_USERS]}>
          Usuários
        </NavLink>
      </NavSection>
    </Stack>
  );
};

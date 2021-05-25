import { Box, Flex, FormLabel, Stack } from "@chakra-ui/react";
import { Fragment } from "react";

import { usePermissions } from "../../hooks/permissions";
import { formatPermissionName } from "../../utils/formatPermissionName";
import { PermissionSelectorItem } from "./PermissionSelectorItem";

interface PermissionsSelectorProps {
  selecteds: string[];
  onToggle(permissions: string[]): void;
}

export const PermissionsSelector: React.FC<PermissionsSelectorProps> = ({
  onToggle,
  selecteds,
}) => {
  const { data, isLoading } = usePermissions();

  return (
    <Box w="100%">
      <FormLabel>Permissões</FormLabel>

      <Flex
        direction="column"
        w="100%"
        bgColor="gray.900"
        borderRadius="4"
        p="4"
      >
        <Stack spacing="2">
          {!isLoading &&
            data.map((permission) => (
              <Stack spacing="2" key={permission.name}>
                <PermissionSelectorItem
                  isSelected={permission.values.every((value) =>
                    selecteds.includes(`${permission.name}.${value}`)
                  )}
                  onToggle={() =>
                    onToggle(
                      permission.values.map(
                        (value) => `${permission.name}.${value}`
                      )
                    )
                  }
                >
                  {formatPermissionName(permission.name)}
                </PermissionSelectorItem>

                {permission.values.map((value) => (
                  <PermissionSelectorItem
                    key={`${permission.name}.${value}`}
                    isSelected={selecteds.includes(
                      `${permission.name}.${value}`
                    )}
                    onToggle={() => onToggle([`${permission.name}.${value}`])}
                    hasDad
                  >
                    {formatPermissionName(`${permission.name}.${value}`)}
                  </PermissionSelectorItem>
                ))}
              </Stack>
            ))}
        </Stack>
      </Flex>
    </Box>
  );
};

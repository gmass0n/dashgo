import { Button, Icon, Stack, Text, Flex } from "@chakra-ui/react";
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { RiCheckFill } from "react-icons/ri";

interface PermissionsSelectorProps {
  isSelected: boolean;
  onToggle(): void;
  hasDad?: boolean;
}

export const PermissionSelectorItem: React.FC<PermissionsSelectorProps> = ({
  isSelected = false,
  onToggle,
  hasDad = false,
  children,
}) => {
  return (
    <Button
      variant="unstyled"
      h={45}
      w="100%"
      onClick={onToggle}
      _hover={{ bg: "gray.800" }}
      style={{
        boxShadow: "none",
      }}
      {...(isSelected && { bg: "gray.800" })}
    >
      <Flex w="100%" h="100%" borderRadius="4" align="center" px="4">
        <Stack spacing="4" direction="row" w="100%" justify="space-between">
          <Stack spacing="4" direction="row">
            {hasDad && (
              <Icon
                as={MdSubdirectoryArrowRight}
                color="pink.500"
                fontSize="20"
              />
            )}

            {hasDad ? (
              <Text fontWeight="normal">{children}</Text>
            ) : (
              <Text
                fontWeight="bold"
                color="gray.200"
                textTransform="uppercase"
                letterSpacing={1}
              >
                {children}
              </Text>
            )}
          </Stack>

          {isSelected && (
            <Icon as={RiCheckFill} color="pink.500" fontSize="20" />
          )}
        </Stack>
      </Flex>
    </Button>
  );
};

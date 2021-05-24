import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export const Profile: React.FC = () => {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Gabriel MAsson</Text>

        <Text color="gray.300" fontSize="small">
          g.masson010@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Gabriel Masson"
        src="https://github.com/gmass0n.png"
      />
    </Flex>
  );
};

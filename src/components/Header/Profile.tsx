import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export const Profile: React.FC<ProfileProps> = ({ showProfileData = true }) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gabriel Masson</Text>

          <Text color="gray.300" fontSize="small">
            g.masson010@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Gabriel Masson"
        src="https://github.com/gmass0n.png"
      />
    </Flex>
  );
};

import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
  user: {
    email: string;
    name: string;
    avatar: string;
  };
}

export const Profile: React.FC<ProfileProps> = ({
  showProfileData = true,
  user,
}) => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user.name}</Text>

          <Text color="gray.300" fontSize="small">
            {user.email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={user.name} src={user.avatar} />
    </Flex>
  );
};

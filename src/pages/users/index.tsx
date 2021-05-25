import { useCallback, useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";

import { useUsers, getUserByEmail } from "../../hooks/users";

import { queryClient } from "../../services/queryClient";

import { withSSRAuth } from "../../utils/withSSRAuth";
import { validateUserPermissions } from "../../utils/validateUserPermissions";

import { useAuth } from "../../hooks/auth";

import { permissions } from "../../constants/permissions";

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    permissions: [permissions.users.list],
  }
);

const UsersList: NextPage = () => {
  const { user } = useAuth();

  const userHasPermissionToCreateUser = validateUserPermissions({
    user,
    permissions: [permissions.users.create],
  });

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage);

  const handlePrefetchUser = useCallback(async (email: string) => {
    await queryClient.prefetchQuery(
      ["user", email],
      () => getUserByEmail(email),
      {
        staleTime: 1000 * 60 * 2,
      }
    );
  }, []);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            {userHasPermissionToCreateUser && (
              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo usuário
                </Button>
              </Link>
            )}
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    <Th>Grupo de permissão</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.email}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <ChakraLink
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.email)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>

                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.role}</Text>

                          <Text fontSize="sm" color="gray.300">
                            {user.permissions.length} permissões
                          </Text>
                        </Box>
                      </Td>

                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default UsersList;

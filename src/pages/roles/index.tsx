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

import { useRoles, getRoleByName } from "../../hooks/roles";

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
    permissions: [permissions.roles.list],
  }
);

const RolesList: NextPage = () => {
  const { user } = useAuth();

  const userHasPermissionToCreateRole = validateUserPermissions({
    user,
    permissions: [permissions.roles.create],
  });

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useRoles(currentPage);

  const handlePrefetchUser = useCallback(async (name: string) => {
    await queryClient.prefetchQuery(
      ["roles", name],
      () => getRoleByName(name),
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
              Grupos de permiss??es
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            {userHasPermissionToCreateRole && (
              <Link href="/roles/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo grupo de permiss??o
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
              <Text>Falha ao obter dados dos usu??rios.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Grupo de permiss??o</Th>
                    <Th>Quantidade permiss??es</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.roles.map((role) => (
                    <Tr key={role.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <ChakraLink
                          color="purple.400"
                          onMouseEnter={() => handlePrefetchUser(role.name)}
                        >
                          <Text fontWeight="bold">{role.name}</Text>
                        </ChakraLink>
                      </Td>

                      <Td>{role.permissions.length}</Td>

                      {isWideVersion && <Td>{role.createdAt}</Td>}
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

export default RolesList;

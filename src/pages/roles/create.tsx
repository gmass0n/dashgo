import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

import { queryClient } from "../../services/queryClient";

import { createRole } from "../../hooks/roles";

import { withSSRAuth } from "../../utils/withSSRAuth";
import { CREATE_ROLE } from "../../constants/permissions";
import { Select } from "../../components/Form/Select";

interface CreateRoleFormData {
  name: string;
  permissions: string[];
}

const createRoleFormData = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  roles: yup
    .array()
    .required("Permissões obrigatória")
    .min(1, "No mínimo 1 permissão"),
});

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    permissions: [CREATE_ROLE],
  }
);

const CreateUser: NextPage = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation(createRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
    },
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createRoleFormData),
  });

  const handleCreateRole: SubmitHandler<CreateRoleFormData> = useCallback(
    async (values) => {
      await mutateAsync(values);

      router.push("/roles");
    },
    []
  );

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateRole)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar grupo de permissão
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "6", "8"]}>
            <Input
              name="name"
              label="Nome"
              error={formState.errors.name}
              {...register("name")}
            />

            <Select
              name="permission"
              label="Permissão"
              error={formState.errors.permissions}
              options={[{ label: "oi", value: "oi" }]}
              {...register("permission")}
            />
          </VStack>

          <Flex mt={["6", "6", "8"]} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateUser;

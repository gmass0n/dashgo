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

import { createUser } from "../../hooks/users";

import { withSSRAuth } from "../../utils/withSSRAuth";
import { permissions } from "../../constants/permissions";
import { Select } from "../../components/Form/Select";
import { useRoles } from "../../hooks/roles";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  role: yup.string().required("Grupo de permissão obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export const getServerSideProps = withSSRAuth(
  async () => {
    return {
      props: {},
    };
  },
  {
    permissions: [permissions.users.create],
  }
);

const CreateUser: NextPage = () => {
  const router = useRouter();
  const { mutateAsync } = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const { data, isLoading } = useRoles(1);

  const roleOptions =
    !isLoading && data.roles
      ? data.roles.map((role) => ({
          label: role.name,
          value: role.name,
        }))
      : [];

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = useCallback(
    async (values) => {
      await mutateAsync(values);

      router.push("/users");
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
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "6", "8"]}>
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "6", "8"]}
              w="100%"
            >
              <Input
                name="name"
                label="Nome completo"
                error={formState.errors.name}
                {...register("name")}
              />

              <Input
                name="email"
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <Select
              name="role"
              isDisabled={isLoading}
              label="Grupo de permissões"
              error={formState.errors.role}
              options={roleOptions}
              {...register("role")}
            />

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "6", "8"]}
              w="100%"
            >
              <Input
                name="password"
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register("password")}
              />

              <Input
                name="passwordConfirmation"
                type="password"
                label="Confirmação de senha"
                error={formState.errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              />
            </SimpleGrid>
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

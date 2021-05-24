import { useCallback } from "react";
import { NextPage } from "next";
import { Button, Flex, Stack, Box, Image } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import { Logo } from "../components/Logo";

import { useAuth } from "../hooks/auth";

import { withSSRGuest } from "../utils/withSSRGuest";

interface SigninFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

const SignIn: NextPage = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SigninFormData> = useCallback(
    async (values) => {
      await signIn(values);
    },
    []
  );

  return (
    <Box w="100vw" h="100vh" position="relative" overflowX="hidden">
      <Box position="absolute" top={0} w="100vw" h="60%" opacity={0.1}>
        <Image
          objectFit="cover"
          h="100%"
          w="100%"
          src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80"
          alt="Chart"
        />
      </Box>

      <Box
        position="absolute"
        top="53%"
        w="200vw"
        left="50%"
        right="50%"
        transform="translate(-50%)"
        h="150px"
        bg="gray.900"
        style={{ filter: "blur(15px)" }}
      />

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        direction="column"
        justify="center"
        position="absolute"
        zIndex={10}
      >
        <Logo fontSize="5xl" />

        <Flex
          as="form"
          w="100%"
          mt="8"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              error={formState.errors.email}
              {...register("email")}
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              error={formState.errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SignIn;

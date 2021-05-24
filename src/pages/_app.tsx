import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";

import { SidebarDrawerProvider } from "../hooks/sidebarDrawer";
import { AuthProvider } from "../hooks/auth";

import { makeServer } from "../services/mirage";
import { queryClient } from "../services/queryClient";

import { theme } from "../styles/theme";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { SidebarDrawerProvider } from "../hooks/sidebarDrawer";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}

export default MyApp;

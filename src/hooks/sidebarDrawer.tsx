import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect } from "react";

type ISidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as ISidebarDrawerContextData);

const SidebarDrawerProvider: React.FC = ({ children }) => {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};

const useSidebarDrawer = (): ISidebarDrawerContextData => {
  return useContext(SidebarDrawerContext);
};

export { SidebarDrawerProvider, useSidebarDrawer };

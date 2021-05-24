import { Text, TextProps as ChakraTextProps } from "@chakra-ui/react";

type LogoProps = ChakraTextProps;

export const Logo: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      {...props}
    >
      dashgo
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
};

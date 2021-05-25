import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: SelectOption[];
}

export const BaseSelect: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = ({ name, label, error = null, options = [], ...props }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraSelect
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        size="lg"
        _hover={{
          bgColor: "gray.900",
        }}
        ref={ref}
        {...props}
      >
        {options.length > 0 &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </ChakraSelect>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(BaseSelect);

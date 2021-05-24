import { Icon, Tooltip, IconButton, As } from "@chakra-ui/react";

interface NotificationsNavButtonProps {
  label: string;
  icon: As;
  "aria-label": string;
  onClick?(): void;
}

export const NotificationsNavButton: React.FC<NotificationsNavButtonProps> = ({
  "aria-label": ariaLabel,
  icon,
  label,
  onClick = () => {},
}) => {
  return (
    <Tooltip label={label} aria-label={ariaLabel} hasArrow>
      <IconButton
        aria-label={ariaLabel}
        variant="unstyled"
        icon={<Icon as={icon} fontSize="20" />}
        _hover={{ opacity: 0.7 }}
        onClick={onClick}
      />
    </Tooltip>
  );
};

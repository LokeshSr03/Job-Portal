import { Alert, AlertIcon, AlertTitle, Stack } from "@chakra-ui/react";

const Message = ({ children, type = "info" }) => {
  return (
    <Alert status={type}>
      <AlertIcon />
      <Stack gap="1">
        <AlertTitle>{children}</AlertTitle>
      </Stack>
    </Alert>
  );
};

export default Message;

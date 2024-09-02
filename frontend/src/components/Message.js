import { Alert, Stack } from "@chakra-ui/react";

const Message = ({ childern, type = "info" }) => {
  <Alert.Root status={type}>
    <Alert.Icon />
    <Stack gap="1">
      <Alert.Title>{childern}</Alert.Title>
    </Stack>
  </Alert.Root>;
};

export default Message;

import { Flex } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

const Loader = () => {
  <Flex alignItems="center" justifyContent="center">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Flex>;
};

export default Loader;

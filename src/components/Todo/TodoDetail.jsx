import {
  Button,
  Center,
  Container,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";

export const TodoDetail = () => {
  const [wallet, setTodo] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { walletAddress, walletChain } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current) return;
    fetchTodo();
    isMounted.current = true;
  }, [walletAddress]);

  const fetchTodo = () => {
    setLoading(true);
    axiosInstance
      .get(`/funds/wallets/${walletChain}/${walletAddress}`)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const delateTodo = () => {
    setLoading(true);
    axiosInstance
      .delete(`/funds/wallets/${walletChain}/${walletAddress}`)
      .then(() => {
        toast({
          title: "Fund deleted successfully",
          status: "success",
          isClosable: true,
          diration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Couldn't delete the fund",
          status: "error",
          isClosable: true,
          diration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container mt={6}>
        <Button
          colorScheme="gray"
          onClick={() => navigate("/", { replace: true })}
        >
          Back
        </Button>
      </Container>
      <Container
        bg={background}
        minHeight="7rem"
        my={3}
        p={3}
        rounded="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={22}>{wallet.h_address}</Text>
        <Text bg="gray.500" mt={2} p={2} rounded="lg">
          {wallet.h_network_name}
        </Text>

        <AddUpdateTodoModal
          my={3}
          defaultValues={{
            address: wallet.h_address,
            chain: wallet.h_network_name
          }}
          onSuccess={fetchTodo}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={delateTodo}
        >
          Delete Wallet
        </Button>
      </Container>
    </>
  );
};

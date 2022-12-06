import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdateTodoModal } from "./AddUpdateTodoModal";
import { TodoCard } from "./TodoCard";

export const TodoList = () => {
  const [wallets, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchTodos();
    isMounted.current = true;
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    axiosInstance
      .get("/funds/wallets/all")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}>
      <AddUpdateTodoModal onSuccess={fetchTodos} />
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {wallets?.map((wallet) => (
            <TodoCard wallet={wallet} key={wallet.h_address} />
          ))}
        </Box>
      )}
    </Container>
  );
};

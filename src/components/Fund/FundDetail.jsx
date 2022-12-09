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
import { AddFundModal } from "./AddFundModal";

export const FundDetail = () => {
  const [fund, setFund] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { walletAddress, walletChain } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current) return;
    fetchFund();
    isMounted.current = true;
  }, [walletAddress]);

  const fetchFund = () => {
    setLoading(true);
    axiosInstance
      .get(`/funds/wallets/${walletChain}/${walletAddress}`)
      .then((res) => {
        setFund(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFund = () => {
    setLoading(true);
    axiosInstance
      .delete(`/funds/wallets/${walletChain}/${walletAddress}`)
      .then(() => {
        toast({
          title: "Fund deleted successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Couldn't delete the fund",
          status: "error",
          isClosable: true,
          duration: 2000,
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
      <Container mt={6} maxW="565">
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
        <Text fontSize={18}> {fund.h_address} | {fund.h_network_name} </Text>

        <AddFundModal
          my={3}
          onSuccess={fetchFund}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={deleteFund}
        >
          Delete Fund
        </Button>
      </Container>
    </>
  );
};

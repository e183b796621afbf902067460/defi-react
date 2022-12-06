import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddWalletModal } from "./AddWalletModal";
import { WalletCard } from "./WalletCard";

export const WalletList = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchWallets();
    isMounted.current = true;
  }, []);

  const fetchWallets = () => {
    setLoading(true);
    axiosInstance
      .get("/funds/wallets/all")
      .then((res) => {
        setWallets(res.data);
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
      <AddWalletModal onSuccess={fetchWallets} />
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
            <WalletCard wallet={wallet} key={wallet.h_address} />
          ))}
        </Box>
      )}
    </Container>
  );
};

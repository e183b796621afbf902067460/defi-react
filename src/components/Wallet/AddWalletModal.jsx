import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

export const AddWalletModal = ({
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { walletAddress, walletChain } = useParams();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async (values) => {
    try {

      await axiosInstance.post(`/funds/wallets/add`, values);

      toast({
        title: "Wallet Added",
        status: "success",
        isClosable: true,
        diration: 1500,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        diration: 1500,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        ADD WALLET
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Add Wallet</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.address}>
                <Input
                  placeholder="Address..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("address", {
                    required: "This is required field",
                    minLength: {
                      value: 2,
                      message: "Address must be at least 3 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Address must be at most 15 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.chain}>
                <Textarea
                  rows={5}
                  placeholder="Chain..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("chain", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Chain must be at least 3 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Chain must be at most 200 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.chain && errors.chain.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Adding"
                >
                  Add
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

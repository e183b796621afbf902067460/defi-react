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
  Divider,
  Center
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useEffect, useRef, useState } from "react";

export const AddFundModal = ({
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {

  const modalPool = useDisclosure();
  const modalAllocation = useDisclosure();

  const modalDeleteAllocation = useDisclosure();
  const modalDeletePool = useDisclosure();

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


  {/* ADD SUBMITTERS */}
  const onSubmitPool = async (values) => {
    try {
      await axiosInstance.post(`/instruments/pools/${walletChain}/${walletAddress}`, values);

      toast({
        title: "Pool Added",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      modalPool.onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };
  const onSubmitAllocation = async (values) => {
    try {
      await axiosInstance.post(`/instruments/allocations/${walletChain}/${walletAddress}`, values);

      toast({
        title: "Allocation Added",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      modalAllocation.onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };


  {/* DELETE SUBMITTERS */}
  const onSubmitDeletePool = async (values) => {
    try {
      await axiosInstance.delete(`/instruments/pools/${walletChain}/${walletAddress}/${values.protocol}/${values.protocol_category}/${values.address}/${values.pool_name}`);

      toast({
        title: "Pool Deleted",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      modalDeletePool.onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };
  const onSubmitDeleteAllocation = async (values) => {
    try {
      await axiosInstance.delete(`/instruments/allocations/${walletChain}/${walletAddress}/${values.protocol}/${values.protocol_category}/${values.address}/${values.pool_name}`);

      toast({
        title: "Allocation Deleted",
        status: "success",
        isClosable: true,
        duration: 1500,
      });
      onSuccess();
      modalDeleteAllocation.onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1500,
      });
    }
  };



  return (
    <Box {...rest}>
      <Stack spacing={4} direction='row' align='center'>
          <Button w="50%" colorScheme="green" onClick={modalPool.onOpen}>
            Add Pool
          </Button>
          <Button w="50%" colorScheme="green" onClick={modalAllocation.onOpen}>
            Add Allocation
          </Button>
       </Stack>

       <Center height='3px'>
        <Divider orientation='vertical' />
       </Center>

       <Stack spacing={4} direction='row' align='center'>
          <Button w="50%" colorScheme="red" onClick={modalDeletePool.onOpen}>
            Delete Pool
          </Button>
          <Button w="50%" colorScheme="red" onClick={modalDeleteAllocation.onOpen}>
            Delete Allocation
          </Button>
       </Stack>


       {/* ADD POOL MODAL */}
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={modalPool.onClose}
        isOpen={modalPool.isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitPool)}>
          <ModalContent>
            <ModalHeader>Add Pool</ModalHeader>
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
                      message: "Address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Address must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.protocol}>
              <Stack spacing={3} direction='row' align='end'>
                <Input
                  placeholder="Protocol..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol must be at most 30 characters",
                    },
                  })}
                />
                <Input
                  placeholder="Protocol Type..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol_category", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol Type must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol Type must be at most 30 characters",
                    },
                  })}
                />
                </Stack>
                <FormErrorMessage>
                  {errors.protocol && errors.protocol.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.pool_name}>
                <Input
                  placeholder="Pool name..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("pool_name", {
                    required: "This is required field",
                    minLength: {
                      value: 2,
                      message: "Pool name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Pool name must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.pool_name && errors.pool_name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={modalPool.onClose} disabled={isSubmitting}>
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


      {/* ADD ALLOCATION MODAL */}
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={modalAllocation.onClose}
        isOpen={modalAllocation.isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitAllocation)}>
          <ModalContent>
            <ModalHeader>Add Allocation</ModalHeader>
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
                      message: "Address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Address must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.protocol}>
              <Stack spacing={3} direction='row' align='end'>
                <Input
                  placeholder="Protocol..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol must be at most 30 characters",
                    },
                  })}
                />
                <Input
                  placeholder="Protocol Type..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol_category", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol Type must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol Type must be at most 30 characters",
                    },
                  })}
                />
                </Stack>
                <FormErrorMessage>
                  {errors.protocol && errors.protocol.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.pool_name}>
                <Input
                  placeholder="Pool name..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("pool_name", {
                    required: "This is required field",
                    minLength: {
                      value: 2,
                      message: "Pool name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Pool name must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.pool_name && errors.pool_name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={modalAllocation.onClose} disabled={isSubmitting}>
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


      {/* DELETE POOL MODAL */}
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={modalDeletePool.onClose}
        isOpen={modalDeletePool.isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitDeletePool)}>
          <ModalContent>
            <ModalHeader>Delete Pool</ModalHeader>
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
                      message: "Address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Address must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.protocol}>
              <Stack spacing={3} direction='row' align='end'>
                <Input
                  placeholder="Protocol..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol must be at most 30 characters",
                    },
                  })}
                />
                <Input
                  placeholder="Protocol Type..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol_category", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol Type must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol Type must be at most 30 characters",
                    },
                  })}
                />
                </Stack>
                <FormErrorMessage>
                  {errors.protocol && errors.protocol.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.pool_name}>
                <Input
                  placeholder="Pool name..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("pool_name", {
                    required: "This is required field",
                    minLength: {
                      value: 2,
                      message: "Pool name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Pool name must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.pool_name && errors.pool_name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={modalDeletePool.onClose} disabled={isSubmitting}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Deleting"
                >
                  Delete
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>


      {/* DELETE ALLOCATION MODAL */}
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={modalDeleteAllocation.onClose}
        isOpen={modalDeleteAllocation.isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmitDeleteAllocation)}>
          <ModalContent>
            <ModalHeader>Delete Allocation</ModalHeader>
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
                      message: "Address must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Address must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.protocol}>
              <Stack spacing={3} direction='row' align='end'>
                <Input
                  placeholder="Protocol..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol must be at most 30 characters",
                    },
                  })}
                />
                <Input
                  placeholder="Protocol Type..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("protocol_category", {
                    required: "This is required field",
                    minLength: {
                      value: 3,
                      message: "Protocol Type must be at least 3 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Protocol Type must be at most 30 characters",
                    },
                  })}
                />
                </Stack>
                <FormErrorMessage>
                  {errors.protocol && errors.protocol.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.pool_name}>
                <Input
                  placeholder="Pool name..."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("pool_name", {
                    required: "This is required field",
                    minLength: {
                      value: 2,
                      message: "Pool name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 84,
                      message: "Pool name must be at most 84 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.pool_name && errors.pool_name.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={modalDeleteAllocation.onClose} disabled={isSubmitting}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Deleting"
                >
                  Delete
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>

    </Box>
  );
};

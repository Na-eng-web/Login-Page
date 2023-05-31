import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Link,
} from "@chakra-ui/react";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh8upF7JoV0X4Z8TtT6Dtz6gEey0WRLInbeg&usqp=CAU') center center / cover no-repeat`}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="400px"
        p={8}
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="md"
        boxShadow="lg"
      >
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <Heading size="lg" textAlign="center" mb={4}>
              Login
            </Heading>

            <FormControl
              isInvalid={errors.email}
              className={errors.email ? "active-field" : ""}
            >
              <FormLabel>Email</FormLabel>
              <Input
                variant="flushed"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                variant="flushed"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button colorScheme="blackAlpha" type="submit">
              Login
            </Button>

            <Link
              color="black.500"
              textAlign="center"
              fontSize="sm"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;

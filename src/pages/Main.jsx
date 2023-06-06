import React, { useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

const Main = () => {
  const [seats, setSeats] = useState(Array(80).fill(false));
  const [numSeats, setNumSeats] = useState(1);
  const toast = useToast();

  const reserveSeats = () => {
    let startIndex = findAvailableSeats(numSeats);

    if (startIndex === -1) {
      console.log("Seats not available!");
      return;
    }

    // Check if the seats are in the same row
    const currentRow = Math.floor(startIndex / 7);
    let seatsInSameRow = true;
    for (let i = startIndex; i < startIndex + numSeats; i++) {
      const row = Math.floor(i / 7);
      if (row !== currentRow) {
        seatsInSameRow = false;
        break;
      }
    }

    if (!seatsInSameRow) {
      startIndex = findAvailableSeats(1);
      if (startIndex === -1) {
        console.log("Seats not available!");
        return;
      }
      setNumSeats(1); // Update the value of numSeats
    }

    const newSeats = [...seats];
    for (let i = startIndex; i < startIndex + numSeats; i++) {
      newSeats[i] = true;
    }

    setSeats(newSeats);
    console.log(
      "Seats reserved:",
      newSeats.slice(startIndex, startIndex + numSeats)
    );
  };

  const findAvailableSeats = (numSeats) => {
    let consecutiveSeats = 0;
    let startIndex = -1;
    let rowIndex = -1;

    for (let i = 0; i < seats.length; i++) {
      if (!seats[i]) {
        if (consecutiveSeats === 0) {
          startIndex = i;
          rowIndex = Math.floor(i / 7);
        }
        consecutiveSeats++;

        if (consecutiveSeats === numSeats) {
          return startIndex;
        }
      } else {
        consecutiveSeats = 0;
      }

      // Check if the row has reached its maximum capacity
      if ((i + 1) % 7 === 0) {
        if (rowIndex !== Math.floor(i / 7)) {
          consecutiveSeats = 0;
        }
      }
    }

    return -1;
  };

  return (
    <VStack p={4} spacing={4} alignItems="center">
      <HStack w="100%" justifyContent="center">
        <Input
          flex={1}
          mr={2}
          min={1}
          max={7}
          placeholder="Enter number of seats to book"
          size="md"
          bg="white"
          borderRadius="md"
          _placeholder={{ color: "gray.400" }}
          value={numSeats}
          onChange={(e) => setNumSeats(Number(e.target.value))}
        />
        <Button
          colorScheme="teal"
          size="md"
          px={8}
          borderRadius="md"
          _hover={{ bg: "teal.600" }}
          onClick={reserveSeats}
        >
          Submit
        </Button>
      </HStack>
      <Grid
        w={{ base: "100%", md: "50%" }}
        templateColumns="repeat(7, 1fr)"
        gap={4}
        templateRows="repeat(11,1fr)"
      >
        {seats.map((isReserved, index) => {
          return (
            <GridItem
              key={index}
              w={{ base: "12", md: "10" }}
              h={{ base: "12", md: "10" }}
              bg={isReserved ? "green.500" : "gray.300"}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="semibold"
              fontSize="md"
              _hover={{ bg: "gray.400" }}
            >
              {index + 1}
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};

export default Main;

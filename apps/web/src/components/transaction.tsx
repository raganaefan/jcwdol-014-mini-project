'use client';

import {
    Box,
    Heading,
    Text,
    VStack,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    Tag,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  interface TicketOption {
    name: string;
    price: number;
    originalPrice: number;
    fee: number;
    description: string;
    discount: boolean;
  }
  
  function TransactionPage({ eventDetails }: { eventDetails: any }) {
    const [selectedTicketQuantities, setSelectedTicketQuantities] = useState<{
      [ticketName: string]: number;
    }>({});
  
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (const option of eventDetails.ticketOptions) {
        const quantity = selectedTicketQuantities[option.name] || 0;
        totalPrice += option.price * quantity;
        totalPrice += option.fee * quantity;
      }
      return totalPrice;
    };
  
    const handleQuantityChange = (
      ticketName: string,
      quantity: number | undefined
    ) => {
      setSelectedTicketQuantities((prev) => ({
        ...prev,
        [ticketName]: quantity || 0,
      }));
    };
  
    const totalPrice = calculateTotalPrice();
  
    return (
      <Box p={8}>
        <Heading as="h2" size="xl" mb={4}>
          Transaction Details
        </Heading>
        <VStack align="stretch" spacing={4}>
          {eventDetails.ticketOptions.map((option: TicketOption) => (
            <Box key={option.name} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="md" mb={2}>
                {option.name}
              </Heading>
              <Text fontSize="lg" fontWeight="bold">
                Rp{option.price.toLocaleString()}
                {option.fee && ` +Rp${option.fee.toLocaleString()} Fee`}
              </Text>
              {option.originalPrice && (
                <Text
                  as="s"
                  fontSize="sm"
                  color="gray.500"
                  ml={2}
                >{`Rp${option.originalPrice.toLocaleString()}`}</Text>
              )}
              {option.discount && <Tag colorScheme="green">Discount applied</Tag>}
              <Text fontSize="sm" mt={2}>
                {option.description}
              </Text>
              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  value={selectedTicketQuantities[option.name] || 0}
                  onChange={(valueString) =>
                    handleQuantityChange(option.name, parseInt(valueString) || 0)
                  }
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          ))}
  
          <Box p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md">Total Price</Heading>
            <Text fontSize="xl" fontWeight="bold">
              Rp{totalPrice.toLocaleString()}
            </Text>
          </Box>
  
          <Button colorScheme="orange" size="lg">
            Proceed to Payment
          </Button>
        </VStack>
      </Box>
    );
  }
  
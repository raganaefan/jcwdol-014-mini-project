'use client';

import {
  Box,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createEvent } from '@/api/event';

export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(10000);
  const [date, setDate] = useState('');
  const toast = useToast();

  const handleCreateEvent = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Tampilkan loading

    const formattedDate = new Date(date).toISOString();
    try {
      const res = await createEvent({
        eventName,
        description,
        price,
        date: formattedDate,
      });
      toast({
        title: 'Event created.',
        description: 'The event has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: 'Error.',
        description: 'There was an error creating the event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt="10"
      mx="20"
      p="5"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading mb="6">Create Event</Heading>
      <form onSubmit={handleCreateEvent}>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="eventName">Event Name</FormLabel>
          <Input
            id="eventName"
            placeholder="Event Name"
            size="md"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="description">Event Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Put Description here"
            size="md"
            id="description"
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput
            step={5000}
            defaultValue={10000}
            min={0}
            id="price"
            value={price}
            onChange={(valueString) => setPrice(parseInt(valueString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        {/* <Button colorScheme="orange" type="submit">
          Submit
        </Button> */}
              <Button
        isLoading={isLoading} 
        type="submit"
        colorScheme="whiteAlpha"
        rightIcon={isSuccess ? <CheckCircleIcon /> : <WarningIcon />} // Menampilkan ikon berdasarkan status
      >
        submit
      </Button>

      </form>
    </Box>
  );
}

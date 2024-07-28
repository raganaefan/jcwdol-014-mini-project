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
  Center,
} from '@chakra-ui/react';
import {
  VStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, uploadImage } from '@/api/event';


interface FormData {
  eventName: string;
  description: string;
  price: number;
  date: string;
  time: string;
  location: string;
  category: string;
  availSeats: number;
  image: File | null;
}
export default function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(10000);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [availSeats, setAvailSeats] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const toast = useToast();
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "gray.700");

  const handleCreateEvent = async (event: React.FormEvent) => {
    event.preventDefault();

    const formattedDate = new Date(date).toISOString();

    try {
      let imageUrl = '';

      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const uploadResponse = await uploadImage(formData);
        console.log('Upload response:', uploadResponse); 
        if (uploadResponse.ok) {
          imageUrl = uploadResponse.url;
          console.log(imageUrl);
        } else {
          throw new Error(uploadResponse.message);
        }
      }

      const res = await createEvent({
        eventName,
        description,
        price,
        date: formattedDate,
        time,
        location,
        category,
        availSeats,
        imageUrl,
      });

      console.log('Create event response:', res); // Debugging

      if (res.ok) {
        toast({
          title: 'Congratulations',
          description: 'The event has been successfully created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        router.push('/');
      } else {
        toast({
          title: 'Error.',
          description: res.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  return (
    <Center mt="100px" mb="100px" py={150} px={{ base: 4, md: 8 }} 
    bgImage="url('/images/banana.jpg')" 
    bgPosition="center"
    bgSize="cover"
    bgRepeat="no-repeat">
      <Box p={8}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        w={{ base: "90%", sm: "80%", md: "500px" }}
        bg={bg}>
        <Heading mb={4}>Create Event</Heading>
        <form onSubmit={handleCreateEvent} encType="multipart/form-data">
          <VStack spacing={4} align="stretch">
        
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
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="time">Time</FormLabel>
          <Input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="location">Location</FormLabel>
          <Input
            id="location"
            placeholder="Event Location"
            size="md"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Input
            id="category"
            placeholder="Event Category"
            size="md"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4" isRequired>
          <FormLabel htmlFor="availSeats">Available Seats</FormLabel>
          <NumberInput
            min={0}
            id="availSeats"
            value={availSeats}
            onChange={(valueString) => setAvailSeats(parseInt(valueString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="image">Event Image</FormLabel>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
         </FormControl>
             {/* Image Preview */}
            {/* {formData.image && (
              <Image
                src={URL.createObjectURL(formData.image)}
                alt="Event Preview"
                maxH="200px"
                objectFit="cover"
                mb={4}
              />
            )}  */}

            <Button
              colorScheme="orange"
              type="submit"
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

  
//   return (
//     <Box
//       mt="10"
//       mx="20"
//       p="5"
//       borderWidth="1px"
//       borderRadius="lg"
//       boxShadow="lg"
//       py={150}
//     >
//       <Heading mb="6">Create Event</Heading>
//       <form onSubmit={handleCreateEvent} encType="multipart/form-data">
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="eventName">Event Name</FormLabel>
//           <Input
//             id="eventName"
//             placeholder="Event Name"
//             size="md"
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="description">Event Description</FormLabel>
//           <Textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Put Description here"
//             size="md"
//             id="description"
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="price">Price</FormLabel>
//           <NumberInput
//             step={5000}
//             defaultValue={10000}
//             min={0}
//             id="price"
//             value={price}
//             onChange={(valueString) => setPrice(parseInt(valueString))}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="date">Date</FormLabel>
//           <Input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="time">Time</FormLabel>
//           <Input
//             type="time"
//             id="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="location">Location</FormLabel>
//           <Input
//             id="location"
//             placeholder="Event Location"
//             size="md"
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="category">Category</FormLabel>
//           <Input
//             id="category"
//             placeholder="Event Category"
//             size="md"
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </FormControl>
//         <FormControl mb="4" isRequired>
//           <FormLabel htmlFor="availSeats">Available Seats</FormLabel>
//           <NumberInput
//             min={0}
//             id="availSeats"
//             value={availSeats}
//             onChange={(valueString) => setAvailSeats(parseInt(valueString))}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//         </FormControl>
//         <FormControl mb="4">
//           <FormLabel htmlFor="image">Event Image</FormLabel>
//           <Input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </FormControl>
//         <Button colorScheme="orange" type="submit">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// }

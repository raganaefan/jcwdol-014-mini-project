"use client"; // For Next.js App Router (Next 13+)

import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Tag,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Grid,
  GridItem,
  useBreakpointValue,
  useToast,
  Button,
  ButtonGroup,
  Stack,
  Divider
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash"; // Or use a custom debounce function
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

// Event Interface
interface Event {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number; // Assuming price in cents/smallest unit
}

// Event List (Placeholder Data - Replace with actual data)
const events: Event[] = [
  // ... (your event data here)
];

const categories = [...new Set(events.map((event) => event.category))]; // Get unique categories from events
const locations = [...new Set(events.map((event) => event.location))]; // Get unique locations from events

export default function HeroSection() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const toast = useToast();

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    }, 300), // Adjust debounce delay as needed
    []
  );

  // Filter Handling
  useEffect(() => {
    const filtered = events.filter((event) => {
      const categoryMatch =
        !selectedCategory || event.category === selectedCategory;
      const locationMatch =
        !selectedLocation || event.location === selectedLocation;
      return categoryMatch && locationMatch;
    });
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedLocation]);

  // Search Handling
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };
  const numItemsPerRow = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  return (
    <Box maxW="container.xl" mx="auto" mt={8} p={8}>
      <Flex mb={8} direction={{ base: "column", md: "row" }} gap={4}>
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Select
          placeholder="Filter by Category"
          value={selectedCategory || undefined}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Filter by Location"
          value={selectedLocation || undefined}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </Select>
      </Flex>

      <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Living room Sofa</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, earthy toned spaces and for people who love a chic design with a
        sprinkle of vintage design.
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        $450
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Buy now
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to cart
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
      {/* Pagination */}
      {/* ... tambahkan logika pagination di sini ... */}
    </Box>
  );
}

"use client"; // For Next.js App Router (Next 13+)

import {
  Box,
  Link,
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
  Divider,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback, useRef } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { debounce } from "lodash"; // Or use a custom debounce function
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { motion, useAnimation, useInView } from "framer-motion";
import React from "react";

// Event Interface
interface Event {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  price: number; 
}

// Event List 
const events: Event[] = [
  {
    id: 1,
    title: "Music Concert",
    imageUrl: "/images/concert.jpg",
    date: "2023-09-15",
    time: "19:00",
    location: "Jakarta",
    description: "Music Concert Description jguyfuyf",
    category: "Music",
    price: 150000,
  },
  {
    id: 2,
    title: "Art Exhibition",
    imageUrl: "/images/fireworks.jpg",
    date: "2023-10-01",
    time: "10:00",
    location: "Bandung",
    description: "Art Exhibition Description",
    category: "Art",
    price: 50000,
  },
  {
    id: 3,
    title: "Food Festival",
    imageUrl: "/images/wedding.jpg",
    date: "2023-11-20",
    time: "12:00",
    location: "Surabaya",
    description: "Food Festival Description",
    category: "Food",
    price: 75000,
  },
  {
    id: 4,
    title: "Tech Conference",
    imageUrl: "/images/plane.jpg",
    date: "2023-12-05",
    time: "09:00",
    location: "Yogyakarta",
    description: "Tech Conference Description",
    category: "Technology",
    price: 200000,
  },
  {
    id: 5,
    title: "Book Fair",
    imageUrl: "/images/car.jpg",
    date: "2023-08-25",
    time: "14:00",
    location: "Bali",
    description: "Book Fair Description",
    category: "Literature",
    price: 30000,
  },
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
    }, 300), 
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

      <Grid templateColumns={`repeat(${numItemsPerRow}, 1fr)`} gap={6}>
        {filteredEvents.map((event) => (
          <GridItem key={event.id}>
            <Card
              overflow="hidden"
              boxShadow="md"
              transition="transform 0.2s"
              borderWidth={1}
              borderRadius="lg"
              borderColor="gray.200"
              _hover={{ transform: "scale(1.05)" }}
              w="full"
              h="full"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                borderRadius="lg"
                mb={2}
                objectFit="cover"
                w="full"
                h="200px"
              />
              <CardBody p={4}>
                <Heading size="md" color="orange.700" my={2}>
                  {event.title}
                </Heading>
                <Text fontWeight="bold" mb={1} fontSize="md">
                  {event.date} / {event.time} - {event.location}
                </Text>
                <Text mb={1} fontSize="md">{event.description}</Text>
                <Text mb={1} fontSize="md">{event.category}</Text>
                <Text color="orange.600" fontWeight="bold" fontSize="md">
                  {event.price}
                </Text>
              </CardBody>
              <Divider />
              <CardFooter p={4} bg="orange.50">
                <ButtonGroup spacing="4">
                  <Button variant="solid" colorScheme="orange" size="md">
                    Buy
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}


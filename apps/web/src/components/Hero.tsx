'use client'; // For Next.js App Router (Next 13+)

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
  Divider,
  SimpleGrid,
  Spinner, // Import Spinner
  Center, // Import Center for centering elements
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { debounce } from 'lodash'; // Or use a custom debounce function
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { getAllEvent } from '@/api/event';
import Link from 'next/link';

// Event Interface
interface Event {
  id: number;
  eventName: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  price: number; // Assuming price in cents/smallest unit
}

export default function HeroSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getAllEvent();
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = res.data;
        setEvents(data.data);
        setFilteredEvents(data.data); // Initialize filteredEvents with fetched data
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filtered = events.filter((event) =>
        event.eventName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEvents(filtered);
    }, 300), // Adjust debounce delay as needed
    [events], // Depend on events to update filtered results
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
  }, [selectedCategory, selectedLocation, events]);

  // Search Handling
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  // Format Date Function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const numItemsPerRow = useBreakpointValue({ base: 1, md: 2, lg: 4 });

  if (loading) {
    return (
      <Center height="100vh">
        <VStack spacing={4}>
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
          />
          <Text fontSize="xl" color="gray.600">
            Loading events...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text fontSize="xl" color="red.500">
          Error: {error}
        </Text>
      </Center>
    );
  }

  return (
    <Box maxW="container.xl" mx="auto" mt={8} p={8}>
      <Heading as="h2" size="4xl" color="orange.500">
        Explore Events
      </Heading>
      <Flex mb={8} direction={{ base: 'column', md: 'row' }} gap={4}>
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
          {[...new Set(events.map((event) => event.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ),
          )}
        </Select>
        <Select
          placeholder="Filter by Location"
          value={selectedLocation || undefined}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {[...new Set(events.map((event) => event.location))].map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ),
          )}
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
              _hover={{ transform: 'scale(1.05)' }}
              w="full"
              h="full"
            >
              <Image
                src={event.imageUrl}
                alt={event.eventName}
                borderRadius="lg"
                mb={2}
                objectFit="cover"
                w="full"
                h="200px"
              />
              <CardBody p={4}>
                <Heading size="md" color="orange.700" my={2}>
                  {event.eventName}
                </Heading>
                <Text fontWeight="bold" mb={1} fontSize="md">
                  {formatDate(event.date)} / {event.time} - {event.location}
                </Text>
                <Text mb={1} fontSize="md">
                  {event.description}
                </Text>
                <Text mb={1} fontSize="md">
                  {event.category}
                </Text>
                <Text color="orange.600" fontWeight="bold" fontSize="md">
                  {event.price}
                </Text>
              </CardBody>
              <Divider />
              <CardFooter p={4} bg="orange.50">
                <ButtonGroup spacing="4">
                  <Button variant="solid" colorScheme="orange" size="md">
                    <Link
                      href={`/transaction?eventId=${event.id}&price=${event.price}`}
                    >
                      Buy
                    </Link>
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

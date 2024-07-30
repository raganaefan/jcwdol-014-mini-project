"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getEventById, getAllEvent, Event as EventType } from '../api/event';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
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
  Spinner,
  Center,
  Input,
} from '@chakra-ui/react';
import { SearchIcon, Icon } from '@chakra-ui/icons';
import { debounce } from 'lodash';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import Link from 'next/link';

const EventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<EventType | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3; // Number of events per page

  useEffect(() => {
    if (eventId) {
      getEventById(Number(eventId))
        .then(response => {
          if (response.ok) {
            setEvent(response.data);
          } else {
            console.error(response.message);
          }
        })
        .catch(error => {
          console.error('Error fetching event data:', error);
        });
    }
  }, [eventId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getAllEvent();
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = res.data;
        setEvents(data);
        setFilteredEvents(data); // Initialize filteredEvents with fetched data
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filtered = events.filter((event) =>
        event.eventName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEvents(filtered);
    }, 300),
    [events],
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

  // Pagination Handling
  const numPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const numItemsPerRow = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
    <div>
      {event ? (
        <Box p={4}>
          <Heading size="lg" color="orange.700" my={2}>
            {event.eventName}
          </Heading>
          <Image src={event.imageUrl} alt={event.eventName} />
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
          <ButtonGroup spacing="4">
            <Button variant="solid" colorScheme="orange" size="md">
              <Link href={`/transaction?eventId=${event.id}&price=${event.price}`}>Buy</Link>
            </Button>
          </ButtonGroup>
        </Box>
      ) : (
        <Box p={4}>
          <Text>Loading event details...</Text>
        </Box>
      )}
      <Divider />
      <Box p={4}>
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
          size="lg"
          icon={<SearchIcon />}
        />
        <Select
          placeholder="Select category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          mb={4}
        >
          {/* Add your categories here */}
        </Select>
        <Select
          placeholder="Select location"
          onChange={(e) => setSelectedLocation(e.target.value)}
          mb={4}
        >
          {/* Add your locations here */}
        </Select>
        <SimpleGrid columns={numItemsPerRow} spacing={4}>
          {currentEvents.map((event) => (
            <Card key={event.id}>
              <CardBody>
                <Heading size="md" color="orange.700" my={2}>
                  <Link href={`/event?eventId=${event.id}`}>{event.eventName}</Link>
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
              <CardFooter>
                <ButtonGroup spacing="4">
                  <Button variant="solid" colorScheme="orange" size="md">
                    <Link href={`/transaction?eventId=${event.id}&price=${event.price}`}>Buy</Link>
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
        <Flex justifyContent="space-between" mt={4}>
          <Button onClick={handlePrevious} isDisabled={currentPage === 1}>
            Previous
          </Button>
          <Text>
            Page {currentPage} of {numPages}
          </Text>
          <Button onClick={handleNext} isDisabled={currentPage === numPages}>
            Next
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default EventPage;

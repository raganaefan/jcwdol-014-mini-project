'use client';

import { useEffect, useState } from 'react';
import {
  Heading,
  Table,
  Td,
  Th,
  Thead,
  Tbody,
  Tr,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Stat,
  StatLabel,
  StatNumber,
  Box,
  SimpleGrid,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import { deleteEvent, getEventByOrganizerId, updateEvent } from '@/api/event';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import EditEventModal from '@/components/EditEvent';
import DeleteEventModal from '@/components/DeleteEventModal';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

type Event = {
  id: number;
  eventName: string;
  description: string;
  category: string;
  location: string;
  price: number;
  date: string;
  time: string;
  imageUrl: string;
  organizerId: number;
  availSeats: number;
  createdAt: string;
  updatedAt: string;
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEventByOrganizerId();
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = res.data;
        setEvents(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedEvent: Event) => {
    try {
      const res = await updateEvent(updatedEvent.id, updatedEvent);
      if (!res.ok) {
        throw new Error('Failed to save event');
      }
      setEvents((prev) =>
        prev.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        ),
      );
      setIsEditModalOpen(false);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteEvent(id);
      if (!res.ok) {
        throw new Error('Failed to delete event');
      }
      setEvents((prev) => prev.filter((event) => event.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
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
            Loading Data...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt="100px">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    );
  }

  const eventCountsByDate = events.reduce(
    (acc, event) => {
      const date = event.date.split('T')[0]; // Remove time part if present
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    },
    {} as Record<string, number>,
  );

  const sortedDates = Object.keys(eventCountsByDate).sort();

  const eventData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Number of Events',
        data: sortedDates.map((date) => eventCountsByDate[date]),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const eventOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const priceData = {
    labels: events.map((event) => event.eventName),
    datasets: [
      {
        label: 'Event Prices',
        data: events.map((event) => event.price),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const priceOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const averagePrice =
    events.reduce((acc, event) => acc + event.price, 0) / events.length;

  // Format Date Function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        mx={{ base: 4, md: 20 }}
        my={{ base: 4, md: 10 }}
        py="100"
      >
        <Box p={5} shadow="md" borderWidth="1px">
          <Stat>
            <StatLabel>Total Events Created</StatLabel>
            <StatNumber>{events.length}</StatNumber>
          </Stat>
        </Box>
        <Box p={5} shadow="md" borderWidth="1px">
          <Stat>
            <StatLabel>Average Event Price</StatLabel>
            <StatNumber>IDR{averagePrice.toFixed(2)}</StatNumber>
          </Stat>
        </Box>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={10}
        mx={{ base: 4, md: 10 }}
      >
        <Box>
          <Heading as="h3" ml={{ base: 0, md: 10 }} mt="10">
            Event Prices
          </Heading>
          <Bar data={priceData} options={priceOptions} />
        </Box>
        <Box>
          <Heading as="h3" ml={{ base: 0, md: 10 }} mt="10">
            Events by Date
          </Heading>
          <Line data={eventData} options={eventOptions} />
        </Box>
      </SimpleGrid>
      <Heading as="h3" ml={{ base: 4, md: 10 }} mt="10">
        Your List of Events
      </Heading>
      <Box overflowX="auto" mx={{ base: 4, md: 10 }}>
        <Table mt="10">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th>Location</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Price</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>{event.id}</Td>
                <Td>{event.eventName}</Td>
                <Td>{event.description}</Td>
                <Td>{event.category}</Td>
                <Td>{event.location}</Td>
                <Td>{formatDate(event.date)}</Td>
                <Td>{event.time}</Td>
                <Td>IDR {event.price}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEditClick(event)}
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteClick(event)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {selectedEvent && (
        <>
          <EditEventModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            event={selectedEvent}
            onSave={handleSave}
          />
          <DeleteEventModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleDelete(selectedEvent.id)}
          />
        </>
      )}
    </div>
  );
}

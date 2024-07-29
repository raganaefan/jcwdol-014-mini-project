'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getEventById,
  getUserDiscountAndPoints,
  purchaseEvent,
} from '@/api/transaction';
import { useRouter } from 'next/navigation';

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
  price: number;
}

const getEventDetails = async (eventId: number): Promise<Event> => {
  try {
    const res = await getEventById(eventId);
    if (!res.ok) {
      throw new Error(res.message || 'Failed to fetch event');
    }
    return res.data;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export default function TransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const toast = useToast();

  const [event, setEvent] = useState<Event | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchEventAndUserDetails = async () => {
      try {
        if (eventId) {
          const eventDetails = await getEventById(Number(eventId));
          if (!eventDetails || !eventDetails.ok) {
            throw new Error('Failed to fetch event details');
          }
          setEvent(eventDetails.data.data);
          setFinalPrice(eventDetails.data.price);

          const res = await getUserDiscountAndPoints();
          if (!res.ok) {
            throw new Error('Failed to fetch user discount and points');
          }
          const data = res.data;
          setDiscount(data.totalDiscount);
          setPoints(data.totalPoints);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Error',
          description: (error as Error).message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
      }
    };

    fetchEventAndUserDetails();
  }, [eventId, toast, router]);

  useEffect(() => {
    if (event) {
      const calculateFinalPrice = () => {
        const discountedPrice = event.price - event.price * discount;
        const finalPriceWithPoints = discountedPrice - points;
        setFinalPrice(Math.max(finalPriceWithPoints, 0));
      };

      calculateFinalPrice();
    }
  }, [discount, points, event]);

  const handlePurchase = async () => {
    if (!event) return;

    try {
      const res = await purchaseEvent({
        eventId: event.id,
        amount: finalPrice,
      });
      if (!res.ok) {
        throw new Error(res.message);
      }
      toast({
        title: 'Purchase Successful',
        description: 'Your transaction has been completed successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: (error as Error).message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Format Date Function
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Adjust format as needed
  };

  const formatRupiah = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
      return 'IDR 0';
    }
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  if (!event) {
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

  return (
    <Box maxW="container.md" mx="auto" mt={8} p={8}>
      <Heading as="h1" mb={4}>
        {event.eventName}
      </Heading>
      <Text fontWeight="bold" mb={1}>
        {formatDate(event.date)} / {event.time} - {event.location}
      </Text>
      <Text mb={4}>{event.description}</Text>

      <VStack spacing={4} align="stretch">
        <HStack>
          <Text>Price:</Text>
          <Text fontWeight="bold">{formatRupiah(event.price)}</Text>
        </HStack>
        <HStack>
          <Text>Discount:</Text>
          <Text fontWeight="bold">{discount * 100}%</Text>
        </HStack>
        <HStack>
          <Text>Points:</Text>
          <Text fontWeight="bold">{formatRupiah(points)}</Text>
        </HStack>
        <HStack>
          <Text>Final Price:</Text>
          <Text fontWeight="bold">{formatRupiah(finalPrice)}</Text>
        </HStack>
        <Button colorScheme="orange" size="md" onClick={handlePurchase}>
          Confirm Purchase
        </Button>
      </VStack>
    </Box>
  );
}

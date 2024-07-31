'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Spinner,
  Button,
  Center,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getUserTransactions } from '@/api/transaction'; // Adjust the import path as needed

export interface Event {
  eventName: string;
  description: string;
  category: string;
  location: string;
  imageUrl?: string; // Add optional properties if needed
  availSeats?: number;
  price?: number;
  id: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Transaction {
  id: number;
  amount: number;
  createdAt: string;
  Event: Event;
  User: User;
}

const UserTransactionsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getUserTransactions();
        if (response.ok) {
          setTransactions(response.data);
        } else {
          if (response.message === 'Unauthenticated') {
            router.push('/login');
          } else {
            toast({
              title: 'Error',
              description: response.message || 'An unknown error occurred',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        toast({
          title: 'Unexpected Error',
          description: 'An unexpected error occurred',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [toast]);

  const handleReviewClick = (eventId: number) => {
    router.push(`/review-rating?eventId=${eventId}`);
  };

  if (loading) {
    return (
      <Center py={10}>
        <Spinner />
      </Center>
    );
  }

  const formatRupiah = (amount: number | undefined) => {
    if (amount === undefined || amount === null) {
      return 'IDR 0';
    }
    return amount.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  };

  return (
    <Box p={200}>
      <Heading mb={5}>Purchase History</Heading>
      {transactions.length === 0 ? (
        <Center py={10}>
          <Text>No transactions found</Text>
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Event Name</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th>Location</Th>
              <Th>Price</Th>
              <Th>Purchased On</Th>
              <Th>Review</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.Event.eventName}</Td>
                <Td>{transaction.Event.description}</Td>
                <Td>{transaction.Event.category}</Td>
                <Td>{transaction.Event.location}</Td>
                <Td>{formatRupiah(transaction.amount)}</Td>
                <Td>{new Date(transaction.createdAt).toLocaleString()}</Td>
                <Td>
                  <Button
                    onClick={() => handleReviewClick(transaction.Event.id)}
                    colorScheme="blue"
                  >
                    Review
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default UserTransactionsPage;

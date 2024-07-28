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
} from '@chakra-ui/react';
import { getEvent } from '@/api/event';
import React from 'react';
import CardMenu from '@/components/CardMenu';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvent();
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

  if (loading) {
    return (
      <Center mt="100px">
        <Spinner size="xl" />
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

  return (
    <div>
      <CardMenu />
    </div>
  );
}

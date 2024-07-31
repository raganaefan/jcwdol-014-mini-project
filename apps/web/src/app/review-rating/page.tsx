'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Heading,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { getEventById, submitReview } from '@/api/transaction'; // Adjust the path as needed
import StarRating from '@/components/StarRating';

const ReviewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [eventName, setEventName] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    if (!eventId) {
      toast({
        title: 'Event ID is missing',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const getEventDetails = async (eventId: string) => {
      try {
        const res = await getEventById(Number(eventId));
        if (!res.ok) {
          throw new Error(res.message || 'Failed to fetch event');
        }
        setEventName(res.data.data.eventName); // Ensure `eventName` is accessed correctly
      } catch (error) {
        console.error('Error fetching event details:', error);
        toast({
          title: 'Failed to fetch event details',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    getEventDetails(eventId);
  }, [eventId, toast]);

  const handleSubmit = async () => {
    if (!eventId) {
      toast({
        title: 'Event ID is missing',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await submitReview(Number(eventId), rating, comment);

      if (response.ok) {
        toast({
          title: 'Review submitted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setRating(0);
        setComment('');
        router.push('/history-transaction');
      } else {
        toast({
          title: response.message || 'Failed to submit review',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5} py={200}>
      <Heading mb={5}>Submit Review</Heading>
      {eventName && (
        <Heading size="md" mb={5}>
          Event: {eventName}
        </Heading>
      )}
      <FormControl mb={5}>
        <FormLabel>Rating</FormLabel>
        <StarRating rating={rating} setRating={setRating} />
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Comment</FormLabel>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewPage;

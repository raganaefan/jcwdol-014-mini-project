"use client";

import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
  HStack,
  Tag,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

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

async function getEvent(eventId: string): Promise<Event | null> {
  // Fetch data event dari API atau sumber data lainnya berdasarkan eventId
  const response = await fetch(`/api/events/${eventId}`); // Ganti dengan endpoint API yang sesuai
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export default function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEvent(eventId as string);
      setEvent(eventData);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>; // Atau tampilkan pesan error
  }

  return (
    // gunakan event untuk menampilkan detail event dengan chakra UI
  );
}

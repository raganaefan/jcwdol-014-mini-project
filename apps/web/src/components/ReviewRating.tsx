"use client";
import {
    Box,
    Avatar,
    Text,
    VStack,
    HStack,
    useColorModeValue,
    Icon,
    useBreakpointValue,
    SimpleGrid,
    Heading,
  } from "@chakra-ui/react";
  import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
  
  interface Testimonial {
    name: string;
    position: string;
    company: string;
    quote: string;
    avatar?: string; 
  }
  
  const testimonials: Testimonial[] = [
    {
      name: "Ibnu Sina",
      position: "Jr. Solutions Developer",
      company: "Werkdone, Singapore",
      quote:
        "jUjur Eventhub sekeren itu, emang boleh",
      avatar: "/images/ibnu.jpg",
    },
    {
      name: "Willy Bernardus",
      position: "Actor",
      company: "Mazecare, Hongkong",
      quote:
        "bertemu dengan teman teman baru lewat eventhub, membuat saya bertemu banyak koneksi",
      avatar: "/images/willy.jpg",
    },
    {
      name: "Bayu Darmawan",
      position: "Mahasiswa",
      company: "Vantsing International",
      quote:
        "Woww ini sangat luar biasa, klian harus mencobanya",
      avatar: "/images/bayu.jpg",
    },
  ];
  
  function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const bg = useColorModeValue("white", "gray.700");
  
    return (
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        bg={bg}
        textAlign="left" // Teks rata kiri
        maxW={useBreakpointValue({ base: "full", md: "350px" })} // Lebar responsif
      >
        <HStack spacing={4} mb={4}>
          <Avatar
            name={testimonial.name}
            src={testimonial.avatar || ""} // Gunakan avatar jika ada, atau kosong
            size="md"
          />
          <VStack align="start">
            <Text fontWeight="bold">{testimonial.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {testimonial.position} di {testimonial.company}
            </Text>
          </VStack>
        </HStack>
        <Text fontSize="md" mb={4}>
          <Icon as={FaQuoteLeft} mr={2} />
          {testimonial.quote}
          <Icon as={FaQuoteRight} ml={2} />
        </Text>
      </Box>
    );
  }
  
  function TestimonialSection() {
    return (
      <Box py={12} px={{ base: 8, md: 120 }}>
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          Review pengguna EventHub
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </SimpleGrid>
      </Box>
    );
  }
  
  export default TestimonialSection;
  
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
  Container,
  useTheme,
} from "@chakra-ui/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

// Define the Testimonial interface
interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar?: string;
}

// Example testimonial data
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

// Define the TestimonialCard component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const bg = useColorModeValue("white", "gray.700");
  const { colors } = useTheme();
  
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
      bg={bg}
      textAlign="left"
      maxW={useBreakpointValue({ base: "full", md: "350px" })}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: `0 4px 8px ${colors.gray[500]}`,
      }}
    >
      <HStack spacing={4} mb={4}>
        <Avatar
          name={testimonial.name}
          src={testimonial.avatar || ""}
          size="md"
        />
        <VStack align="start">
          <Text fontWeight="bold" fontSize="lg" color="gray.800">
            {testimonial.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {testimonial.position} di {testimonial.company}
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="md" mb={4} position="relative" px={4}>
        <Icon as={FaQuoteLeft} position="absolute" left={0} top={2} color="gray.600" />
        {testimonial.quote}
        <Icon as={FaQuoteRight} position="absolute" right={0} bottom={2} color="gray.600" />
      </Text>
    </Box>
  );
}

// Define the TestimonialSection component
function TestimonialSection() {
  return (
    <Box py={12} px={{ base: 8, md: 16, lg: 24 }}>
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Review pengguna EventHub
      </Heading>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default TestimonialSection;

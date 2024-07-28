'use client';

import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function MarqueeText({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      overflowX="hidden" // Sembunyikan overflow horizontal
      whiteSpace="nowrap" // Cegah teks terbungkus ke baris baru
    >
      <motion.div
        animate={{ x: [-100, 100] }} // Animasi bergerak ke kanan
        transition={{
          x: { duration: 15, repeat: Infinity, ease: 'linear' }, // Gerakan linear terus-menerus
        }}
      >
        <Box>{children}</Box>
      </motion.div>
    </Flex>
  );
}

function Navbar() {
  return (
    <Box bgGradient="linear(to-r, gray.300, yellow.400, pink.200)" p={4}>
      <MarqueeText>
        <strong>
          Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan diskon
          hingga 100% Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan
          diskon hingga 100% Temukan Event Seru Hari Ini!{' '}
        </strong>
      </MarqueeText>
    </Box>
  );
}

export default Navbar;

// import {
//     Box,
//     Heading,
//     Text,
//     Image,
//     Flex,
//     Stack,
//     Divider,
//     ButtonGroup,
//     Button,
//     SimpleGrid,
//     CardFooter,
//     Card,
//   } from "@chakra-ui/react";
//   import { useState } from "react";

//   interface EventProps {
//     imageUrl: string;
//     title: string;
//     description: string;
//     price: string;
//   }

//   function ExploreEvent() {
//     return (
//       <Flex justify="left" align="center" mb="4">
//         <Heading as="h2" size="lg">
//           Explore Event
//         </Heading>
//       </Flex>
//     );
//   }
//   function EventCard({ event }: { event: EventProps }) {
//     return (
//       <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
//         <Image src={event.imageUrl} alt={event.title} borderRadius="lg" />
//         <Box p="6">
//           <Stack mt="6" spacing="3">
//             <Heading size="md">{event.title}</Heading>
//             <Text>{event.description}</Text>
//             <Text color="orange.600" fontSize="2xl">
//               {event.price}
//             </Text>
//           </Stack>
//         </Box>
//         <Divider />
//         <Card>
//         <CardFooter>
//           <ButtonGroup spacing="2">
//             <Button variant="solid" colorScheme="orange">
//               Buy
//             </Button>
//             <Button variant="ghost" colorScheme="orange">
//               Add to cart
//             </Button>
//           </ButtonGroup>
//         </CardFooter>
//         </Card>
//       </Box>
//     );
//   }

//   function EventList() {
//     const events: EventProps[] = [
//       {
//         imageUrl: "/images/car.jpg",
//         title: "car festival 1942",
//         description:
//           "Tahun 1942 menjadi saksi bisu dari redupnya gemerlap festival mobil yang biasanya meriah.",
//         price: "Rp. 100.000",
//       },
//       {
//         imageUrl: "/images/plane.jpg",
//         title: "car festival 1942",
//         description:
//           "Tahun 1942 menjadi saksi bisu dari redupnya gemerlap festival mobil yang biasanya meriah.",
//         price: "Rp. 100.000",
//       },
//       {
//         imageUrl: "/images/car.jpg",
//         title: "car festival 1942",
//         description:
//           "Tahun 1942 menjadi saksi bisu dari redupnya gemerlap festival mobil yang biasanya meriah.",
//         price: "Rp. 100.000",
//       },
//       {
//         imageUrl: "/images/car.jpg",
//         title: "car festival 1942",
//         description:
//           "Tahun 1942 menjadi saksi bisu dari redupnya gemerlap festival mobil yang biasanya meriah.",
//         price: "Rp. 100.000",
//       },
//       {
//         imageUrl: "/images/car.jpg",
//         title: "car festival 1942",
//         description:
//           "Tahun 1942 menjadi saksi bisu dari redupnya gemerlap festival mobil yang biasanya meriah.",
//         price: "Rp. 100.000",
//       },
//       // Tambahkan 4 data event lainnya di sini dengan format yang sama
//     ];

//     return (
//       <Box p={8}>
//         <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={4}>
//           {events.map((event, index) => (
//             <EventCard key={index} event={event} />
//           ))}
//         </SimpleGrid>
//       </Box>
//     );
//   }

//   export default EventList;

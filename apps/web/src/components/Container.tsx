'use client';

import {
  Flex,
  Image,
  Box,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

export default function TopDestinations() {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const titleSize = useBreakpointValue({ base: 'lg', md: 'xl' });

  return (
    <Box py={8} px={{ base: 4, md: 8 }} bg={bg}>
      <Heading as="h2" size={titleSize} textAlign="center" mb={6}>
        Top Destinations
      </Heading>
      <Flex
        wrap="nowrap"
        justify="center"
        gap="1rem"
        width="100%"
        overflowX="auto"
        py={4}
        px={2}
        scrollSnapType="x mandatory"
      >
        {[
          { src: './images/car.jpg', alt: 'Item 1' },
          { src: './images/concert.jpg', alt: 'Item 2' },
          { src: './images/ballon.jpg', alt: 'Item 3' },
          { src: './images/fireworks.jpg', alt: 'Item 4' },
          { src: './images/wedding.jpg', alt: 'Item 5' },
          { src: './images/plane.jpg', alt: 'Item 6' },
        ].map((item, index) => (
          <Box
            key={index}
            p={2}
            flex="0 0 auto"
            width="100%"
            maxWidth="300px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'lg',
            }}
            scrollSnapAlign="start"
          >
            <Image
              src={item.src}
              alt={item.alt}
              borderRadius="md"
              width="100%"
              height="auto"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

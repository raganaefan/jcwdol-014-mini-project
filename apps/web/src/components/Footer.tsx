"use client"; 

import React from 'react';
import { Box, Flex, Link, Text, Image } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { SimpleGrid, Stack, Heading } from '@chakra-ui/react';

const Footer = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box bg="black" color="white" p={8}>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={8} justifyContent="center">
        {/* Column 1: Logo and Links */}
        <Stack spacing={4}>
         <Heading as="h1" fontSize="2xl" fontWeight="bold">Event<span style={{ color: 'orange.500' }}>Hub</span></Heading>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
        </Stack>

        {/* Column 2: Help Links */}
        <Stack spacing={4}>
          <Text fontWeight="bold">Help</Text>
          <Link href="/help">Help Center</Link>
          <Link href="/safety">Safety Tips</Link>
          <Link href="/faq">FAQs</Link>
        </Stack>

        {/* Column 3: Community Links */}
        <Stack spacing={4}>
          <Text fontWeight="bold">Community</Text>
          <Link href="/forums">Forums</Link>
          <Link href="/groups">Groups</Link>
          <Link href="/ambassadors">Ambassadors</Link>
        </Stack>

        {/* Column 4: Connect Links */}
        <Stack spacing={4}>
          <Text fontWeight="bold">Connect</Text>
          <Link href="/contact">Contact Us</Link>
          <Link href="/facebook">Facebook</Link>
          <Link href="/twitter">Twitter</Link>
        </Stack>
      </SimpleGrid>

      {/* Copyright */}
      <Flex justifyContent="center" mt={8} bg="orange.500">
        <Text fontSize="sm" color="white">© {new Date().getFullYear()} EventHub. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
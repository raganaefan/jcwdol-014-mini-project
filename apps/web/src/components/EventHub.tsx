"use client"; 

import {
  Box,
  Link,
  Heading,
  Text,
  Button,
  Center,
  VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

function EventHubHero() {
  return (
    <Box bgImage="url('./images/banana.jpg')" bgSize="cover" color="white" py={250} textAlign="center">
      <VStack spacing={8} align="center">
        <Heading as="h4" size="xl">
          Hi, Welcome to Event<span style={{ color: 'orange' }}>Hub.</span>
        </Heading>
        <Text fontSize="xl"> <Text as="span" color="green.200">Discover</Text> Events, <Text as="span" color="green.200">Simplify</Text> Your Search</Text>
        <Text mx="auto" maxWidth="650px">
          <strong>EventHub</strong> is your one-stop platform to discover and experience exciting
          events near you. Whether you re into music festivals, art exhibitions,
          workshops, or parties, EventHub makes it easy to find events that match
          your interests. With a user-friendly interface and powerful search
          filters, you can quickly browse through a wide range of upcoming
          events, view detailed information, and even purchase tickets directly
          through the platform. Never miss out on the fun again - let EventHub be
          your guide to a vibrant social life!
        </Text>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/find-events">
            <Button colorScheme="orange" size="lg">
              Find Your Event Now!
            </Button>
          </Link>
        </motion.div>
      </VStack>
    </Box>
  );
}

export default EventHubHero;

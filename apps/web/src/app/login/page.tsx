'use client';

import {
  Input,
  Stack,
  Button,
  Center,
  Heading,
  useToast,
  useColorModeValue,
  Box,
  FormLabel,
  FormControl,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/actions/cookies';
import { useUser } from '@/context/UserContext';
import { motion, Transition, useAnimation, useInView } from 'framer-motion';

export default function Login() {
  const router = useRouter();
  const { fetchUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();

        setCookies('token', result.token);
        await fetchUserData();
        router.push('/');
        router.refresh();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Error',
          description: errorData.error || 'Invalid email or password',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Error',
        description: 'An error occurred during login',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center
      mt="100px"
      mb="100px"
      py={170}
      bgImage="url('/images/banana.jpg')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box
        p={8}
        filter="auto"
        backdropFilter="blur(5px)"
        borderRadius="md"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} w={{ base: '80%', sm: '80%', md: '400px' }}>
            <Heading as="h2" size="lg" textAlign="center" color="white">
              Login
            </Heading>
            <FormControl>
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="email"
                color="white"
                placeholder="Enter your email"
                _placeholder={{ opacity: 0.4, color: 'white' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white">Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                color="white"
                _placeholder={{ opacity: 0.4, color: 'white' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              as={motion.button}
              bgGradient="linear(to-r, orange.300, orange.500, orange.700)"
              backgroundSize="200% auto"
              _hover={{
                backgroundPosition: 'right center',
              }}
              animate={{
                backgroundPosition: 'left center',
              }}
              transition={{
                repeat: 'Infinity',
                duration: '2s',
                ease: 'linear',
              }}
              color="white"
              fontWeight="bold"
              px={8}
              py={4}
              borderRadius="full"
            >
              Sign In
            </Button>
            <Text color="white">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

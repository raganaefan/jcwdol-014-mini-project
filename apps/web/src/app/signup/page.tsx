'use client';

import PasswordInput from '@/components/passwordinput';
import {
  Input,
  Stack,
  Button,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useToast,
  useColorModeValue,
  Box,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, Transition, useAnimation, useInView } from 'framer-motion';

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const bg = useColorModeValue('gray.50', 'gray.800'); // Dynamic background
  const color = useColorModeValue('white', 'gray.700'); // Dynamic text color
  const buttonColorScheme = useColorModeValue('green', 'orange');

  const handleSubmit = async (event: React.FormEvent, role: string) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      role,
      referral: referral || undefined,
    };

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        router.push('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <Center
      mt={{ base: '20px', md: '100px' }}
      mb={{ base: '20px', md: '100px' }}
      py={{ base: '100', md: '170' }}
      bgImage="url('/images/banana.jpg')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box
        p={{ base: 4, md: 8 }}
        filter="auto"
        backdropFilter="blur(5px)"
        borderRadius="md"
        boxShadow="lg"
      >
        <Tabs
          isLazy
          colorScheme="orange"
          w={{ base: '90%', md: '80%', lg: '700px' }}
          align="center"
        >
          <TabList>
            <Tab>Register as Customer</Tab>
            <Tab>Register as Organizer</Tab>
          </TabList>

          <TabPanels p={4}>
            <TabPanel>
              <form onSubmit={(e) => handleSubmit(e, 'CUSTOMER')}>
                <Stack spacing={3} w="500px">
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle mr={2}>Registration Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                      <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => setError('')}
                      />
                    </Alert>
                  )}
                  <Input
                    placeholder="First Name"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="text"
                    id="customerFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="text"
                    id="customerLastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="email"
                    id="customerEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <PasswordInput
                    id="customerPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Referral Code (optional)"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    type="text"
                    id="customerReferralCode"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                  <Button
                    type="submit"
                    as={motion.button}
                    bgGradient="linear(to-r, orange.300, orange.500, orange.700)"
                    backgroundSize="200% auto"
                    _hover={{ backgroundPosition: 'right center' }}
                    animate={{ backgroundPosition: 'left center' }}
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
                    Sign Up
                  </Button>
                  <Text color="white">
                    Already have an account? <Link href="/login">Login</Link>
                  </Text>
                </Stack>
              </form>
            </TabPanel>

            <TabPanel>
              <form onSubmit={(e) => handleSubmit(e, 'ORGANIZER')}>
                <Stack spacing={3} w="500px">
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle mr={2}>Registration Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                      <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => setError('')}
                      />
                    </Alert>
                  )}
                  <Input
                    placeholder="First Name"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="text"
                    id="organizerFirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="text"
                    id="organizerLastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    required
                    type="email"
                    id="organizerEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <PasswordInput
                    id="organizerPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    placeholder="Referral Code (optional)"
                    _placeholder={{ color: 'white' }}
                    color="white"
                    size="md"
                    type="text"
                    id="organizerReferralCode"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                  />
                  <Button
                    type="submit"
                    as={motion.button}
                    bgGradient="linear(to-r, orange.300, orange.500, orange.700)"
                    backgroundSize="200% auto"
                    _hover={{ backgroundPosition: 'right center' }}
                    animate={{ backgroundPosition: 'left center' }}
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
                    Sign Up
                  </Button>
                  <Text color="white">
                    Already have an account? <Link href="/login">Login</Link>
                  </Text>
                </Stack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
}

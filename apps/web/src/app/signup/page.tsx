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
  Box,
  useColorModeValue,
  Link,

} from '@chakra-ui/react';
import { motion, Transition } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const backgroundVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { backgroundPosition: "100% 50%" },
  };
  const handleSubmit = async (event: React.FormEvent, role: string) => {
    event.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      role,
      referral: referral || undefined, // include referral code only if it's provided
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
    <Center mt="300px" mb="200px">
      <Box
        flex={1}
        p={20}
        maxW="700"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
        borderColor={borderColor}>
      <Tabs isFitted isLazy colorScheme="green">
        <TabList>
          <Tab>Register as Customer</Tab>
          <Tab>Register as Organizer</Tab>
        </TabList>

        <TabPanels>
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
                  size="md"
                  required
                  type="text"
                  id="customerFirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="Last Name"
                  size="md"
                  required
                  type="text"
                  id="customerLastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  placeholder="Email"
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
                  size="md"
                  type="text"
                  id="customerReferralCode"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                />
                <Button
                  type="submit"
                  as={motion.button}
                  bgGradient="linear(to-r, green.200, orange.500)"
                  color="white"
                  variants={backgroundVariants}
                  animate="animate"
                  initial="initial"
                  transition={{
                    duration: "2s", // Durasi animasi (dalam detik)
                    repeat: "Infinity", // Ulangi tanpa batas
                    repeatType: "reverse", // Animasi bolak-balik
                    ease: "linear", // Jenis transisi (linear, easeIn, easeOut, dll.)
                  }}
                  _hover={{
                    scale: 1.05,
                    boxShadow: "xl",
                  }}
                  onClick={() =>
                    toast({
                      title: 'Account created.',
                      description: "We've created your account for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                  
                >
                  Sign Up
                </Button>
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
                  size="md"
                  required
                  type="text"
                  id="organizerFirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="Last Name"
                  size="md"
                  required
                  type="text"
                  id="organizerLastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  placeholder="Email"
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
                  size="md"
                  type="text"
                  id="organizerReferralCode"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                />
                <Button
                  type="submit"
                  as={motion.button}
                  bgGradient="linear(to-r, green.200, orange.500)"
                  color="white"
                  variants={backgroundVariants}
                  animate="animate"
                  initial="initial"
                  transition={{
                    duration: "2s", // Durasi animasi (dalam detik)
                    repeat: "Infinity", // Ulangi tanpa batas
                    repeatType: "reverse", // Animasi bolak-balik
                    ease: "linear", // Jenis transisi (linear, easeIn, easeOut, dll.)
                  }}
                  _hover={{
                    scale: 1.05,
                    boxShadow: "xl",
                  }}
                  onClick={() =>
                    toast({
                      title: 'Account created.',
                      description: "We've created your account for you.",
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
           </TabPanel>
        </TabPanels>
      </Tabs>
      <Center>
        <h5>already have an account? <Link href="/login">Login</Link> </h5>
      </Center>
      </Box>
    </Center>
  );
}

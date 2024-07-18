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
} from '@chakra-ui/react';
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
    <Center mt="50px" mb="50px">
      <Tabs variant="soft-rounded" colorScheme="teal">
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
                <Button type="submit">Sign Up</Button>
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
                <Button type="submit">Sign Up</Button>
              </Stack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}

'use client';

import {
  Input,
  Stack,
  Button,
  Center,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/actions/cookies';
import { useUser } from '@/context/UserContext';

export default function Login() {
  const router = useRouter();
  const { fetchUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

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
    <Center mt="100px" mb="100px">
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} w="500px">
          <Heading>Login</Heading>
          <Input
            placeholder="Email"
            size="md"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            size="md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign In</Button>
        </Stack>
      </form>
    </Center>
  );
}

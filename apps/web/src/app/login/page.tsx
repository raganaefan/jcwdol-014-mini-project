'use client';

import {
  Input,
  Stack,
  Button,
  Center,
  Alert,
  AlertIcon,
  Heading,
  Img,
} from '@chakra-ui/react';
import {
  Box,
  FormControl,
  FormLabel,
  Link,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, Transition } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookies } from '@/actions/cookies';
import { useUser } from '@/context/UserContext';


export default function Login() {
  const router = useRouter();
  const { fetchUserData } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const backgroundVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { backgroundPosition: "100% 50%" },
  };



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
        router.push('/'); // Redirect to a protected page after successful login
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };


//   return (
//     <Center mt="300px" mb="200px">
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={3} w="500px">
//           {error && (
//             <Alert status="error">
//               <AlertIcon />
//               {error}
//             </Alert>
//           )}
//           <Heading>Log in</Heading>
//           <Input
//             placeholder="Email"
//             size="md"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             placeholder="Password"
//             size="md"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit" colorScheme="orange">Sign In</Button>
//         </Stack>
//       </form>
//     </Center>
//   );
// }


return (
  <Center   
mt="300px" mb="200px" bg={bg}>
      {/* <Flex
        p={1}
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
        alignItems="center" // Menyelaraskan item secara vertikal di tengah
      >
        {/* Gambar di sebelah kiri */}
        {/* <Img
          src="/images/laguana.jpg" // Path gambar yang benar
          alt="Login Image"
          boxSize="200px"
          objectFit="cover"
          borderRadius="lg"
          mr={8}
        /> */} 

    <Box
      flex={1}
      p={20}
      maxW="500px"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="lg"
      borderColor={borderColor}
    >
     
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Heading as="h2" size="xl" textAlign="center" mb={6} color={textColor}>
          Log in
        </Heading>

        <Stack spacing={3}>
          <FormControl>
            <Input
            placeholder='Email Address'
              id="email"
              type="email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="orange.500"
              _hover={{ borderColor: "orange.500" }}
            />
          </FormControl>

          <FormControl>
            <Input
            placeholder='Password'
              id="password"
              type="password"
              size="md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              focusBorderColor="orange.500"
              _hover={{ borderColor: "orange.500" }}
            />
          </FormControl>

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
          >
            Sign In
          </Button>

          <h5>Dont have an account? <Link href="/signup">Sign Up</Link></h5>
        </Stack>
      </form>
    </Box>
  </Center>
);
}

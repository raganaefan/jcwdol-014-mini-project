'use client';
import {
  Box,
  SimpleGrid,
  Stack,
  Heading,
  Link,
  Text,
  Flex,
  Icon,
  HStack,
  Image,

} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react"; 
import { IconType } from 'react-icons'; 

function Footer() {
  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.700", "white");
  const direction = useBreakpointValue({ base: "column", md: "row" });
  const wrap = useBreakpointValue({ base: "wrap", md: "nowrap" });


  return (
    <Box bg={bg} color={color} p={8}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={{ base: 4, md: 8 }} 
      >
        {/* Column 1: Logo and Links */}
        <Stack spacing={4}>
          <Heading as="h1" size="md">
            <Link href="/page.tsx">Event<span style={{ color: 'orange' }}>Hub</span></Link>
          </Heading>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
        </Stack>

        {/* Column 2: Help Links */}
        <Stack spacing={4}>
          <Heading as="h2" size="sm">
            Help
          </Heading>
          <Link href="/help">Help Center</Link>
          <Link href="/safety">Safety Tips</Link>
          <Link href="/faq">FAQs</Link>
        </Stack>

        {/* Column 3: Community Links */}
        <Stack spacing={4}>
          <Heading as="h2" size="sm">
            Community
          </Heading>
          <Link href="/forums">Forums</Link>
          <Link href="/groups">Groups</Link>
          <Link href="/ambassadors">Ambassadors</Link>
        </Stack>

        {/* Column 4: Connect Links */}
        <Stack spacing={4}>
          <Heading as="h2" size="sm">
            Connect
          </Heading>
          <Link href="/contact">Contact Us</Link>
          <HStack spacing={2}>
            <Link href="https://facebook.com/your_profile" isExternal>
              <Icon as={FaFacebook} boxSize={6} />
            </Link>
            <Link href="https://twitter.com/your_profile" isExternal>
              <Icon as={FaTwitter} boxSize={6} />
            </Link>
            <Link href="https://instagram.com/your_profile" isExternal>
              <Icon as={FaInstagram} boxSize={6} />
            </Link>
          </HStack>
        </Stack>
      </SimpleGrid>

      {/* Copyright */}
      <Flex
        justifyContent="center"
        mt={8}
        borderTop="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")} // Dynamic border
        pt={4}
      >
        <Text fontSize="sm">
          © {new Date().getFullYear()} EventHub. All rights reserved. by Raganaefan
          , Zriel
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;

// "use client"; 
'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";
import { useDisclosure } from '@chakra-ui/react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/actions/cookies';
import { Image, Input, InputGroup, InputLeftElement, Button, HStack, Text, IconButton, VStack, Link, Box, Flex } from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuIcon, MenuCommand, MenuDivider } from '@chakra-ui/react';
import { DrawerBody, DrawerOverlay, DrawerContent, Drawer, DrawerCloseButton, DrawerHeader } from '@chakra-ui/react';
import { Transition } from 'framer-motion';
export default function Header() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, fetchUserData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  const handleLogout = async () => {
    try {
      deleteCookie('token');
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  function MarqueeText({ children }: { children: React.ReactNode }) {
    return (
      <Flex
        overflowX="hidden"
        whiteSpace="nowrap"
        w="100%"
        justifyContent="center" // Pusatkan teks marquee
      >
        <motion.div
          animate={{ x: [-100, 100] }}
          transition={{
            x: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        >
          <Box>{children}</Box>
        </motion.div>
      </Flex>
    );
  }

  return (
    <Box as={motion.header}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: '0.50s' }}
      pos="fixed"
      top="0"
      w="full"
      zIndex="sticky"
      boxShadow="md"
     
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="black"
       
        borderColor="white"
      >
        <Link href="/">
          <Image
            src="./images/EVENTHUB.png"
            alt="Eventhub"
            width="100px"
            boxSize="75px"
            objectFit="cover"
            borderRadius="0"
          />
        </Link>
        <InputGroup maxW="400px" display={{ base: 'none', md: 'flex' }} marginX={2} alignSelf="left">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="white" />
          </InputLeftElement>
          <Input type="text" placeholder="Search events" />
        </InputGroup>
        <IconButton
          aria-label="Open Menu"
          size="md"
          mr={2}
          icon={<HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={onOpen}
        />
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link href="/apps/web/src/app/page.tsx">
            <Text color='white'>Find Events</Text>
          </Link>
          {user?.role === 'ORGANIZER' && (
            <Link href="/create-event">
              <Text color={'white'}>Create Event</Text>
            </Link>
          )}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="link"
              color="white"
              _hover={{ color: 'green.200' }}
            >
              Help Center
            </MenuButton>
            <MenuList>
              <MenuGroup title="Help">
                <Link href="/help-center">
                  <MenuItem>Help Center</MenuItem>
                </Link>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Contact Your Event Organizer</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="link"
                color="gray.500"
                _hover={{ color: 'green.200' }}
              >
                Hi, {user.firstName}
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Link href="/login">
                <Button colorScheme="orange">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button colorScheme="orange" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </HStack>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack alignItems="flex-start" spacing={4}>
                <Link href="/find-events">
                  <Text>Find Events</Text>
                </Link>
                {user?.role === 'ORGANIZER' && (
                  <Link href="/create-event">
                    <Text>Create Event</Text>
                  </Link>
                )}
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="link"
                    color="gray.500"
                    _hover={{ color: 'green.200' }}
                  >
                    Help Center
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Help">
                      <Link href="/help-center">
                        <MenuItem>Help Center</MenuItem>
                      </Link>
                      <MenuItem>Settings</MenuItem>
                      <MenuItem>Contact Your Event Organizer</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
                {user ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="link"
                      color="gray.500"
                      _hover={{ color: 'green.200' }}
                    >
                      {user.firstName}
                    </MenuButton>
                    <MenuList>
                      <Link href="/profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Link href="/login">
                      <Button colorScheme="orange" w="full">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button colorScheme="orange" variant="outline" w="full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      {/* Marquee Text */}
      <Box bgGradient="linear(to-r, gray.300, yellow.400, pink.200)" p={2}>
        <MarqueeText>
          <strong>
            Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan diskon
            hingga 100% Temukan Event Seru Hari Ini! Jelajah EventHub dan
            dapatkan diskon hingga 100% Temukan Event Seru Hari Ini!
          </strong>
        </MarqueeText>
      </Box>
    </Box>
  );
}
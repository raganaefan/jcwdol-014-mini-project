'use client';

import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Link,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  chakra,
  Switch,
} from '@chakra-ui/react';
import { CSSTransition } from 'react-transition-group';
import { MdChevronLeft, MdChevronRight, MdMenu } from 'react-icons/md';
import { deleteCookie } from '@/actions/cookies';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, fetchUserData } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      deleteCookie('token');
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="./images/eventhub.png"
          alt="Logo"
          boxSize="75px"
          objectFit="cover"
        />
      </Link>

      {/* Search Bar (hidden on smaller screens) */}
      <InputGroup maxW="400px" display={{ base: 'none', md: 'flex' }}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Search events" />
      </InputGroup>

      {/* Hamburger Menu (visible on smaller screens) */}
      <IconButton
        aria-label="Open Menu"
        size="md"
        mr={2}
        icon={<HamburgerIcon />}
        display={{ md: 'none' }}
        onClick={onOpen}
      />

      {/* Desktop Navigation (hidden on smaller screens) */}
      <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
        <Link href="/find-events">
          <Text>Find Events</Text>
        </Link>
        {user?.role === 'ORGANIZER' && (
          <Link href="/create-event">
            <Text>Create Event</Text>
          </Link>
        )}

        {/* Dropdown Menu */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            variant="link"
            color="gray.500"
            _hover={{ color: 'blue.500' }}
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
              _hover={{ color: 'blue.500' }}
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

      {/* Drawer (Mobile Navigation) */}
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

              {/* Dropdown Menu */}
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  variant="link"
                  color="gray.500"
                  _hover={{ color: 'blue.500' }}
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
                    _hover={{ color: 'blue.500' }}
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
  );
}

// "use client";

// import {
//   Box,
//   Flex,
//   Image,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Button,
//   HStack,
//   Text,
//   IconButton,
//   useDisclosure,
//   Drawer,
//   DrawerBody,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   VStack,
//   Link,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuGroup,
//   MenuDivider,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { motion, useAnimation, useInView, Transition } from "framer-motion";
// import { SearchIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { useState, useRef, useEffect, useCallback } from "react";
// import { deleteCookie } from '@/actions/cookies';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/context/UserContext';
// import { InputRightElement, useBreakpointValue} from "@chakra-ui/react";
// import { CloseIcon } from '@chakra-ui/icons';
// import { debounce } from "lodash"; 

// function MarqueeText({ children }: { children: React.ReactNode }) {
//   return (
//     <Flex
//       overflowX="hidden"
//       whiteSpace="nowrap"
//       w="100%"
//       justifyContent="center"
//     >
//       <motion.div
//         animate={{ x: [-100, 100] }}
//         transition={{
//           x: { duration: 15, repeat: Infinity, ease: "linear" },
//         }}
//       >
//         <Box>{children}</Box>
//       </motion.div>
//     </Flex>
//   );
// }

// export default function Header() {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { user, setUser } = useUser();
//   const router = useRouter();
//   const bg = useColorModeValue("gray.50", "gray.800");
//   const color = useColorModeValue("gray.700", "white");
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });
//   const mainControls = useAnimation(); 
//   const controls = useAnimation();
//   const [searchQuery, setSearchQuery] = useState("");
//   const isMobile = useBreakpointValue({ base: true, md: false });

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView]);

//   const handleLogout = async () => {
//     try {
//       deleteCookie("token");
//       setUser(null);
//       router.push("/");
//       router.refresh();
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const handleSearch = useCallback(
//     debounce((query) => {
//       // Lakukan pencarian di sini dengan nilai 'query'
//       console.log("Searching for:", query); // Contoh logging
//     }, 300), // Delay 300ms sebelum melakukan pencarian
//     []
//   );
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     handleSearch(event.target.value);
//   };

//   return (
//     <Box  ref={ref}
//     as={motion.header} 
//     animate={controls}
//     initial="hidden"
//     variants={{
//       hidden: { opacity: 0 },
//       visible: { opacity: 1 },
//     }}
//     transition={{ duration: "0.5s" }} 
//     pos="fixed"
//     top="0"
//     w="full"
//     bg={bg}
//     color={color}
//     zIndex="sticky"
//     boxShadow="md">

//       {/* Navbar */}
//       <Flex
//         as="nav"
//         align="center"
//         justify="space-between"
//         wrap="wrap"
//         padding={4}
//         bg="black"
//         borderColor="gray.100"
//       >
//         {/* Logo */}
//         <Link href="/">
//             <Image
//               src="/images/eventhubbb.png"
//               alt="eventhub"
//               objectFit="cover"
//               borderRadius="full"
//               boxSize= {"50px"}
//               width={"auto"}
//               px={4}
//             />
//         </Link>

//         {/* Search Bar (hidden on smaller screens) */}
//         <InputGroup maxW="400px" display={{ base: "none", md: "flex" }} marginX={2} alignSelf="left">
//       <InputLeftElement pointerEvents="none">
//         <SearchIcon color="white" />
//       </InputLeftElement>
//       <Input
//         type="text"
//         placeholder="Search events"
//         value={searchQuery}
//         onChange={handleChange}
//         variant="filled" 
//         _focus={{ borderColor: "black" }} 
//         _hover={{ borderColor: "black" }}
//       />
//     </InputGroup>

//         <motion.div
//           initial="hidden"
//           animate={mainControls}
//           variants={{
//             hidden: { opacity: 0, y: -50 },
//             visible: { opacity: 1, y: 0 },
//           }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Hamburger Menu (visible on smaller screens) */}
//           <IconButton
//             aria-label="Open Menu"
//             size="md"
//             mr={2}
//             icon={<HamburgerIcon />}
//             display={{ md: "none" }}
//             onClick={() => {
//               onOpen();
//               console.log("Hamburger menu clicked"); // Add this line to log when the hamburger menu is clicked
//             }}
//           />
//         </motion.div>

//         {/* Desktop Navigation (hidden on smaller screens) */}
//         <HStack spacing={4} display={{ base: "none", md: "flex" }}>
//           <Link href="/find-events">
//             <Text color={"white"}>Find Events</Text>
//           </Link>
//           {user?.role === "ORGANIZER" && (
//             <Link href="/create-event">
//               <Text color={"white"}>Create Event</Text>
//             </Link>
//           )}
//           {user?.role === "ORGANIZER" && (
//             <Menu>
//               <MenuButton
//                 as={Button}
//                 rightIcon={<ChevronDownIcon />}
//                 variant="link"
//                 color="white"
//                 _hover={{ color: "green.200" }}
//               >
//                 Dashboard
//               </MenuButton>
//               <MenuList>
//                 <MenuGroup title="Dashboard">
//                   <Link href="/event-dashboard">
//                     <MenuItem>Event Dashboard</MenuItem>
//                   </Link>
//                   <MenuItem>Transaction Dashboard</MenuItem>
//                 </MenuGroup>
//               </MenuList>
//             </Menu>
//           )}

//           {/* Dropdown Menu */}
//           <Menu>
//             <MenuButton
//               as={Button}
//               rightIcon={<ChevronDownIcon />}
//               variant="link"
//               color="white"
//               _hover={{ color: "green.200" }}
//             >
//               Help Center
//             </MenuButton>
//             <MenuList>
//               <MenuGroup title="Help">
//                 <Link href="/help-center">
//                   <MenuItem>Help Center</MenuItem>
//                 </Link>
//                 <MenuItem>Settings</MenuItem>
//                 <MenuItem>Contact Your Event Organizer</MenuItem>
//               </MenuGroup>
//             </MenuList>
//           </Menu>

//           {user ? (
//             <Menu>
//               <MenuButton
//                 as={Button}
//                 rightIcon={<ChevronDownIcon />}
//                 variant="link"
//                 color="orange.200"
//                 _hover={{ color: "green.200" }}
//               >
//                 Hi, {user.firstName}
//               </MenuButton>
//               <MenuList>
//                 <Link href="/profile">
//                   <MenuItem>Profile</MenuItem>
//                 </Link>
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </MenuList>
//             </Menu>
//           ) : (
//             <>
//               <Link href="/login">
//                 <Button colorScheme="orange">Log In</Button>
//               </Link>
//               <Link href="/signup">
//                 <Button colorScheme="orange" variant="outline">
//                   Sign Up
//                 </Button>
//               </Link>
//             </>
//           )}
//         </HStack>
//       </Flex>

//       <Box
//         bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
//         p={2}
//       >
//         <MarqueeText>
//           <strong>
//             Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan diskon
//             hingga 100% Temukan Event Seru Hari Ini! Jelajah EventHub dan
//             dapatkan diskon hingga 100% Temukan Event Seru Hari Ini!
//           </strong>
//         </MarqueeText>
//       </Box>
//     </Box>
//   );
// }

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, useAnimation, useInView } from "framer-motion";
import { SearchIcon, HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useRef, useEffect, useCallback } from "react";
import { deleteCookie } from '@/actions/cookies';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { debounce } from "lodash"; 

function MarqueeText({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      overflowX="hidden"
      whiteSpace="nowrap"
      w="100%"
      justifyContent="center"
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

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useUser();
  const router = useRouter();
  const bg = useColorModeValue("gray.50", "gray.800");
  const color = useColorModeValue("gray.700", "white");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation(); 
  const controls = useAnimation();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  const handleLogout = async () => {
    try {
      deleteCookie("token");
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSearch = useCallback(
    debounce((query) => {
      // Perform search action here with 'query' value
      console.log("Searching for:", query); // Example logging
    }, 300), // 300ms debounce delay before performing search
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <Box
      ref={ref}
      as={motion.header}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: "0.5s" }}
      pos="fixed"
      top="0"
      w="full"
      bg={bg}
      color={color}
      zIndex="sticky"
      boxShadow="md"
    >
      {/* Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="black"
        borderColor="gray.100"
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/eventhubbb.png"
            alt="eventhub"
            objectFit="cover"
            borderRadius="full"
            boxSize="50px"
            width="auto"
            px={4}
          />
        </Link>

        {/* Search Bar (hidden on smaller screens) */}
        <InputGroup
          maxW="400px"
          display={{ base: "none", md: "flex" }}
          marginX={2}
          alignSelf="left"
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="white" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={handleChange}
            variant="filled"
            bg="black"
            color="white"
            _focus={{ borderColor: "white" }}
            _hover={{ borderColor: "white" }}
          />
        </InputGroup>

        {/* Hamburger Menu (visible on smaller screens) */}
        <IconButton
          aria-label="Open Menu"
          size="md"
          mr={2}
          icon={<HamburgerIcon />}
          display={{ md: "none" }}
          onClick={onOpen}
        />

        {/* Desktop Navigation (hidden on smaller screens) */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Link href="/find-events">
            <Text color="white">Find Events</Text>
          </Link>
          {user?.role === "ORGANIZER" && (
            <Link href="/create-event">
              <Text color="white">Create Event</Text>
            </Link>
          )}
          {user?.role === "ORGANIZER" && (
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="link"
                color="white"
                _hover={{ color: "green.200" }}
              >
                Dashboard
              </MenuButton>
              <MenuList>
                <MenuGroup title="Dashboard">
                  <Link href="/event-dashboard">
                    <MenuItem>Event Dashboard</MenuItem>
                  </Link>
                  <MenuItem>Transaction Dashboard</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}

          {/* Dropdown Menu */}
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="link"
              color="white"
              _hover={{ color: "green.200" }}
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
                color="orange.200"
                _hover={{ color: "green.200" }}
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
      </Flex>

      {/* Drawer for Mobile Menu */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay 
          bg="rgba(0, 0, 0, 0.4)" // Semi-transparent black overlay
          style={{ backdropFilter: 'blur(8px)' }} 
        />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px"><Image src="/images/eventhubbb.png" alt="EventHub" width="auto" height="auto" /></DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <Link href="/find-events">
                <Text>Find Events</Text>
              </Link>
              {user?.role === "ORGANIZER" && (
                <Link href="/create-event">
                  <Text>Create Event</Text>
                </Link>
              )}
              {user?.role === "ORGANIZER" && (
                <Link href="/event-dashboard">
                  <Text>Event Dashboard</Text>
                </Link>
              )}
              <Link href="/help-center">
                <Text>Help Center</Text>
              </Link>
              <Link href="/profile">
                <Text>Profile</Text>
              </Link>
              {user ? (
                <Button onClick={handleLogout}>Logout</Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button colorScheme="orange" width="full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button colorScheme="orange" variant="outline" width="full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box
        bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
        p={2}
      >
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

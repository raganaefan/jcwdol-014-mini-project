"use client";

import {
  Box,
  SimpleGrid,
  VStack,
  Image,
  Text,
  Button,
  useColorModeValue,
  Heading,
  useBreakpointValue,
  Container,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { motion, Transition } from "framer-motion"

const categoryData = [
  { name: "Travel", icon: "/images/icons/airplane.gif", link: "/travel" },
  { name: "Education", icon: "/images/icons/book.gif", link: "/education" },
  { name: "Lifestyle", icon: "/images/icons/coffee-cup.gif", link: "/lifestyle" },
  { name: "Motivasi", icon: "/images/icons/goal.gif", link: "/motivasi" },
  { name: "Graduation", icon: "/images/icons/mortarboard.gif", link: "/graduation" },
  { name: "Art", icon: "/images/icons/paint-palette.gif", link: "/art" },
  { name: "Technology", icon: "/images/icons/rocket.gif", link: "/technology" },
  { name: "Shopping", icon: "/images/icons/shopping-cart.gif", link: "/shopping" },
  { name: "Help", icon: "/images/icons/support.gif", link: "/help" },
  { name: "Entertainment", icon: "/images/icons/video.gif", link: "/entertainment" },
];


function OurServices() {
  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "white"); 

  return (
    <Box bg={bg} color={textColor} py={10}>
      <Container maxW="container.lg"> 
        <VStack spacing={4} align="center">
          <Heading
            as={motion.h2} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition="0.5s" 
            size="2xl"
            color={useColorModeValue("orange.500", "teal.200")} 
          >
            Our Services
          </Heading>

          <Text fontSize="lg" maxW="md" textAlign="center">
            At EventHub, were not just event organizers; we are architects of
            extraordinary moments. We breathe life into your vision, transforming
            your events into immersive experiences that leave lasting
            impressions. Whether its a corporate gathering, an educational
            conference, a celebratory festival, or a product launch, we tailor
            our expertise to match your unique goals.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}

function CategoryCard({ category }: { category: typeof categoryData[0] }) {
  return (
    <VStack
      alignItems="center"
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      _hover={{ boxShadow: "2xl" }}
      transition="all 0.2s"
    >
      <Image src={category.icon} alt={category.name} boxSize="60px" />
      <Text fontWeight="bold" fontSize="md" textAlign="center">
        {category.name}
      </Text>
      {/* <Link href={category.link}>
        <Button colorScheme="blue">Learn More</Button>
      </Link> */}
    </VStack>
  );
}

function EventCategories() {
  const bgColor = useColorModeValue("white", "gray.700");
  const numColumns = useBreakpointValue({ base: 4, md: 3, lg: 5 }); // Make the number of columns responsive

  return (
    <Box bg={bgColor} p={8} px={{ base: 4, md: 120 }}>
       <Heading as="h2" size="2xl" textAlign="center" mb={6}>
        Event Categories
      </Heading>
      <SimpleGrid columns={numColumns} spacing={4}> {/* Apply responsiveness to columns */}
        {categoryData.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default EventCategories;

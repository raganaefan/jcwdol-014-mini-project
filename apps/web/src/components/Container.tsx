'use client'



// import { Flex, Image, Heading } from "@chakra-ui/react";
// export default function Container() {
//   return (
//     <Flex wrap="nowrap" justify="center" gap="1rem" width="100%" overflowX="auto" py={4}>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/car.jpg" alt="Item 1" borderRadius="md" width="100%" height="auto" />
//       </div>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/concert.jpg" alt="Item 2" borderRadius="md" width="100%" height="auto" />
//       </div>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/ballon.jpg" alt="Item 5" borderRadius="md" width="100%" height="auto" />
//       </div>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/fireworks.jpg" alt="Item 3" borderRadius="md" width="100%" height="auto" />
//       </div>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/wedding.jpg" alt="Item 5" borderRadius="md" width="100%" height="auto" />
//       </div>
//       <div className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
//         <Image src="./images/plane.jpg" alt="Item 5" borderRadius="md" width="100%" height="auto" />
//       </div>
//     </Flex>
//   );
// }

import {
  Box,
  Flex,
  Image,
  Heading,
  useColorModeValue,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

function Container() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView]);

  const images = [
    "./images/car.jpg",
    "./images/concert.jpg",
    "./images/ballon.jpg",
    "./images/fireworks.jpg",
    "./images/wedding.jpg",
    "./images/plane.jpg",
  ];

  const numItemsPerRow = Infinity;

  return (
    <Flex wrap="nowrap" justify="center" gap="1rem" width="100%" overflowX="auto" py={4}>
    <Box ref={ref} mt={8}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Heading
          as="h2"
          size="lg"
          textAlign="center"
          mb={4}
          color={useColorModeValue("gray.800", "white")}
        >
          Top Destinations
        </Heading>
      </motion.div>
      <SimpleGrid columns={numItemsPerRow} spacing={4}>
        {images.map((src, index) => (
          <Box
            key={index}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }} // Hover effect
          >
            <Image src={src} alt={`Item ${index + 1}`} borderRadius="md" />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  </Flex>
  );
}

export default Container;

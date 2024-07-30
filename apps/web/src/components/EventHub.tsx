// 'use client';

// import {
//   Box,
//   Link,
//   Heading,
//   Text,
//   Button,
//   Center,
//   VStack,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

// function EventHubHero() {
//   return (
//     <Box
//       bgImage="url('./images/banana.jpg')"
//       bgSize="cover"
//       color="white"
//       my={50}
//       py={200}
//       textAlign="center"
//     >
//       <VStack spacing={8} align="center">
//         <Heading as="h2" size="2xl">
//           Hi, Welcome to Event<span style={{ color: 'orange' }}>Hub.</span>
//         </Heading>
//         <Text fontSize="xl">
//           {' '}
//           <Text as="span" color="green.200">
//             Discover
//           </Text>{' '}
//           Events,{' '}
//           <Text as="span" color="green.200">
//             Simplify
//           </Text>{' '}
//           Your Search
//         </Text>
//         <Text mx="auto" maxWidth={{ base: "80%", md: "650px" }}>
//           <strong style={{ fontSize: '1.5em' }}>EventHub</strong> adalah platform satu-stop Anda untuk menemukan dan
//           mengalami acara yang menggembirakan di dekat Anda. Apakah Anda suka
//           <Text as="span" color="gray.200">festival musik</Text>, <Text as="span" color="yellow.200">pameran seni</Text>, <Text as="span" color="pink.200">workshop</Text>, atau <Text as="span" color="blue.200">pesta</Text>, EventHub membuatnya
//           mudah untuk menemukan acara yang sesuai dengan minat Anda. Dengan antarmuka yang ramah pengguna dan filter pencarian yang kuat, Anda dapat dengan cepat menjelajahi
//           berbagai acara yang akan datang, melihat informasi detail, dan bahkan
//           membeli tiket langsung melalui platform. Jangan pernah ketinggalan kesenangan lagi - biarkan EventHub menjadi panduan Anda untuk hidup sosial yang berwarna!
//         </Text>

//         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//           <Link href="/find-events">
//             <Button bg="black" colorScheme="white" size="lg">
//               Find Your Event Now!
//             </Button>
//           </Link>
//         </motion.div>
//       </VStack>
//     </Box>
//   );
// }

// export default EventHubHero;

'use client';

import React from 'react';
import {
  Box,
  Link,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

function EventHubHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <Box
      ref={ref}
      bgImage="url('./images/banana.jpg')"
      bgSize="cover"
      color="white"
      my={50}
      py={200}
      textAlign="center"
    >
      <VStack spacing={8} align="center">
        <motion.div initial="hidden" animate={controls} variants={variants}>
          <Heading as="h2" size="2xl">
            Hi, Welcome to Event<span style={{ color: 'orange' }}>Hub.</span>
          </Heading>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={variants} transition={{ delay: 0.2 }}>
          <Text fontSize="xl">
            <Text as="span" color="green.200">Discover</Text> Events,{' '}
            <Text as="span" color="green.200">Simplify</Text> Your Search
          </Text>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={variants} transition={{ delay: 0.4 }}>
          <Text mx="auto" maxWidth={{ base: "80%", md: "650px" }}>
            <strong style={{ fontSize: '1.5em' }}>EventHub</strong> adalah platform satu-stop Anda untuk menemukan dan
            mengalami acara yang menggembirakan di dekat Anda. Apakah Anda suka
            <Text as="span" color="gray.200">festival musik</Text>, <Text as="span" color="yellow.200">pameran seni</Text>, <Text as="span" color="pink.200">workshop</Text>, atau <Text as="span" color="blue.200">pesta</Text>, EventHub membuatnya
            mudah untuk menemukan acara yang sesuai dengan minat Anda. Dengan antarmuka yang ramah pengguna dan filter pencarian yang kuat, Anda dapat dengan cepat menjelajahi
            berbagai acara yang akan datang, melihat informasi detail, dan bahkan
            membeli tiket langsung melalui platform. Jangan pernah ketinggalan kesenangan lagi - biarkan EventHub menjadi panduan Anda untuk hidup sosial yang berwarna!
          </Text>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/find-events">
            <Button bg="black" colorScheme="white" size="lg">
              Find Your Event Now!
            </Button>
          </Link>
        </motion.div>
      </VStack>
    </Box>
  );
}

export default EventHubHero;

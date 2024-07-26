// "use client";

// import { Box, Flex } from "@chakra-ui/react";
// import { motion } from "framer-motion";

// function MarqueeText({ children }: { children: React.ReactNode }) {
//   return (
//     <Flex
//       overflowX="hidden" 
//       whiteSpace="nowrap" 
//     >
//       <motion.div
//         animate={{ x: [-100, 100] }} 
//         transition={{
//           duration: 15, 
//           repeat: Infinity, 
//           ease: "linear" 
//         }}
//       >
//         <Box>{children}</Box>
//       </motion.div>
//     </Flex>
//   );
// }

// function Navbar() {
//   return (
//     <Box bgGradient='linear(to-r, gray.300, yellow.400, pink.200)' p={4}>
//       <MarqueeText>
//         <strong>Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan diskon hingga 100%
//         Temukan Event Seru Hari Ini! Jelajah EventHub dan dapatkan diskon hingga 100%
//         Temukan Event Seru Hari Ini! </strong>
//       </MarqueeText>
//     </Box>
//   );
// }

// export default Navbar;

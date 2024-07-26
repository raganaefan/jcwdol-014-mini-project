// 'useclient'
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     HStack,
//     Rating
//     useToast,
//     Value,

//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import { addDoc, collection } from "firebase/firestore";
//   import { db } from "../firebaseConfig"; 
// import { review } from '@/api/review';
  
//   function ReviewForm({ eventId }: { eventId: string }) {
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");
//     const toast = useToast();
  
//     const handleSubmit = async () => {
//       if (rating === 0 || comment.trim() === "") {
//         toast({
//           title: "Error",
//           description: "Please provide a rating and comment.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//         return;
//       }
  
//       try {
//         await addDoc(collection(db, "event_reviews"), {
//           eventId,
//           rating,
//           comment,
//           timestamp: new Date(),
//         });
  
//         setRating(0);
//         setComment("");
//         toast({
//           title: "Success",
//           description: "Your review has been submitted.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         console.error("Error adding review:", error);
//         toast({
//           title: "Error",
//           description: "Failed to submit your review.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     };
  
//     return (
//       <Box p={4} borderWidth="1px" borderRadius="md">
//         <FormControl mb={4}>
//           <FormLabel>Rating</FormLabel>
//           <Rating value={rating} onChange={(value) => setRating(value)} />
//         </FormControl>
//         <FormControl mb={4}>
//           <FormLabel>Comment</FormLabel>
//           <Textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//         </FormControl>
//         <Button colorScheme="blue" onClick={handleSubmit}>
//           Submit Review
//         </Button>
//       </Box>
//     );
//   }
  
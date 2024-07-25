// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     NumberInput,
//     NumberInputField,
//     NumberInputStepper,
//     NumberIncrementStepper,
//     NumberDecrementStepper,
//     Switch,
//     Textarea,
//     Select,
//     VStack,
//   } from '@chakra-ui/react';
//   import { useState } from 'react';
  
//   interface Promotion {
//     type: string;
//     value: number;
//     usageLimit: number;
//   }

//   function CreateEvent() {
//     const [eventData, setEventData] = useState({
//       name: "",
//       price: 0,
//       isPaid: false,
//       date: "",
//       time: "",
//       location: "",
//       description: "",
//       availableSeats: 0,
//       ticketTypes: [], 
//       promotions: [] as Promotion[], 
//     });
  
//     const handleInputChange = (field: keyof typeof eventData, value: any) => {
//       setEventData({
//         ...eventData,
//         [field]: value,
//       });
//     };
  
//     const addPromotion = () => {
//       setEventData({
//         ...eventData,
//         promotions: [
//           ...eventData.promotions,
//           { type: "discount", value: 0, usageLimit: 0 }, // Default promotion
//         ],
//       });
//     };
  
//     const handlePromotionChange = (
//       index: number,
//       field: keyof Promotion,
//       value: any
//     ) => {
//       setEventData({
//         ...eventData,
//         promotions: eventData.promotions.map((promo, i) =>
//           i === index ? { ...promo, [field]: value } : promo
//         ),
//       });
//     };
  
//     const removePromotion = (index: number) => {
//       setEventData({
//         ...eventData,
//         promotions: eventData.promotions.filter((_, i) => i !== index),
//       });
//     };
  
//     return (
//       <VStack spacing={4} align="stretch">
//         <FormControl>
//           <FormLabel>Event Name</FormLabel>
//           <Input
//             value={eventData.name}
//             onChange={(e) => handleInputChange("name", e.target.value)}
//           />
//         </FormControl>
  
//         <FormControl>
//           <FormLabel>Price (IDR)</FormLabel>
//           <NumberInput
//             isDisabled={!eventData.isPaid}
//             value={eventData.price}
//             onChange={(valueString) => handleInputChange("price", parseInt(valueString))}
//             precision={0} 
//             min={0}
//           >
//             <NumberInputField />
//             <NumberInputStepper>
//               <NumberIncrementStepper />
//               <NumberDecrementStepper />
//             </NumberInputStepper>
//           </NumberInput>
//           <Switch
//             mt={2}
//             isChecked={eventData.isPaid}
//             onChange={(e) => handleInputChange("isPaid", e.target.checked)}
//           >
//             Paid Event?
//           </Switch>
//         </FormControl>
//         {/* Other form controls for date, time, location, description, etc. */}
//       </VStack>
//     );
//   }
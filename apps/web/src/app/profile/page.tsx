'use client';

import { useState, useEffect } from 'react';
import { findMe } from '@/api/user'; // Adjust the import path as necessary
import {
  Stack,
  Heading,
  Skeleton,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import {
  Box,
  Text,
  Avatar,
  VStack,
  HStack,
  Divider,
  Badge,
  List,
  ListItem,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const bg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await findMe();
        if (result && result.ok) {
          setUserData(result.data);
        } else {
          setError(result?.message || 'Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  interface DiscountCoupon {
    id: string;
    discount: number;
    expiredAt: Date;
  }
  
  interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    referral: string;
    points: number;
    discountCoupon: DiscountCoupon[];
  }


  return (
    <Center mt="100px" mb="100px" py={100} px={{ base: 4, md: 8 }} bg={bg}>
      <Box p={8} borderWidth={1} borderRadius="md" boxShadow="lg" w={{ base: "90%", sm: "80%", md: "400px" }}>
        <VStack spacing={6} align="center">
          <Skeleton isLoaded={!loading} h={24} w={24} borderRadius="full">
            <Avatar size="xl" name={`${userData?.firstName} ${userData?.lastName}`} />
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <Heading as="h1" size="xl">
              {userData?.firstName} {userData?.lastName}
            </Heading>
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <Text fontSize="lg" color="gray.500">
              {userData?.email}
            </Text>
          </Skeleton>

          <Skeleton isLoaded={!loading}>
            <Badge variant="solid" colorScheme="purple">
              {userData?.role.toLowerCase()}
            </Badge>
          </Skeleton>

          <Tabs isFitted variant="enclosed" colorScheme="orange">
            <TabList mb="1em">
              <Tab>Profile</Tab>
              <Tab>Discount & Points</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text>
                  Referral Code:{" "}
                  <Text as="span" fontWeight="bold">
                    {userData?.referral}
                  </Text>
                </Text>
              </TabPanel>
              <TabPanel>
                <Text>
                  Points:{" "}
                  <Text as="span" fontWeight="bold">
                    {userData?.points}
                  </Text>
                </Text>
                <Heading as="h4" size="md" mt={4}>
                  Discounts:
                </Heading>
                {userData?.discountCoupon?.length > 0 ? (
                  <List spacing={3}>
                    {userData.discountCoupon.map((coupon: DiscountCoupon) => (
                      <ListItem key={coupon.id}>
                        {coupon.discount * 100}% off (Expires:{" "}
                        {new Date(coupon.expiredAt).toLocaleDateString()})
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Text>No discounts available</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </Center>
  );
}




//   return (
//     <div>
//       <Stack mt="6" ml="6" py={200}>
//         <Skeleton isLoaded={!loading}>
//           <Tabs isFitted variant="enclosed">
//             <TabList mb="1em">
//               <Tab>Profile</Tab>
//               <Tab>Discount and Points</Tab>
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                 <Heading>Profile</Heading>
//                 <p>
//                   Name: {userData?.firstName} {userData?.lastName}
//                 </p>
//                 <p>Email: {userData?.email}</p>
//                 <p>Role: {userData?.role.toLowerCase()}</p>
//               </TabPanel>
//               <TabPanel>
//                 <Heading>Discount and Points</Heading>
//                 <p>Referral Code: {userData?.referral}</p>
//                 <p>Points: {userData?.points}</p>
//                 {userData?.discountCoupon?.length > 0 ? (
//                   <ul>
//                     {userData.discountCoupon.map((coupon: any) => (
//                       <li key={coupon.id}>
//                         Discount: {coupon.discount * 100}% (Expires:{' '}
//                         {new Date(coupon.expiredAt).toLocaleDateString()})
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No discounts available</p>
//                 )}
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </Skeleton>
//       </Stack>
//     </div>
//   );
// };

export default Profile;

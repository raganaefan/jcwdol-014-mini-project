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

const Profile = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <Stack mt="6" ml="6">
        <Skeleton isLoaded={!loading}>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Profile</Tab>
              <Tab>Discount and Points</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading>Profile</Heading>
                <p>
                  Name: {userData?.firstName} {userData?.lastName}
                </p>
                <p>Email: {userData?.email}</p>
                <p>Role: {userData?.role.toLowerCase()}</p>
              </TabPanel>
              <TabPanel>
                <Heading>Discount and Points</Heading>
                <p>Referral Code: {userData?.referral}</p>
                <p>Points: {userData?.points}</p>
                {userData?.discountCoupon?.length > 0 ? (
                  <ul>
                    {userData.discountCoupon.map((coupon: any) => (
                      <li key={coupon.id}>
                        Discount: {coupon.discount * 100}% (Expires:{' '}
                        {new Date(coupon.expiredAt).toLocaleDateString()})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No discounts available</p>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Skeleton>
      </Stack>
    </div>
  );
};

export default Profile;

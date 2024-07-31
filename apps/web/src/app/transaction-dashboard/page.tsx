'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Spinner,
  VStack,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchTransactions, Transaction } from '@/api/transaction'; // Adjust the path as needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function TransactionDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>(
    'daily',
  );
  const [eventData, setEventData] = useState<{
    [key: string]: { amount: number; users: string[] };
  }>({});

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetchTransactions();
      if (response.ok) {
        const data = response.data || [];
        setTransactions(data);

        const eventStats: {
          [key: string]: { amount: number; users: string[] };
        } = {};

        data.forEach((transaction) => {
          const eventName = transaction.Event.eventName;
          const userEmail = transaction.User.email;

          if (!eventStats[eventName]) {
            eventStats[eventName] = { amount: 0, users: [] };
          }

          eventStats[eventName].amount += transaction.amount;
          if (!eventStats[eventName].users.includes(userEmail)) {
            eventStats[eventName].users.push(userEmail);
          }
        });

        setEventData(eventStats);
      }
      setLoading(false);
    };

    getTransactions();
  }, [timeRange]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  const formatChartData = (transactions: Transaction[]) => {
    const data = transactions.reduce(
      (acc: { [key: string]: number }, transaction) => {
        const date = new Date(transaction.createdAt);
        let key: string;

        if (timeRange === 'daily') {
          key = date.toLocaleDateString();
        } else if (timeRange === 'weekly') {
          const startOfWeek = new Date(
            date.setDate(date.getDate() - date.getDay()),
          );
          key = startOfWeek.toLocaleDateString();
        } else {
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        }

        if (!acc[key]) acc[key] = 0;
        acc[key] += transaction.amount;
        return acc;
      },
      {},
    );

    return {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Transaction Amounts',
          data: Object.values(data),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const timeRangeChartData = formatChartData(transactions);

  const eventChartData = {
    labels: Object.keys(eventData),
    datasets: [
      {
        label: 'Total Amount by Event',
        data: Object.values(eventData).map((event) => event.amount),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            return `Amount: ${value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period / Event Name',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        ticks: {
          callback: (value: number | string) => {
            if (typeof value === 'number') {
              return value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              });
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <Box p={{ base: 4, md: 10 }} mt="100">
      <Heading as="h1" mb={5}>
        Transaction Dashboard
      </Heading>
      <Select
        mb={5}
        value={timeRange}
        onChange={(e) =>
          setTimeRange(e.target.value as 'daily' | 'weekly' | 'monthly')
        }
        maxWidth={{ base: '100%', md: '200px' }}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Select>
      <VStack spacing={5}>
        <Box width={{ base: '100%', md: '80%' }} height="400px">
          <Bar data={timeRangeChartData} options={commonOptions} />
        </Box>

        <Box width={{ base: '100%', md: '80%' }} height="400px">
          <Bar data={eventChartData} options={commonOptions} />
        </Box>

        {/* Table for users by event */}
        <Box width="100%">
          <Heading as="h2" mb={5}>
            Users by Event
          </Heading>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Event Name</Th>
                <Th>User Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(eventData).map(([eventName, { users }]) => (
                <Tr key={eventName}>
                  <Td>{eventName}</Td>
                  <Td>{users.join(', ')}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}

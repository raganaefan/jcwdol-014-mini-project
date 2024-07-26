import {
    Box,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ChevronDownIcon } from "@chakra-ui/icons";
  import { Select } from "@chakra-ui/react";
  
  interface Order {
    id: number;
    eventId: number;
    quantity: number;
    totalPrice: number;
    purchaseDate: string;
  }
  
  interface Event {
    id: number;
    title: string;
    imageUrl: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
    price: number;
  }
  
  // Placeholder purchase history data
  const orders: Order[] = [
    {
      id: 1,
      eventId: 1,
      quantity: 2,
      totalPrice: 300000,
      purchaseDate: "2023-09-10",
    },
    // ... more orders
  ];
  
  const events: Event[] = [
    {
      id: 1,
      title: "Music Concert",
      imageUrl: "/images/concert.jpg",
      date: "2023-09-15",
      time: "19:00",
      location: "Jakarta",
      description: "Music Concert Description",
      category: "Music",
      price: 150000,
    },
    // ... more events
  ];
  
  function PurchaseHistory() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
    const filteredOrders = selectedEvent
      ? orders.filter((order) => order.eventId === selectedEvent.id)
      : [];
  
    return (
      <Box p={8}>
        <Heading as="h2" size="xl" mb={4}>
          Purchase History
        </Heading>


     
        <Select placeholder="Select Event"
        icon={<ChevronDownIcon />} 
        iconSize="1.2em" 
        variant="filled" 
        mb={4}
        onChange={(e) => {
          const eventId = parseInt(e.target.value);
          setSelectedEvent(events.find((event) => event.id === eventId) || null);
        }}
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </Select>

      
  
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Event Name</Th>
                <Th>Quantity</Th>
                <Th isNumeric>Total Price</Th>
                <Th>Purchase Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders.map((order) => (
                <Tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{events.find((event) => event.id === order.eventId)?.title}</Td>
                  <Td>{order.quantity}</Td>
                  <Td isNumeric>Rp{order.totalPrice.toLocaleString()}</Td>
                  <Td>{order.purchaseDate}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  
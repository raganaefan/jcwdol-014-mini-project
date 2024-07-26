'use client';

import { Flex, Image, Heading } from "@chakra-ui/react";
export default function Container() {
  const images = [
    "./images/car.jpg",
    "./images/concert.jpg",
    "./images/ballon.jpg",
    "./images/fireworks.jpg",
    "./images/wedding.jpg",
    "./images/plane.jpg",
  ];

  return (
    <Flex wrap="nowrap" justify="center" gap="1rem" width="100%" overflowX="auto" py={4}>
       <Heading as="h2" size="4xl" color="orange.500">Popular Destinations</Heading>
      {images.map((image, index) => (
        <div key={index} className="item" style={{ padding: '0.5rem', flex: '0 0 auto', width: '100%', maxWidth: '300px' }}>
          <Image src={image} alt={`Item ${index + 1}`} borderRadius="md" width="100%" height="auto" />
        </div>
      ))}
    </Flex>
  );
}

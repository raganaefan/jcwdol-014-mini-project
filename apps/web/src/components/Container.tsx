'use client';

import { Flex, Image } from '@chakra-ui/react';
export default function Container() {
  return (
    <Flex
      wrap="nowrap"
      justify="center"
      gap="1rem"
      width="100%"
      overflowX="auto"
      py={4}
    >
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/car.jpg"
          alt="Item 1"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/concert.jpg"
          alt="Item 2"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/ballon.jpg"
          alt="Item 5"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/fireworks.jpg"
          alt="Item 3"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/wedding.jpg"
          alt="Item 5"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
      <div
        className="item"
        style={{
          padding: '0.5rem',
          flex: '0 0 auto',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <Image
          src="./images/plane.jpg"
          alt="Item 5"
          borderRadius="md"
          width="100%"
          height="auto"
        />
      </div>
    </Flex>
  );
}

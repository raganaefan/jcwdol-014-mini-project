import HeroSection from '@/components/Hero';
import styles from './page.module.css';
import { Button, ButtonGroup, Heading, Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}

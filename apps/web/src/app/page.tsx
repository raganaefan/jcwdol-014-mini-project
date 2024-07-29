import HeroSection from '@/components/Hero';
import styles from './page.module.css';
import { Button, ButtonGroup, Heading, Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Container from '@/components/Container';
import EventHub from '@/components/EventHub';
import EventCategories from '@/components/EventCategories';
import ReviewRating from '@/components/ReviewRating';
export default function Home() {
  return (
    <div>
      <EventHub />
      <EventCategories/>
      <Hero />
      <ReviewRating />
      <Container />
    </div>
  );
}

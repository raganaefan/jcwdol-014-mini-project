import HeroSection from '@/components/Hero'
import styles from './page.module.css'
import { Button, ButtonGroup, Heading, Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
// export default function Home() {
//   return (
// <ButtonGroup variant='outline' spacing='6'>
//   <Button colorScheme='blue'> <Link href="/login">Sign In</Link></Button>
//   <Button> <Link href="/signup">Sign Up</Link></Button>
// </ButtonGroup>
//   )
// }

export default function Home() {
  return (
    <div>
    {<Header />}
    {<Hero />}
    {<Footer />}
    </div>
  );
}
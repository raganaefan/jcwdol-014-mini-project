import styles from './page.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
<ButtonGroup variant='outline' spacing='6'>
  <Button colorScheme='blue'> <Link href="/login">Sign In</Link></Button>
  <Button> <Link href="/signup">Sign Up</Link></Button>
</ButtonGroup>
  )
}

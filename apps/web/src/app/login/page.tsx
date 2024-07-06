'use client'

import styles from './page.module.css'
import { Input, Stack, Button, Center } from '@chakra-ui/react'
import Link from 'next/link'


export default function Login() {
    return (
    <Center mt="100px"><Stack spacing={3} w='500px'>
        <Input placeholder='Email' size='md' />
        <Input placeholder='Passsword' size='md' />
        <Button>Sign In</Button>
    </Stack></Center>
    )
  }

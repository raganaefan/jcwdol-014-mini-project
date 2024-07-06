'use client'

import PasswordInput from '@/components/passwordinput'
import styles from './page.module.css'
import { Input, Stack, Button, Center } from '@chakra-ui/react'
import Link from 'next/link'


export default function Signup() {
    return (
    <Center mt="100px"><Stack spacing={3} w='500px'>
        <Input placeholder='First Name' size='md' />
        <Input placeholder='Last Name' size='md' />
        <Input placeholder='Email' size='md' />
        <PasswordInput></PasswordInput>
        <Button>Sign Up</Button>
    </Stack></Center>
    )
  }

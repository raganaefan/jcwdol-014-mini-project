import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Button,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function CardMenu() {
  return (
    <Center>
      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        my="10"
      >
        <Card>
          <CardHeader>
            <Heading size="md"> Event dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Link href={'/event-dashboard'}>
              <Button>View here</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Attendee dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Transaction dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size="md"> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              View a summary of all your customers over the last month.
            </Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </Center>
  );
}

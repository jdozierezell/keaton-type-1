import React from 'react'
import { ChakraProvider, Box, Container, Flex, VStack } from '@chakra-ui/react'
import Form from '../components/form'

const IndexPage = () => {
	return (
		<ChakraProvider>
			<Container maxW="container.xl" p={4}>
				<Flex h="100vh" py={20}>
					<VStack
						w="full"
						h="full"
						p={10}
						spacing={10}
						alignItems="flex-start"
					></VStack>
					<VStack
						w="full"
						h="full"
						p={10}
						spacing={10}
						alignItems="flex-start"
						bg="gray.50"
					></VStack>
				</Flex>
				{/* <Form /> */}
			</Container>
		</ChakraProvider>
	)
}

export default IndexPage

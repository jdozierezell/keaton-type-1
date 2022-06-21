import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Form from '../components/form'

const IndexPage = () => {
	return (
		<ChakraProvider>
			<Box p={4}>
				<Form />
			</Box>
		</ChakraProvider>
	)
}

export default IndexPage

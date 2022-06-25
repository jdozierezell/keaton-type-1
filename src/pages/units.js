import React, { useState } from 'react'
import { ChakraProvider, Box, Container, Flex, VStack } from '@chakra-ui/react'
import Form from '../components/form'
import UnitDisplay from '../components/unitDisplay'

const IndexPage = () => {
	const [units, setUnits] = useState(0)
	const onSubmit = values => {
		const sugarCorrection = (values.sugar - 120) / 140
		const carbCorrection = values.carbs / 40
		const unitsPrecise = sugarCorrection + carbCorrection
		const unitsRounded = Math.round(-Math.round(-unitsPrecise * 10) / 10)
		setUnits(unitsRounded)
	}
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
					>
						<Form onSubmit={onSubmit} units={units} />
					</VStack>
					<VStack
						w="full"
						h="full"
						p={10}
						spacing={10}
						alignItems="flex-start"
						bg="gray.50"
					>
						<UnitDisplay />
					</VStack>
				</Flex>
			</Container>
		</ChakraProvider>
	)
}

export default IndexPage

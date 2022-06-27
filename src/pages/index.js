import React, { useState } from 'react'
import { ChakraProvider, Container, Flex, VStack } from '@chakra-ui/react'
import Form from '../components/form'
import UnitDisplay from '../components/unitDisplay'

const IndexPage = () => {
	const [units, setUnits] = useState(0)
	const [type, setType] = useState('sugarAndMeal')
	const onSubmit = values => {
		console.log(values)
		const sugarCorrection =
			type === 'meal' || values.sugar <= 120
				? 0
				: (values.sugar - 120) / 140
		const carbCorrection = type === 'sugar' ? 0 : values.carbs / 40
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
						<Form
							onSubmit={onSubmit}
							setType={setType}
							type={type}
						/>
					</VStack>
					<VStack
						w="full"
						h="full"
						p={10}
						spacing={10}
						alignItems="flex-start"
						bg="gray.50"
					>
						<UnitDisplay units={units} />
					</VStack>
				</Flex>
			</Container>
		</ChakraProvider>
	)
}

export default IndexPage

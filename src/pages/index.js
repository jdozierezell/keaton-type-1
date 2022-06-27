import React, { useState } from 'react'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import Form from '../components/form'
import UnitDisplay from '../components/unitDisplay'
import theme from '../@chakra-ui/gatsby-plugin/theme'

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
	console.log(theme)
	return (
		<Container maxW="container.xl" p={0}>
			<Grid
				templateRows={{ base: '1fr 1fr', md: '1fr' }}
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				gridGap={2}
				minH="100vh"
			>
				<GridItem p={8} maxW="100vw">
					<Form onSubmit={onSubmit} setType={setType} type={type} />
				</GridItem>
				<GridItem bg="gray.100" p={8}>
					<UnitDisplay units={units} />
				</GridItem>
			</Grid>
		</Container>
	)
}

export default IndexPage

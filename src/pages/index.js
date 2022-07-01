import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Container, Grid, GridItem } from '@chakra-ui/react'
import Form from '../components/chakra-ui/form'
import UnitDisplay from '../components/chakra-ui/unitDisplay'

const IndexPage = ({ data: { variable } }) => {
	const [units, setUnits] = useState(0)
	const [type, setType] = useState('sugarAndMeal')
	const {
		carbohydrateRatio,
		correctionFactor,
		idealBloodSugar,
		longLastingInsulinUnitDose,
	} = variable
	const onSubmit = values => {
		console.log(values)
		const sugarCorrection =
			type === 'meal' || values.sugar <= 120
				? 0
				: (values.sugar - idealBloodSugar) / correctionFactor
		const carbCorrection =
			type === 'sugar' ? 0 : values.carbs / carbohydrateRatio
		const unitsPrecise =
			type === 'long'
				? longLastingInsulinUnitDose
				: sugarCorrection + carbCorrection
		const unitsRounded = Math.round(-Math.round(-unitsPrecise * 10) / 10)
		setUnits(unitsRounded)
	}
	console.log(variable)
	return (
		<Container maxW="container.xl" p={0}>
			<Grid
				templateRows={{ base: '1fr 1fr', md: '1fr' }}
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				minH="100vh"
			>
				<GridItem p={8} maxW="100vw" bg="green.500">
					<Form
						onSubmit={onSubmit}
						setType={setType}
						variable={variable}
					/>
				</GridItem>
				<GridItem p={8} bg="pink.300">
					<UnitDisplay units={units} />
				</GridItem>
			</Grid>
		</Container>
	)
}

export default IndexPage

export const query = graphql`
	query {
		variable: datoCmsVariable {
			carbohydrateRatio
			correctionFactor
			idealBloodSugar
			longLastingInsulinUnitDose
		}
	}
`

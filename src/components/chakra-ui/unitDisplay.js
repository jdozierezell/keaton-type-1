import React from 'react'
import { Box, Divider, Heading, Text } from '@chakra-ui/react'

const UnitDisplay = ({ units }) => {
	return (
		<Box>
			<Heading>Units Needed</Heading>
			<Text mt={4}>
				These are the units of insulin to give rounded to the nearest
				whole unit.
			</Text>
			<Divider my={8} borderColor="gray.500" />
			<Heading as="h3">{units}</Heading>
		</Box>
	)
}

export default UnitDisplay

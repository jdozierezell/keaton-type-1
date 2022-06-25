import React from 'react'
import { useForm } from 'react-hook-form'
import {
	VStack,
	Flex,
	Heading,
	Text,
	FormErrorMessage,
	FormLabel,
	FormControl,
	NumberInput,
	NumberInputField,
	Button,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
	.object({
		sugar: yup
			.number()
			.typeError('Blood sugar must be a number.')
			.positive('The value of sugar must be positive.')
			.integer('Blood sugar must be an integer.')
			.required('Blood sugar is required.'),
		carbs: yup
			.number()
			.typeError('Carbohydrates must be a number.')
			.positive('The value of carbohydrates must be positive.')
			.integer('Carbohydrates must be an integer.')
			.required('Carbohydrates is required.'),
	})
	.required()

const Form = ({ onSubmit, units }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	})
	return (
		<VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
			<Heading as="h2">Calculate Units</Heading>
			<Text>
				Enter blood sugar and carbohydrate values below to calculate the
				units of insulin needed.
			</Text>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex minW="max-content" gap="8">
					<FormControl isInvalid={errors.sugar}>
						<FormLabel htmlFor="name">
							Current Blood Sugar
						</FormLabel>
						<NumberInput>
							<NumberInputField
								id="sugar"
								placeholder="Blood Sugar"
								{...register('sugar')}
							/>
						</NumberInput>
						<FormErrorMessage>
							{errors.sugar && errors.sugar.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.carbs}>
						<FormLabel htmlFor="name">
							Carbohydrates in Meal
						</FormLabel>
						<NumberInput>
							<NumberInputField
								id="carbs"
								placeholder="Carbohydrates"
								{...register('carbs')}
							/>
						</NumberInput>
						<FormErrorMessage>
							{errors.carbs && errors.carbs.message}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				{units}
				<Button
					mt={4}
					colorScheme="teal"
					variant="outline"
					rightIcon={<ArrowForwardIcon />}
					isLoading={isSubmitting}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</VStack>
	)
}

export default Form

import React from 'react'
import { useForm } from 'react-hook-form'
import {
	Box,
	Button,
	ButtonGroup,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Icon,
	NumberInput,
	NumberInputField,
	Text,
} from '@chakra-ui/react'
import { FaUndo, FaBriefcaseMedical } from 'react-icons/fa'
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

const Form = ({ onSubmit }) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			sugar: '',
			carbs: '',
		},
	})
	return (
		<Box>
			<Heading as="h2">Calculate Units</Heading>
			<Text my={4}>
				Enter blood sugar and carbohydrate values below to calculate the
				units of insulin needed.
			</Text>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Flex minW="max-content" gap="8" direction="column">
					<FormControl isInvalid={errors.sugar}>
						<FormLabel htmlFor="sugar">
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
						<FormLabel htmlFor="carbs">
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
				<ButtonGroup variant="outline" spacing={6} mt={8}>
					<Button
						leftIcon={<Icon as={FaUndo} />}
						onClick={() => {
							reset()
						}}
					>
						Reset
					</Button>
					<Button
						rightIcon={<Icon as={FaBriefcaseMedical} />}
						isLoading={isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</ButtonGroup>
			</form>
		</Box>
	)
}

export default Form

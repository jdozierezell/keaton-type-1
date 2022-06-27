import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
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
	Input,
	NumberInput,
	NumberInputField,
	Select,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { FaUndo, FaBriefcaseMedical } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
	sugar: yup.mixed().when('type', {
		is: type => type !== 'meal',
		then: yup
			.number()
			.typeError('Blood sugar must be a number.')
			.positive('The value of sugar must be positive.')
			.integer('Blood sugar must be an integer.')
			.required('Blood sugar is required.'),
	}),
	// carbs: yup
	// 	.mixed()
	// 	.when('type', {
	// 		is: type => type !== 'sugar',
	// 		then: yup
	// 			.number()
	// 			.typeError('Carbohydrates must be a number.')
	// 			.positive('The value of carbohydrates must be positive.')
	// 			.integer('Carbohydrates must be an integer.')
	// 			.required('Carbohydrates is required.'),
	// 	})
	// 	.required(),
})

const Form = ({ onSubmit, setType, type }) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			sugar: '',
			carbs: '',
			test: '',
			type: 'sugarAndMeal',
		},
	})
	return (
		<Box>
			<Heading as="h2">Calculate Units</Heading>
			<Text my={4}>
				Enter blood sugar and carbohydrate values below to calculate the
				units of insulin needed.
			</Text>
			<form onSubmit={handleSubmit(onSubmit)} id="calculate-form">
				<Flex minW="max-content" gap="8" direction="column">
					<Select
						{...register('type')}
						onChange={e => {
							setType(e.target.value)
						}}
					>
						<option value="sugarAndMeal">
							Sugar and Meal Correction
						</option>
						<option value="sugar">Sugar Correction Only</option>
						<option value="meal">Meal Correction Only</option>
					</Select>
					<Controller
						control={control}
						name="test"
						id="test"
						render={({ field, formState }) => <Input {...field} />}
					/>
					<Controller
						control={control}
						name="sugar"
						id="sugar"
						render={({
							field: { onChange, onBlur, value, ref },
							formState,
						}) => (
							<Tooltip
								label={errors.sugar ? errors.sugar.message : ''}
								placement="right"
								hasArrow
								isOpen
								sx={{
									'--tooltip-bg': 'red.500',
								}}
							>
								<Input
									type="number"
									value={value}
									onChange={onChange}
									placeholder="Blood Sugar"
									isInvalid={errors.sugar}
									sx={{
										'&[aria-invalid=true]:focus-visible': {
											borderColor: 'red.500',
											boxShadow: '0 0 0 1px red.500',
										},
									}}
								/>
							</Tooltip>
						)}
					/>
					{/* <p>{errors.sugar ? errors.sugar.message : ''}</p> */}
					{/* <FormControl
						isInvalid={errors.sugar}
						isDisabled={type === 'meal' ? true : false}
					>
						<FormLabel htmlFor="sugar">
							Current Blood Sugar
						</FormLabel>
						<NumberInput>
							<NumberInputField
								id="sugar"
								placeholder="Blood Sugar"
								{...register('sugar')}
								// override focus style to keep red border on error
								sx={{
									'&[aria-invalid=true]:focus-visible': {
										borderColor: 'red.500',
										boxShadow: '0 0 0 1px red.500',
									},
								}}
							/>
						</NumberInput>
						<FormErrorMessage>
							{errors.sugar && errors.sugar.message}
						</FormErrorMessage>
					</FormControl> */}
					<FormControl
						isInvalid={errors.carbs}
						isDisabled={type === 'sugar' ? true : false}
					>
						<FormLabel htmlFor="carbs">
							Carbohydrates in Meal
						</FormLabel>
						<NumberInput>
							<NumberInputField
								id="carbs"
								placeholder="Carbohydrates"
								{...register('carbs')}
								// override focus style to keep red border on error
								sx={{
									'&[aria-invalid=true]:focus-visible': {
										borderColor: 'red.500',
										boxShadow: '0 0 0 1px red.500',
									},
								}}
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
							reset({
								sugar: '',
								carbs: '',
								type: 'sugarAndMeal',
								test: '',
							})
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

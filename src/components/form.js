import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Flex,
	FormLabel,
	Heading,
	Icon,
	Input,
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
	carbs: yup.mixed().when('type', {
		is: type => type !== 'sugar',
		then: yup
			.number()
			.typeError('Carbohydrates must be a number.')
			.positive('The value of carbohydrates must be positive.')
			.integer('Carbohydrates must be an integer.')
			.required('Carbohydrates is required.'),
	}),
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
			<Divider my={8} />
			<form onSubmit={handleSubmit(onSubmit)} id="calculate-form">
				<FormLabel htmlFor="type" my={8}>
					Correction Type
					<Select
						{...register('type')}
						mt={2}
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
				</FormLabel>
				<Controller
					control={control}
					name="sugar"
					id="sugar"
					render={({ field: { onChange, value }, formState }) => (
						<FormLabel htmlFor="sugar" my={8}>
							Current Blood Sugar
							<Tooltip
								label={errors.sugar ? errors.sugar.message : ''}
								placement="right"
								hasArrow
								isOpen
								sx={{ '--tooltip-bg': 'colors.red.500' }}
							>
								<Input
									type="number"
									value={value}
									onChange={onChange}
									placeholder="Blood Sugar"
									isInvalid={errors.sugar}
									mt={2}
									sx={{
										'&[aria-invalid=true]:focus-visible': {
											borderColor: 'red.500',
											boxShadow: '0 0 0 1px red.500',
										},
									}}
								/>
							</Tooltip>
						</FormLabel>
					)}
				/>
				<Controller
					control={control}
					name="carbs"
					id="carbs"
					render={({ field: { onChange, value }, formState }) => (
						<FormLabel htmlFor="carbs" my={8}>
							Carbohydrates in Meal
							<Tooltip
								label={errors.carbs ? errors.carbs.message : ''}
								placement="right"
								hasArrow
								isOpen
								sx={{ '--tooltip-bg': 'colors.red.500' }}
							>
								<Input
									type="number"
									value={value}
									onChange={onChange}
									placeholder="Carbohydrates"
									isInvalid={errors.carbs}
									mt={2}
									sx={{
										'&[aria-invalid=true]:focus-visible': {
											borderColor: 'red.500',
											boxShadow: '0 0 0 1px red.500',
										},
									}}
								/>
							</Tooltip>
						</FormLabel>
					)}
				/>
				<ButtonGroup variant="outline" spacing={6} mt={8}>
					<Button
						leftIcon={<Icon as={FaUndo} />}
						onClick={() => {
							reset({
								sugar: '',
								carbs: '',
								type: 'sugarAndMeal',
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

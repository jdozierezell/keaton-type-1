import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	FormLabel,
	Heading,
	Icon,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Select,
	Text,
	Tooltip,
} from '@chakra-ui/react'
import { FaBriefcaseMedical, FaInfoCircle, FaUndo } from 'react-icons/fa'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
	sugar: yup.mixed().when('type', {
		is: type => type !== 'meal' && type !== 'long',
		then: yup
			.number()
			.typeError('Blood sugar must be a number.')
			.positive('The value of sugar must be positive.')
			.integer('Blood sugar must be an integer.')
			.required('Blood sugar is required.'),
	}),
	carbs: yup.mixed().when('type', {
		is: type => type !== 'sugar' && type !== 'long',
		then: yup
			.number()
			.typeError('Carbohydrates must be a number.')
			.positive('The value of carbohydrates must be positive.')
			.integer('Carbohydrates must be an integer.')
			.required('Carbohydrates is required.'),
	}),
})

const Form = ({ onSubmit, setType, variable }) => {
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
	console.log(variable)
	return (
		<Box
			sx={{
				'--chakra-colors-chakra-border-color': 'black',
				'.chakra-select:hover, .chakra-input:hover': {
					borderColor: 'purple.500',
				},
				'.chakra-select:focus, .chakra-input:focus': {
					borderColor: 'purple.500',
					boxShadow: '0 0 0 1px purple.500',
				},
			}}
		>
			<Heading as="h2">
				Calculate Units{' '}
				<Popover hasArrow placement="right-end" trigger="hover">
					<PopoverTrigger>
						<span>
							<Icon as={FaInfoCircle} boxSize={6} ml={4} />
						</span>
					</PopoverTrigger>
					<PopoverContent bg="gray.800" color="white" p={2}>
						<PopoverArrow bg="gray.800" />
						<PopoverHeader fontSize={15}>
							Curious about how this is calculated?
						</PopoverHeader>
						<PopoverBody fontSize={15} fontWeight={400}>
							It's simple (sort of).
							<br />
							<br />
							To figure out the sugar correction needed, just take
							the current blood sugar, subtract{' '}
							{variable.idealBloodSugar}, and divide that number
							by {variable.correctionFactor}.
							<br />
							<br />
							For the meal correction, divide the number of
							carbohydrates in the meal by{' '}
							{variable.carbohydrateRatio}.
							<br />
							<br />
							If you're calculating both, just add those two
							together.
							<br />
							<br />
							No calculation is needed for the long-lasting
							insulin. It'll always be{' '}
							{variable.longLastingInsulinUnitDose}.
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</Heading>
			<Text my={4}>
				Enter blood sugar and carbohydrate values below to calculate the
				units of insulin needed.
			</Text>
			<Divider my={8} borderColor="gray.500" />
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
						<option value="long">Long-Lasting Insulin Dose</option>
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
									_placeholder={{ color: 'purple.600' }}
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
									_placeholder={{ color: 'purple.600' }}
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
				<ButtonGroup
					variant="outline"
					spacing={6}
					mt={8}
					colorScheme="purple"
				>
					<Button
						leftIcon={<Icon as={FaUndo} />}
						onClick={() => {
							reset({
								sugar: '',
								carbs: '',
								type: 'sugarAndMeal',
							})
						}}
						_hover={{ backgroundColor: 'pink.400' }}
					>
						Reset
					</Button>
					<Button
						rightIcon={<Icon as={FaBriefcaseMedical} />}
						isLoading={isSubmitting}
						type="submit"
						_hover={{ backgroundColor: 'pink.400' }}
					>
						Submit
					</Button>
				</ButtonGroup>
			</form>
		</Box>
	)
}

export default Form

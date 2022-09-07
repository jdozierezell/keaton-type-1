import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import styled from '@emotion/styled'
import theme from './src/@chakra-ui/gatsby-plugin/theme'

const Wrapper = styled('div')`
	background-color: black;
`

export const wrapPageElement = ({ element }) => {
	return (
		<Wrapper>
			<ChakraProvider theme={theme} resetCSS>
				{element}
			</ChakraProvider>
		</Wrapper>
	)
}

export const onServiceWorkerUpdateReady = () => {
	const answer = window.confirm(
		`This application has been updated. ` +
			`Reload to display the latest version?`
	)
	if (answer === true) {
		window.location.reload()
	}
}

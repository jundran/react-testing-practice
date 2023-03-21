import { useState } from 'react'

export default function App () {
	const [heading, setHeading] = useState('Magnificent Monkeys')

	function clickHandler () {
		setHeading('Radical Rhinos')
	}

	return (
		<>
			<h1>{heading}</h1>
			<h2>Our first test</h2>
			<button type="button" onClick={clickHandler}>Click Me</button>
		</>
	)
}

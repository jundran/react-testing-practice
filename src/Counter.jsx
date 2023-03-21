import { useState } from 'react'
export default function Counter () {
	const [counter, setCounter] = useState(0)

	const increment = () => setCounter(prevCounter => ++prevCounter)

	const decrement = () => setCounter(prevCounter => --prevCounter)

	return (
		<div>
			<h2 data-testid="counter">{counter}</h2>
			<button onClick={decrement}>Decrement</button>
			<button onClick={increment}>Increment</button>
		</div>
	)
}

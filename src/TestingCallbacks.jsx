import { useState } from 'react'
import Input from './Input'

export default function TestingCallbacks () {
	const [inputValue, setInputValue] = useState('')

	const handleChange = (event) => {
		setInputValue(event.target.value)
	}

	return (
		<div>
			<Input handleChange={handleChange} inputValue={inputValue} />
		</div>
	)
}

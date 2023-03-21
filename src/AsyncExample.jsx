import { useState, useEffect } from 'react'
import User from './User'
export default function App () {
	const [user, setUser] = useState(null)
	const [error, setError] = useState('')

	useEffect(() => {
		// This is replaced by mock function in test
		fetch('https://jsonplaceholder.typicode.com/users/1')
			.then((response) => response.json())
			.then((user) => setUser(user))
			.catch((error) => setError(error.message))
	}, [])

	if (error) {
		return <span>{error}</span>
	}

	return <div>{user ? <User user={user} /> : <span>Loading...</span>}</div>
}

/* global vi describe it test expect beforeEach */
// import { describe, it, expect } from 'vitest' -- not needed due to globals: true in vite config
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'fs'

import App from '../src/App'
import List from '../src/List'
import AsyncExample from '../src/AsyncExample'
import Counter from '../src/Counter'
import TestingCallbacks from '../src/TestingCallbacks'
import Input from '../src/Input'
import FavouriteInput from '../src/FavouriteInput'

// Mock Fetch - will replace calls to fetch in AsyncExample.jsx
window.fetch = vi.fn(() => {
	const user = { name: 'Jack', email: 'jack@email.com' }
	return Promise.resolve({
		json: () => Promise.resolve(user)
	})
})

describe('something truthy and falsy', () => {
	it('true to be true', () => {
		expect(true).toBe(true)
	})

	it('false to be false', () => {
		expect(false).toBe(false)
	})
})

describe('App component', () => {
	it('renders correct heading', () => {
		render(<App />)
		expect(screen.getAllByRole('heading')[1].textContent)
			.toMatch(/our first test/i)
	})

	it('renders magnificent monkeys', () => {
		// Since screen does not have the container property, destructure render to obtain container for this test
		const { container } = render(<App />)
		expect(container).toMatchSnapshot()
		// After running this test, change App.jsx and it will fail
		// Press u in terminal to update snapshot
	})

	it('inline snapshot', () => {
		// Delete html then see how test injects code into the editor
		const { container } = render(<App />)
		expect(container).toMatchInlineSnapshot(`
			<div>
			  <h1>
			    Magnificent Monkeys
			  </h1>
			  <h2>
			    Our first test
			  </h2>
			  <button
			    type="button"
			  >
			    Click Me
			  </button>
			</div>
		`)
	})

	// Used for visual regression testing which checks what the user will see after any code changes have been executed by comparing screenshots taken before and after code changes.
	it('image snapshot', () => {
		// File path from root
		expect(readFileSync('public/favicon.png')).toMatchImageSnapshot()
	})

	it('renders radical rhinos after button click', async () => {
		render(<App />)
		const button = screen.getByRole('button', { name: 'Click Me' })
		await userEvent.setup().click(button)
		expect(screen.getAllByRole('heading')[0].textContent).toMatch(/radical rhinos/i)
	})
})

describe('Lists', () => {
	it('list contains 5 animals', () => {
		render(<List />)
		const listElement = screen.getByRole('list')
		const listItems = screen.getAllByRole('listitem')
		expect(listElement).toBeInTheDocument()
		expect(listElement).toHaveClass('animals')
		expect(listItems.length).toEqual(5)
	})
})

describe('AsyncExample', () => {
	test('loading text is shown while API request is in progress', async () => {
		render(<AsyncExample />)
		const loading = screen.getByText('Loading...')
		expect(loading).toBeInTheDocument()
		// Prevent test from finishing until element is removed from DOM - when promise resolves or rejects
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
	})

	test('user\'s name is rendered', async () => {
		render(<AsyncExample />)
		const userName = await screen.findByText('Jack')
		expect(userName).toBeInTheDocument()
	})

	test('error message is shown', async () => {
		// Force API request to fail
		window.fetch.mockImplementationOnce(() => {
			return Promise.reject({ message: 'API is down' })
		})
		render(<AsyncExample />)
		const errorMessage = await screen.findByText('API is down')
		expect(errorMessage).toBeInTheDocument()
		screen.debug()
	})
})

// Don't forget that userEvent is async
describe('Counter', () => {
	test('counter is incremented on increment button click', async () => {
		render(<Counter />)
		const counter = screen.getByTestId('counter') // h2
		const incrementBtn = screen.getByText('Increment')
		await userEvent.click(incrementBtn)
		await userEvent.click(incrementBtn)
		expect(counter.textContent).toEqual('2')
	})

	test('counter is decremented on decrement button click', async () => {
		render(<Counter />)
		const counter = screen.getByTestId('counter')
		const decrementBtn = screen.getByText('Decrement')
		await userEvent.click(decrementBtn)
		await userEvent.click(decrementBtn)
		expect(counter.textContent).toEqual('-2')
	})
})

describe('Callbacks', () => {
	test('input value is updated correctly', async () => {
		render(<TestingCallbacks />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, 'React')
		expect(input.value).toBe('React')
	})

	test('call the callback every time input value is changed', async () => {
		const handleChange = vi.fn() // mock
		render(<Input handleChange={handleChange} inputValue="" />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, 'React')
		expect(handleChange).toHaveBeenCalledTimes(5)
	})
})

describe('Favourite Input', () => {
	let onChangeMock, input
	beforeEach(() => {
		onChangeMock = vi.fn()
		render(<FavouriteInput onChange={onChangeMock} />)
		input = screen.getByRole('textbox')
	})

	it('calls onChange correct number of times', async () => {
		await userEvent.type(input, 'Lion')
		expect(onChangeMock).toHaveBeenCalledTimes(4)
	})

	it('calls onChange with correct argument(s) on each input', async () => {
		await userEvent.type(input, 'Ox')
		expect(onChangeMock).toHaveBeenNthCalledWith(1, 'O')
		expect(onChangeMock).toHaveBeenNthCalledWith(2, 'Ox')
	})

	it('input has correct values', async () => {
		await userEvent.type(input, 'Whale')
		expect(input).toHaveValue('Whale')
	})
})

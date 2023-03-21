/* global expect afterEach */
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)
expect.extend({ toMatchImageSnapshot })

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
	cleanup()
})

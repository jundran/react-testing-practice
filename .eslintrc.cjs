module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime'
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true
		}
	},
	'plugins': [
		'react'
	],
	'settings': {
		'react': {
			'version': 'detect'
		}
	},
	'rules': {
		'indent': ['error','tab',{ 'SwitchCase': 1 }],
		'linebreak-style': ['error','unix'],
		'quotes': ['error','single'],
		'semi': ['error','never'],
		'keyword-spacing': ['error',{ 'before': true, 'after': true }],
		'func-call-spacing': ['error','never'],
		'space-before-function-paren': ['error','always'],
		'eol-last': ['error','always'],
		'comma-dangle': ['error','never'],
		'no-trailing-spaces': 'error',
		'no-unused-vars': 'warn',

		// React
		'react/prop-types': 'off',
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error'
	}
}

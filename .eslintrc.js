module.exports = {
	env: {
		browser: true,
		'react-native/react-native': true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['react', 'react-native'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
		'react-native/no-inline-styles': 1,
		'react-native/no-color-literals': 1,
		'no-mixed-spaces-and-tabs': 0,
		'no-unsafe-optional-chaining': 'off',
		'react/no-unescaped-entities': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};

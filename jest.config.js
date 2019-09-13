module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
		'ts',
		'js',
		'json'
	],
	transform: {
		'^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
	},
	testMatch: [
		'**/test/**/*.test.(ts|js)'
	],
	testEnvironment: 'node',
	reporters: [
		"default",
		["./node_modules/jest-html-reporter", {
			pageTitle: `Express Typescript Mongodb Starter Test Report`,
			outputPath: "./TestReport/index.html"
		}]
	]
};

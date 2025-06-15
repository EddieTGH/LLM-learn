/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"./index.html",
		"./js/**/*.js",
		"./api/**/*.js"
	],
	theme: {
		extend: {
			colors: {
				primary: "#000"
			}
		},
	},
	plugins: [],
}


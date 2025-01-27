/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	important: '#root',
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			colors: {
				primary: '#F8F368',
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

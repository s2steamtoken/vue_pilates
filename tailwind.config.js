/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		screens: {
			default: '0',
			xs: '0',
			sm: '501px',
			md: '769px',
			lg: '1025px',
			xl: '1441px'
		},
		container: {
			center: true,
		},
		extend: {
			transform: {
				'cardRotate': 'rotate3d(-0.8, 4, 1, 20deg)',
			},
			top: {
				'50%_0.32rem': 'calc(50% + 0.32rem)',
			},
			left: {
				'50%_0.32rem': 'calc(50% + 0.32rem)',
			},
			colors: {
				primary: '#e2066d',
				primaryDark: '#B5767A',
				secondary: '#234C4C',
				default: '#2F3838',
				gray: '#A3B0B0',
				grayLight: '#666666',
				'gray-300': '#919EAB',
				whiteDark: '#F3F3F3',
				'white-500': '#e1e6ea',
				white: '#fff',
				black: '#121515',
				transparent: 'transparent'
			},
			backgroundImage: {
				pincGradient: 'linear-gradient(114deg, #E5ADB0 68.44%, #FFD2D5 78.83%, #E5ADB0 84.08%)',
				whiteHover: 'linear-gradient(to right, white 0%, white 100%)',
			},
			boxShadow: {
				'all': '0 0.63rem 0.93rem 0.63rem rgba(0, 0, 0, 0.3)',
			},
			spacing: {
				'0': '0',
			},
			animation: {
				'width': 'widthAnimation 300ms linear',
				'widthReverse': 'widthReverseAnimation 300ms linear',
			},
			keyframes: {
				widthAnimation: {
					'0%': { width: 0 },
					'100%': { width: '100%' },
				},
				widthReverseAnimation: {
					'0%': { width: '100%' },
					'100%': { width: 0 },
				},
			}
		}
	},
	plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: { extend: {} },
	daisyui: {
		themes: [
			{
				theme: {
					"primary": "#75DBCD",
					"secondary": "#003566",
					"accent": "#218275",
					"neutral": "#002D52",
					"base-100": "#001427",
					"info": "#38A1C7",
					"success": "#06BA63",
					"warning": "#F2CB07",
					"error": "#FF220C"
				}
			}
		]
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui"),
		require("tailwind-scrollbar")({ nocompatible: true })
	]
};

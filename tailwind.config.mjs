/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['DM Sans Variable', ...defaultTheme.fontFamily.sans],
				mono: ['DM Mono', ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [typography],
};

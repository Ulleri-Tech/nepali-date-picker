// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	// server: {
	// 	fs: {
	// 		allow: ['nepali-date-picker']
	// 	}
	// }
};

export default config;
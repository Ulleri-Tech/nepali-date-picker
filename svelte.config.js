import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		package: {
			dir: 'nepali-date-picker'
		},
		vite: {
			server: {
				fs: {
					allow: ['nepali-date-picker']
				}
			}
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

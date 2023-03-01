import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// hydrate the <div id="svelte"> element in src/app.html
	kit: {
		adapter: adapter()
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

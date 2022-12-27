import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// hydrate the <div id="svelte"> element in src/app.html
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	},
	package: {
		source: 'src/lib',
		dir: 'nepali-date-picker',
		emitTypes: true,
		// excludes all .d.ts and files starting with _ as the name
		exports: (filepath) => !/^_|\/_|\.d\.ts$/.test(filepath),
		files: () => true
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

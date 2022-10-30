import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// hydrate the <div id="svelte"> element in src/app.html
	kit: {
		adapter: adapter()
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

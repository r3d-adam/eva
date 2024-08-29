import * as nodePath from 'path';
/* global app */

export const server = () => {
	let options = {
		server: {
			baseDir: `${app.path.build.html}`,
		},
		notify: false,
		port: 3000,
		browser: 'J:\\_w\\custom_scripts\\chrome_incognito.lnk',
	};

	const getLocalProxy = () => {
		const isLocal = !!(app.path.rootPathAbsolute.indexOf(app.path.localServerRootPath) + 1);

		let localProxy = '';

		if (isLocal) {
			localProxy = app.path.rootPathAbsolute.replace(app.path.localServerRootPath, '');

			localProxy += app.path.buildFolder;

			// console.log(localProxy);

			localProxy = nodePath.normalize(localProxy);
			localProxy = localProxy.replaceAll('\\', '/');

			// console.log(localProxy);
			return localProxy;
		}

		return 0;
	};
	// console.log(app.path.localServerRootPath);

	const localProxy = getLocalProxy();
	// console.log(localProxy);
	// console.log(app.options);

	if (localProxy && app.options.useLocalServer) {
		options = {
			notify: false,
			port: 80, // default local server port
			proxy: localProxy + '/',
			browser: 'J:\\_w\\custom_scripts\\chrome_incognito.lnk',
		};
	}

	// console.log(isLocal);

	app.plugins.browsersync.init(options);
};

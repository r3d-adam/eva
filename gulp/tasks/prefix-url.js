import prefix from 'gulp-url-prefixer';

export const prefixUrl = () => {
	const p = '/eva';

	return app.gulp
		.src(app.path.build.html + '*.html')
		.pipe(
			prefix.html({
				prefix: p,
			}),
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.gulp.src(app.path.build.css + '*.css'))
		.pipe(app.plugins.replace(/url\(("|')?\/\.\./g, `url($1./..`))
		.pipe(app.plugins.replace(/url\(("|')?\/([^.])/g, `url($1${p}/$2`))
		.pipe(app.gulp.dest(app.path.build.css));
};

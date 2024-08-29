import svgSpritePlugin from 'gulp-svg-sprite';
/* global app */

export const svgSprite = () => {
	return app.gulp
		.src(app.path.src.svgicons, { encoding: false })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SVG SPRITE',
					message: 'Error: <%= error.message %>',
				}),
			),
		)

		.pipe(
			svgSpritePlugin({
				mode: {
					stack: {
						sprite: `../icons/icons.svg`,
						// demo page
						example: true,
					},
				},
				shape: {
					spacing: {
						// Spacing related options
						padding: 1, // Padding around all shapes
						box: 'padding', // Padding strategy (similar to CSS `box-sizing`)
					},
				},
			}),
		)
		.pipe(app.gulp.dest(app.path.build.img));
};

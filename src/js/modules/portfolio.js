import mixitup from 'mixitup';
// import PhotoSwipeLightbox from 'photoswipe/lightbox';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.umd.js';
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.umd.js';

/* -------------------------------------------------------------------------- */
/*                                  PORTFOLIO                                 */
/* -------------------------------------------------------------------------- */
export default function portfolioGallery(args = {}) {
	const { AOS = null } = args;

	const mixer = mixitup('.portfolio__list', {
		selectors: {
			target: '.portfolio__category',
		},
		animation: {
			// queue: false,
			// duration: 300,
			// effects: 'fade translateZ(-100px)',
			// effects: 'rotateY(-25deg)',
			// animateResizeContainer: false,
			// // perspectiveDistance: '2000px',
			// animateResizeTargets: true,
			clampHeight: false, // выключаем для плавной анимации (иначе будет дёргаться последняя строка)
			// nudge: false,
		},
	});

	document.addEventListener('mixEnd', () => {
		// console.log('mixEnd');
		if (AOS) {
			AOS.refresh();
		}
	});

	const setupThumbnails = () => {
		document.querySelectorAll('.portfolio__img').forEach((item) => {
			const backgroundImageUrl = item.style.backgroundImage.match(
				/url\((?:'|")?(.*?)(?:'|")?\)/,
			);
			if (backgroundImageUrl && backgroundImageUrl[1]) {
				item.closest('.portfolio__img-wrap').setAttribute(
					'data-external-thumb-image',
					backgroundImageUrl[1],
				);
			}
		});
	};

	setupThumbnails();

	const $galleryContainer = document.querySelector('.portfolio__list');

	// console.log($galleryContainer);
	// console.log(lightGallery);
	lightGallery($galleryContainer, {
		speed: 500,
		controls: false,
		selector: '.portfolio__img-wrap',
		plugins: [lgZoom, lgThumbnail],
		download: false,
		exThumbImage: 'data-external-thumb-image',
	});
}

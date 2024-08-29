import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export default function testimonials() {
	const swiper = new Swiper('.testimonials__list-wrapper', {
		slidesPerView: 1,
		// autoHeight: true,

		spaceBetween: 10,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		modules: [Navigation, Pagination],
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 5,
			},
			// when window width is >= 480px
			576: {
				slidesPerView: 2,
				spaceBetween: 5,
			},
			// when window width is >= 640px
			768: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
		},
	});
}

export default function header() {
	// eslint-disable-next-line no-global-assign, no-restricted-globals
	scrollTo = (element) => {
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: element.offsetTop - 90,
		});
	};

	document.querySelectorAll('.header__menu-link, .js-scroll-to').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = e.target.getAttribute('href');
			let target;
			if (href === '#') {
				target = document.documentElement;
			} else {
				target = document.querySelector(href);
			}

			// eslint-disable-next-line no-restricted-globals
			scrollTo(target);
		});
	});

	// Cache your DOM elements
	const els = {
		navIcon: document.getElementById('js-nav-button'),
		nav: document.getElementById('js-nav'),
		// overlay: document.getElementById('js-overlay'),
		burgerLine: document.querySelector('.burger__line'),
	};

	function toggleMenu() {
		els.burgerLine.classList.toggle('burger__line--active');
		document.body.classList.toggle('overflow');
		// els.overlay.classList.toggle('site-overlay--visible');
		els.nav.classList.toggle('nav--visible');
	}

	// [els.navIcon, els.overlay]
	[els.navIcon].forEach((el) => {
		el.addEventListener('click', toggleMenu);
	});
}

import LocomotiveScroll from 'locomotive-scroll';

export default function animationsOnScroll() {
	const bgImg5 = document.querySelector('.background-img-item--5');
	const bgImg5OffsetY = window.scrollY + bgImg5.getBoundingClientRect().top;
	const wrapper = document.querySelector('.background-image-wrapper');

	const locomotiveScroll = new LocomotiveScroll({
		// scrollCallback: onScroll,
	});

	window.addEventListener('servicesScrollEvent', (e) => {
		const { target, way } = e.detail;

		const elementInnerHTML = target.innerHTML;
		const num = +elementInnerHTML.match(/(\d+)/g);
		const excludeNum = elementInnerHTML.replace(`${num}`, '');

		const animationTime = 2000;
		let timeout = Math.floor(animationTime / num);

		let numStep = 1;

		if (timeout < 1000 / 24) {
			timeout = Math.round(1000 / 24);
			numStep = num / Math.floor(animationTime / timeout);
		}

		let currentNum = 0;

		const interval = setInterval(() => {
			currentNum = currentNum > num ? num : Math.floor(currentNum);
			target.innerHTML = currentNum + excludeNum;
			if (currentNum >= num) {
				clearInterval(interval);
			}
			currentNum += numStep;
		}, timeout);
	});

	const progressBar = document.querySelector('.about__progress-inner');
	const progressItems = document.querySelectorAll('.about__item');
	const progressItemsCount = progressItems.length;
	const progressStep = progressItemsCount ? 1 / (progressItemsCount + 1) : 1;

	window.addEventListener('progressEvent', (e) => {
		const { progress } = e.detail;

		const activeItems = Math.floor(progress / progressStep);

		progressItems.forEach((item) => item.classList.remove('about__item--active'));
		for (let i = 0; i < activeItems; i++) {
			if (progressItems[i]) {
				progressItems[i].classList.add('about__item--active');
			}
		}

		progressBar.style.width = `${progress * 100}%`;
	});
}

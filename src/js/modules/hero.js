export default function heroParallax(speed) {
	const getBackgroundImageSizeByElement = async (element) => {
		const backgroundImageRaw = window.getComputedStyle(element).backgroundImage;
		const backgroundImageUrl = backgroundImageRaw.match(/url\((?:'|")?(.*?)(?:'|")?\)/);
		// console.log(backgroundImageUrl[1]);

		return new Promise((resolve, reject) => {
			if (backgroundImageUrl && backgroundImageUrl[1]) {
				const img = new Image();

				const imgUrl = new URL(backgroundImageUrl[1]);
				// console.log(imgUrl.pathname);
				img.src = imgUrl.pathname;
				img.onload = function () {
					resolve({
						height: img.height,
						width: img.width,
					});
				};
			} else {
				resolve(0);
			}
		});
	};

	const calcImageCoverSize = (imageWidth, imageHeight, containerWidth, containerHeight) => {
		const imageRatio = imageWidth / imageHeight;
		const containerRation = containerWidth / containerHeight;

		let newImgWidth = containerWidth;
		let newImgHeight = newImgWidth / imageRatio;
		let bigSide = 'height';

		if (newImgHeight < containerHeight) {
			newImgHeight = containerHeight;
			newImgWidth = newImgHeight * imageRatio;
			bigSide = 'width';
		}

		return {
			width: newImgWidth,
			height: newImgHeight,
			bigSide,
		};
	};

	// speed 0-1; 1 = attach fixed
	// eslint-disable-next-line no-shadow
	const heroParallaxInit = async (speed) => {
		// console.log('heroParallax init');
		const heroElement = document.querySelector('.hero');

		const heroImgSize = await getBackgroundImageSizeByElement(heroElement);
		// console.log(heroImgSize);

		const heroHeight = parseInt(window.getComputedStyle(heroElement).height);
		const heroWidth = parseInt(window.getComputedStyle(heroElement).width);

		heroElement.style.setProperty('--speed', speed);

		const bgSize = calcImageCoverSize(
			heroImgSize.width,
			heroImgSize.height,
			heroWidth + (heroWidth - window.innerWidth) * speed,
			heroHeight + (heroHeight - window.innerHeight) * speed,
		);

		// console.log(bgSize);

		const recalc = ({ width, height, bigSide }) => {
			const imageRatio = width / height;
			let newWidth, newHeight;
			if (bigSide === 'width ') {
				newWidth = width + (window.innerWidth - heroWidth);
				newHeight = newWidth / imageRatio;
			} else {
				newHeight = height + (window.innerHeight - heroHeight);
				newWidth = newHeight * imageRatio;
			}

			bgSize.width = newWidth;
			bgSize.height = newHeight;
		};

		recalc(bgSize);

		const viewport = window.innerHeight;

		const getElementYPos = (el) => {
			return el.getBoundingClientRect().top + window.scrollY;
		};

		const calcBackgroundPos = (scrollY, bgSpeed, baseOffset) => scrollY * bgSpeed + baseOffset;

		const heroBaseOffset = calcBackgroundPos(-getElementYPos(heroElement), speed, 0) + 0;

		heroElement.classList.add('parallax--active');

		const bgWidth = bgSize.width + 35;
		heroElement.style.backgroundSize = `auto, ${bgWidth}px auto`;
		heroElement.style.backgroundPosition = `center, center ${heroBaseOffset}px`;

		const animationFrame = (e) => {
			const backgroundYOffset = calcBackgroundPos(window.scrollY, speed, heroBaseOffset);
			heroElement.style.backgroundPosition = `center, center ${backgroundYOffset}px`;
		};

		const animate = (event) => {
			if (window.requestAnimationFrame !== undefined) {
				window.requestAnimationFrame((e) => animationFrame(e));
			} else {
				animationFrame(event);
			}
		};

		let timeOutFunctionId;
		const onResize = () => {
			clearTimeout(timeOutFunctionId);
			// eslint-disable-next-line no-use-before-define
			timeOutFunctionId = setTimeout(initAfterResizeEnd, 500);
		};

		const initAfterResizeEnd = () => {
			document.removeEventListener('scroll', animate);
			window.removeEventListener('resize', onResize);
			heroParallaxInit(speed);
		};

		animationFrame();

		document.addEventListener('scroll', animate);
		window.addEventListener('resize', onResize);
	};

	heroParallaxInit(speed);
}

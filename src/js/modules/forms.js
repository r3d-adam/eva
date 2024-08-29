import validate from 'validate.js';
import IMask from 'imask';

export default function forms() {
	const constraints = {
		name: {
			presence: true,
		},
		phone: {
			presence: true,
			format: {
				pattern:
					/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
				message: 'Неверный формат номера телефона',
			},
		},
	};

	document.querySelectorAll('input[type="tel"]').forEach((input) => {
		IMask(input, {
			mask: '+{7}(000)000-00-00',
		});
	});

	document.querySelectorAll('form').forEach((form) => {
		form.addEventListener('submit', function (e) {
			e.preventDefault();

			let messageTarget = e.target.querySelector('button[type="submit"]');

			if (!messageTarget) {
				messageTarget = e.target.querySelector('button');
			}

			if (!messageTarget) {
				messageTarget = e.target;
			}

			const formData = new FormData(form);
			const validationErrors = validate(validate.collectFormValues(form), constraints);
			const isValid = !validationErrors;

			if (!isValid) {
				showMessage('Проверьте введенные данные', messageTarget, 'error');

				return;
			}

			fetch('mail.php', {
				body: formData,
				method: 'POST',
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					return response.json();
				})
				.then((json) => {
					// console.log(json);
					if (json.status === 'success') {
						showMessage(
							'Заявка отправлена! <br>Мы скоро с вами свяжемся',
							messageTarget,
						);
					} else {
						throw new Error('Ошибка отправки заявки');
					}
				})
				.catch((error) => {
					console.error(error);
					showMessage('Что-то пошло не так, попробуйте позже', messageTarget, 'error');
				})
				.finally(() => {
					form.reset();
				});
		});
	});

	function showMessage(message, target, type = 'success') {
		const div = document.createElement('div');
		div.className = `alert alert--${type}`;
		div.innerHTML = message;

		const targetPosY = target.getBoundingClientRect().bottom + window.scrollY;
		const windowCenterPosX = window.innerWidth / 2;

		const fadeAnimationDuration = 300;
		const messageDuration = 3000;

		const style = `
			top: ${targetPosY + 30}px;
			left: ${windowCenterPosX - 150}px;
			width: 300px;
			max-width: 100%;
			position: absolute;
			z-index: 1000;
			text-align: center;
			transition: all ${fadeAnimationDuration}ms ease-in;
		`;

		div.style.cssText = style;

		document.body.appendChild(div);

		setTimeout(() => {
			div.style.opacity = 0;
			setTimeout(() => {
				div.remove();
			}, fadeAnimationDuration);
		}, messageDuration);
	}
}

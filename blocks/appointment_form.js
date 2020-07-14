class AppointmentForm {
	constructor(showNextPage, isValidName, isValidPhone) {
		this.showNextPage = showNextPage;
		this.isValidName = isValidName;
		this.isValidPhone = isValidPhone;
		this.inputName = null;
		this.inputPhone = null;
		this.root = this.init();
	}

	init() {
		let wrapper = new Element('form').addClassNames('appointment__form', 'form');
		let group = new Element('div').addClassNames('form__group');
		let labelName = new Element('label').addClassNames('form__label').setFor('name').addText('Имя Отчество');
		let inputName = new Element('input').addClassNames('form__input').setId('name').setType('text').setPlaceholder('Иван Иванович').setRequired();
		let inputNameErrorMes = new Element('p').addClassNames('form__error-message', 'form__error-message_hidden').addText('Имя и отчество не должно содержать лишних знаков');
		let labelPhone = new Element('label').addClassNames('form__label').setFor('phone').addText('Номер телефона');
		let inputPhone = new Element('input').addClassNames('form__input').setId('phone').setType('tel').setPlaceholder('+7 999 123-45-67').setRequired();
		let inputPhoneErrorMes = new Element('p').addClassNames('form__error-message', 'form__error-message_hidden').addText('Телефон должен содержать только цифры и знак "+"');
		let button = new Element('button').addClassNames('form__button', 'button', 'button_dark-blue').setType('submit').addText('Выбрать').addListener('click', (e) => {
			e.preventDefault();
			let nameIsValid = this.isValidName(this.inputName.value);
			let phoneIsValid = this.isValidPhone(this.inputPhone.value);

			this.highlightInput(this.inputName, nameIsValid, this.inputNameErrorMes);
			this.highlightInput(this.inputPhone, phoneIsValid, this.inputPhoneErrorMes);

			if (nameIsValid && phoneIsValid) {
				// Send to the server
				this.showNextPage();
			}


		});

		this.inputName = inputName.elementRoot;
		this.inputPhone = inputPhone.elementRoot;
		this.inputNameErrorMes = inputNameErrorMes.elementRoot;
		this.inputPhoneErrorMes = inputPhoneErrorMes.elementRoot;

		return wrapper.append(
			group.append(labelName, inputName, inputNameErrorMes, labelPhone, inputPhone, inputPhoneErrorMes),
			button
		);
	}

	highlightInput(element, isValid, errorMessage) {
		if (!isValid) {
			element.classList.remove('form__input_ok');
			element.classList.add('form__input_error');
			errorMessage.classList.remove('form__error-message_hidden');
		} else {
			element.classList.add('form__input_error');
			element.classList.add('form__input_ok');
			errorMessage.classList.add('form__error-message_hidden');
		}
	}

	render() {
		return this.root.elementRoot;
	}
}

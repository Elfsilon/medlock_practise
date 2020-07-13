class AppointmentForm {
	a = `
    <div class="appointment__form form">
							<div class="form__group">
								<label class="form__label" for="name">Имя Отчество</label>
								<input id="name" class="form__input" type="text" placeholder="Иван Иванович" />
								<label class="form__label" for="phone">Номер телефона</label>
								<input id="phone" class="form__input" type="tel" placeholder="+7 999 123-45-67" />
							</div>
							<button class="form__button time-select__select-button button button_dark-blue">Выбрать</button>
						</div>
    `;
	constructor() {
		this.root = this.init();
	}

	//
	// TODO
	//
	init() {
		let wrapper = new Element('div').addClassNames('appointment__form', 'form');
		let group = new Element('div').addClassNames('form__group');
		let labelName = new Element('label').addClassNames('form__label');
		let labelName = new Element('input').addClassNames('form__label');
	}

	render() {
		return this.root.elementRoot;
	}
}

class Appointment extends Component {
	constructor(calendarInstance, timeSelectInstance) {
		super();
		this.calendar = calendarInstance || null;
		this.timeSelect = timeSelectInstance || null;
		return this.render().elementRoot;
	}

	render() {
		const mainContainer = new Element('div').addClassNames('appointment');

		const headerWrapper = new Element('div').addClassNames('appointment__wrapper', 'appointment__wrapper_padding_title');
		const title = new Element('p')
			.addClassNames('appointment__title', 'text', 'text_color_black')
			.addText('Выберите дату и время записи на демонстрацию');
		const closeButton = new Element('div').addClassNames('appointment__close-btn').addListener('click', () => {
			modal.modalWindowClose();
		});
		const closeButtonIcon = new Element('img', 'assets/crossing.svg', 'x').addClassNames('appointment__close-icon');
		const bodyWrapper = new Element('div').addClassNames(
			'appointment__wrapper',
			'appointment__wrapper_no-border',
			'appointment__wrapper_fullheight'
		);
		const calendarWrapper = new Element('div').addClassNames(
			'appointment__inner-wrapper',
			'appointment__inner-wrapper_width_m',
			'appointment__inner-wrapper_white'
		);
		const timeSelectWrapper = new Element('div').addClassNames(
			'appointment__inner-wrapper',
			'appointment__inner-wrapper_width_s',
			'appointment__inner-wrapper_blue',
			'appointment__inner-wrapper_stretch'
		);
		const calendar = new Element('div').addClassNames('calendar');
		const timeSelect = new Element('div').addClassNames('time-select');

		return mainContainer.append(
			headerWrapper.append(title, closeButton.append(closeButtonIcon)),
			bodyWrapper.append(calendarWrapper.append(calendar), timeSelectWrapper.append(timeSelect))
			// bodyWrapper.append(calendarWrapper.append(this.calendar), timeSelectWrapper(this.timeSelect))
		);
	}
}

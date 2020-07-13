class AboutAppointment {
	constructor(data) {
		this.data = Object.assign({}, data);
		this.root = this.init();
	}

	init() {
		let outerWrapper = new Element('div').addClassNames('appointment__about-appointment', 'about-appointment');
		let backButton = new Element('img', 'assets/blue_arrow.svg', 'Back').addClassNames('about-appointment__back-button');
		let timeRegion = new Element('p')
			.addClassNames('about-appointment__time-region', 'text', 'text_fontsize_small')
			.addText('Московское время');
		let innerWrapper = new Element('div').addClassNames('about-appointment__wrapper');
		let caption = new Element('p').addClassNames('about-appointment__caption', 'text', 'text_caption2', 'text_color_black');
		let durationContainer = new Element('div').addClassNames('about-appointment__info');
		let dateContainer = new Element('div').addClassNames('about-appointment__info');
		let icon1 = new Element('img', 'assets/fast.svg', 'Duration:').addClassNames('about-appointment__icon');
		let icon2 = new Element('img', 'assets/calendar_date.svg', 'Date:').addClassNames('about-appointment__icon');
		let durationText = new Element('p').addClassNames('about-appointment__text', 'text').addText('09:00 — 11:00 (2 часа)');
		let dateText = new Element('p')
			.addClassNames('about-appointment__text', 'text')
			.addText(`${this.data.dayOfWeekName}, ${this.data.day} ${this.data.monthName} ${this.data.year}`);

		return outerWrapper.append(
			backButton,
			innerWrapper.append(caption, durationContainer.append(icon1, durationText), dateContainer.append(icon2, dateText)),
			timeRegion
		);
	}

	render() {
		return this.root.elementRoot;
	}
}

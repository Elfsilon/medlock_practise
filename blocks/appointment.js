const month = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

const dayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

class Appointment {
	constructor() {
		const date = new Date();
		this.calendarData = {
			realYear: date.getFullYear(),
			realMonthNum: date.getMonth(),
			curYear: date.getFullYear(),
			curMonthNum: date.getMonth(),
			curDay: date.getDate(),
			currentActiveCell: null,
		};
		this.bodyWrapper = null;
		this.firstInnerWrapper = null;
		this.secondInnerWrapper = null;
		this.avaliableDates = null;
		this.currentTimeList = null;
		this.timeSelectData = {};
		this.changeTimeSelectData = this.changeTimeSelectData.bind(this);
		this.showPersonalDataPage = this.showPersonalDataPage.bind(this);
		this.showCalendarPage = this.showCalendarPage.bind(this);
		this.showFinalPage = this.showFinalPage.bind(this);
		this.root = this.init();
	}

	init() {
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
		const firstInnerWrapper = new Element('div').addClassNames(
			'appointment__inner-wrapper',
			'appointment__inner-wrapper_width_m',
			'appointment__inner-wrapper_white'
		);
		const secondInnerWrapper = new Element('div').addClassNames(
			'appointment__inner-wrapper',
			'appointment__inner-wrapper_width_s',
			'appointment__inner-wrapper_blue',
			'appointment__inner-wrapper_stretch'
		);

		this.bodyWrapper = bodyWrapper.elementRoot;
		this.firstInnerWrapper = firstInnerWrapper.elementRoot;
		this.secondInnerWrapper = secondInnerWrapper.elementRoot;

		return mainContainer.append(
			headerWrapper.append(title, closeButton.append(closeButtonIcon)),
			bodyWrapper.append(firstInnerWrapper, secondInnerWrapper)
		);
	}

	async getAvaliableDates(calendarData) {
		let monthNumber = calendarData.curMonthNum + 1;
		let url = `http://192.168.0.69:8000/get_booked_dates/${calendarData.curYear}/${
			monthNumber > 9 ? monthNumber : '0' + monthNumber
		}`;

		let response = await fetch(url);
		if (response.ok) {
			let data = await response.json();
			if (Object.keys(data).length > 0) {
				let avaliableDates = {};
				for (const line of data) {
					let [date, time] = line.split(' ');
					let [year, month, day] = date.split('-');
					let key = [day, +month, year].join(' ');
					time = time.slice(0, -3);
					if (avaliableDates[key]) {
						avaliableDates[key].push(time);
					} else {
						avaliableDates[key] = [time];
					}
				}
				return avaliableDates;
			}
		}
		return {};
		// return {
		// 	'20 7 2020': ['8:00', '9:30'],
		// };
	}

	isValidPhone(phone) {
		if ((phone[0] == '+' && phone.length == 12) || (phone[0] != '+' && phone.length == 11)) {
			let digitsAndPlusReg = /[^0-9+]/g;		
			return !digitsAndPlusReg.test(phone);
		}
		return false;
	}

	isValidName(name) {
		let rusLettersReg = /[^А-Яа-яA-Za-z ]/g;
		if (!rusLettersReg.test(name)) {
			return name.split(' ').length == 2;
		} 
		return false;
	}

	changeTimeSelectData(date, timeList) {
		this.timeSelectInst.cleanTimeList();
		if (timeList) {
			this.timeSelectInst.setTimeList(timeList);
			this.timeSelectInst.setDate(date);
		}
	}

	showCalendarPage() {
		this.getAvaliableDates(this.calendarData).then((dates) => {
			this.calendarInst = new Calendar(this.calendarData, dates, this.getAvaliableDates, this.changeTimeSelectData);
			this.firstInnerWrapper.innerHTML = '';
			this.firstInnerWrapper.append(this.calendarInst.render());

			this.timeSelectInst = new TimeSelect(this.showPersonalDataPage);
			this.secondInnerWrapper.innerHTML = '';
			this.secondInnerWrapper.append(this.timeSelectInst.render());
		});
	}

	showPersonalDataPage(data) {
		this.calendarInst = new AboutAppointment(data, this.showCalendarPage);
		this.firstInnerWrapper.innerHTML = '';
		this.firstInnerWrapper.append(this.calendarInst.render());

		this.timeSelectInst = new AppointmentForm(this.showFinalPage, this.isValidName, this.isValidPhone);
		this.secondInnerWrapper.innerHTML = '';
		this.secondInnerWrapper.append(this.timeSelectInst.render());
	}

	showFinalPage() {
		this.thanksInst = new Thanks();
		this.bodyWrapper.innerHTML = '';
		this.bodyWrapper.append(this.thanksInst.render());
	}

	render() {
		this.showCalendarPage();
		return this.root.elementRoot;
	}
}

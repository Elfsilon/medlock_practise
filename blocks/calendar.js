const cellStyle = {
	normal: 'calendar__cell',
	disabled: 'calendar__cell calendar__cell_disabled',
	active: 'calendar__cell calendar__cell_active',
	avaliable: 'calendar__cell calendar__cell_avalible',
	head: 'calendar__cell calendar__head',
};

class Calendar {
	root = null;
	state = null;
	calendarGrid = null;
	currentMonth = null;
	currentYear = null;
	timeSelectObj = null;
	avaliable = null;

	constructor(initialData, avaliable, fetchNewDates, changeTimeSelectData) {
		this.state = initialData;
		this.avaliable = avaliable;
		this.fetchNewDates = fetchNewDates;
		this.changeTimeSelectData = changeTimeSelectData;
		this.root = this.init();
	}

	init() {
		let outerWrapper = new Element('div').addClassNames('calendar').addListener('click', (e) => {
			if (this.state.currentActiveCell) {
				this.state.currentActiveCell.classList.remove('calendar__cell_active');
				// if (this.timeSelect) this.timeSelect.cleanTimeList();
				this.changeTimeSelectData({}, null);
			}
			if (e.target.classList.contains('calendar__cell_avalible')) {
				e.target.classList.add('calendar__cell_active');
				this.state.currentActiveCell = e.target;

				if (this.avaliable) {
					const timeListKey = [e.target.textContent, this.state.curMonthNum + 1, this.state.curYear].join(' ');	
					if (this.avaliable[timeListKey]) {
						this.changeTimeSelectData({
								month: this.state.curMonthNum,
								year: this.state.curYear,
								day: this.state.currentActiveCell.textContent,
								dayOfWeek: new Date(this.state.curYear, this.state.curMonthNum, this.state.currentActiveCell.textContent).getDay(),
						}, this.avaliable[timeListKey]);
					}
				}
			}
		});
		let wrapper = new Element('div').addClassNames('calendar__wrapper');
		let nextMonthButton = new Element('img', 'assets/right_arrow.svg', '>').addClassNames('calendar__button', 'calendar__button-next').addListener('click', () => {
			this.calendarChangeToNextMonth();
		});
		let prevMonthButton = new Element('img', 'assets/left_arrow.svg', '<').addClassNames('calendar__button', 'calendar__button-prev').addListener('click', () => {
			this.calendarChangeToPrevMonth();
		});
		let curDateContainer = new Element('div').addClassNames('calendar__current-date');
		let titleCurMonth = new Element('h3').addClassNames('calendar__current-month', 'text', 'text_color_blue', 'text_fontsize_big');
		let titleCurYear = new Element('h3').addClassNames('calendar__current-year', 'text', 'text_color_blue', 'text_fontsize_big');
		let calendarGrid = new Element('div').addClassNames('calendar__days');

		this.currentMonth = titleCurMonth.elementRoot;
		this.currentYear = titleCurYear.elementRoot;
		this.calendarGrid = calendarGrid.elementRoot;

		return outerWrapper.append(
			wrapper.append(
				prevMonthButton, 
				curDateContainer.append(
					titleCurYear,
					titleCurMonth
				), 
				nextMonthButton
			),
			calendarGrid
		);
	}

	render() {
			this.calendarClear();
			this.calendarAddWhitespaces();
			this.changeCalendarTitle(month[this.state.curMonthNum], this.state.curYear);
			this.calendarGrid.insertAdjacentHTML('afterbegin', this.calendarGetHeadsTemplate());
			
			for (let i = 1; i <= this.calendarMonthDaysCount(this.state.curMonthNum, this.state.curYear); i++) {
				let calendarCell = document.createElement('p');
				calendarCell.textContent = i;
				if (this.state.curMonthNum == this.state.realMonthNum && this.state.curYear == this.state.realYear && i < this.state.curDay) {
					calendarCell.className = cellStyle.disabled;
				} else {
					if (this.avaliable[[i, this.state.curMonthNum + 1, this.state.curYear].join(' ')]) {
						calendarCell.className = cellStyle.avaliable;
					} else {
						calendarCell.className = cellStyle.normal;
					}
				}
				this.calendarGrid.append(calendarCell);
			}

		return this.root.elementRoot;
	}

	calendarClear() {
		this.calendarGrid.innerHTML = '';
	}

	calendarAddWhitespaces() {				
		const firstDayOfWeek = new Date(this.state.curYear, this.state.curMonthNum, 1).getDay();
		let whitepsaceCount = (firstDayOfWeek - 1) % 6;

		for (let i = 0; i < whitepsaceCount; i++) {
			let calendarCell = document.createElement('p');
			calendarCell.className = cellStyle.disabled;
			this.calendarGrid.append(calendarCell);
		}
	}

	calendarCanTogglePrev() {
		return this.state.curMonthNum != this.state.realMonthNum || this.state.curYear != this.state.realYear;
	}

	calendarCorrectDate() {
		if (this.state.curMonthNum > 11) {
			this.state.curMonthNum = 0;
			this.state.curYear++;
		} else if (this.state.curMonthNum < 0) {
			this.state.curMonthNum = 11;
			this.state.curYear--;
		}
	}

	calendarChangeToNextMonth() {
		this.state.curMonthNum++;
		this.calendarCorrectDate();
		this.fetchNewDates(this.state).then((dates) => {
			this.avaliable = dates;
			this.root.elementRoot = this.render();
		});
	}

	calendarChangeToPrevMonth() {
		if (this.calendarCanTogglePrev()) {
			this.state.curMonthNum--;
			this.calendarCorrectDate();
			this.fetchNewDates(this.state).then((dates) => {
				this.avaliable = dates;
				this.root.elementRoot = this.render();
			});
		}
	}

	changeCalendarTitle(month, year) {
		this.currentMonth.textContent = month;
		this.currentYear.textContent = year;
	}

	calendarMonthDaysCount(month, year) {
		return new Date(year, month + 1, 0).getDate();
	}

	calendarGetHeadsTemplate() {
		return `
      		<p class="calendar__cell calendar__head calendar__head_font_dark">Пн</p>
      		<p class="calendar__cell calendar__head calendar__head_font_dark">Вт</p>
      		<p class="calendar__cell calendar__head calendar__head_font_dark">Ср</p>
      		<p class="calendar__cell calendar__head calendar__head_font_dark">Чт</p>
      		<p class="calendar__cell calendar__head calendar__head_font_dark">Пт</p>
      		<p class="calendar__cell calendar__head">Сб</p>
      		<p class="calendar__cell calendar__head">Вс</p>
    	`;
	}
}

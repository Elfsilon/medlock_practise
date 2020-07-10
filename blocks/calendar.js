const cellStyle = {
  normal: "calendar__cell",
  disabled: "calendar__cell calendar__cell_disabled",
  active: "calendar__cell calendar__cell_active",
  avaliable: "calendar__cell calendar__cell_avalible",
  head: "calendar__cell calendar__head",
};

const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class Calendar {
  root = null;
  state = null;
  calendarGrid = null;
  currentMonth = null;
  currentYear = null;
  timeSelectObj = null;
  avaliable = {
    '10 6 2020': ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'],
    '11 6 2020': ['8:00', '8:30', '10:30', '11:00', '11:30'],
    '16 6 2020': ['8:00', '9:00', '9:30', '10:00', '10:30', '11:30'],
    '15 6 2020': ['8:00', '8:30', '9:00', '9:30', '10:00'],
  };
  
  constructor(blockSelector) {
    this.root = document.querySelector(blockSelector);
    const date = new Date();
    this.state = {
      realYear: date.getFullYear(),
      realMonthNum: date.getMonth(),
      curYear: date.getFullYear(),
      curMonthNum: date.getMonth(),
      curDay: date.getDate(),
      currentActiveCell: null,
    };
    this.calendarInit();
  }

  calendarInit() {
    // Create base structure
    let wrapper = document.createElement('div');
    let nextMonthButton = document.createElement('img');
    let prevMonthButton = document.createElement('img');
    let curDateContainer = document.createElement('div');
    let titleCurMonth = document.createElement('h3');
    let titleCurYear = document.createElement('h3');
    let calendarGrid = document.createElement('div');

    nextMonthButton.src = 'assets/right_arrow.svg';
    prevMonthButton.src = 'assets/left_arrow.svg';
    nextMonthButton.alt = '>';
    prevMonthButton.alt = '<';

    wrapper.classList.add('calendar__wrapper');
    nextMonthButton.classList.add('calendar__button-next');
    prevMonthButton.classList.add('calendar__button-prev');
    curDateContainer.classList.add('calendar__current-date');
    titleCurMonth.classList.add('calendar__current-month', 'text', 'text_color_blue', 'text_fontsize_big');
    titleCurYear.classList.add('calendar__current-year', 'text', 'text_color_blue', 'text_fontsize_big');
    calendarGrid.classList.add('calendar__days');

    nextMonthButton.addEventListener('click', () => {
      this.calendarChangeToNextMonth();
    });
    prevMonthButton.addEventListener('click', () => {
      this.calendarChangeToPrevMonth();
    });

    wrapper.append(prevMonthButton, curDateContainer, nextMonthButton);
    curDateContainer.append(titleCurMonth, titleCurYear);
    this.root.append(wrapper, calendarGrid);

    this.currentMonth = titleCurMonth;
    this.currentYear = titleCurYear;
    this.calendarGrid = calendarGrid;

    // Selection avaliable cells and render TimeSelect
    this.timeSelectObj = new TimeSelect('.time-select');
    this.root.addEventListener("click", (e) => {
      if (this.state.currentActiveCell) {
        this.state.currentActiveCell.classList.remove('calendar__cell_active');
        this.timeSelectObj.cleanTimeList();
      }
      if (e.target.classList.contains("calendar__cell_avalible")) {
        e.target.classList.add('calendar__cell_active');
        this.state.currentActiveCell = e.target;
        
        // Render TimeSelect
        const timeListKey = [e.target.textContent, this.state.curMonthNum, this.state.curYear].join(' ');
        this.timeSelectObj.setTimeList(this.avaliable[timeListKey]);
        
      }
    });

    this.calendarRender(this.state);
  }

  calendarRender({ curMonthNum, curYear, curDay }) {     
    this.calendarClear();   
    this.calendarAddWhitespaces(curYear, curMonthNum);
    this.changeCalendarTitle(month[curMonthNum], curYear);
    this.calendarGrid.insertAdjacentHTML('afterbegin', this.calendarGetHeadsTemplate());    

    for (let i = 1; i <= this.calendarMonthDaysCount(curMonthNum, curYear); i++) {
      let calendarCell = document.createElement("p");
      calendarCell.textContent = i;
      if (curMonthNum == this.state.realMonthNum && curYear == this.state.realYear && i < curDay) {
        calendarCell.className = cellStyle.disabled;
      } else {
        if (this.avaliable[[i, curMonthNum, curYear].join(' ')]) {
          calendarCell.className = cellStyle.avaliable;
        } else {
          calendarCell.className = cellStyle.normal;
        }
      }
      this.calendarGrid.append(calendarCell);
    }        
  }

  calendarClear() {
    this.calendarGrid.innerHTML = '';
  }

  calendarAddWhitespaces(curYear, curMonthNum) {
    const firstDayOfWeek = new Date(curYear, curMonthNum, 1).getDay();
    let whitepsaceCount = (firstDayOfWeek - 1) % 6;

    for (let i = 0; i < whitepsaceCount; i++) {
      let calendarCell = document.createElement("p");
      calendarCell.className = cellStyle.disabled;
      this.calendarGrid.append(calendarCell);
    }
  }

  calendarCanTogglePrev({curMonthNum, curYear, realMonthNum, realYear}) {
    return curMonthNum != realMonthNum || curYear != realYear;
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
    this.calendarRender(this.state);
  }

  calendarChangeToPrevMonth() {
    if (this.calendarCanTogglePrev(this.state)) {
      this.state.curMonthNum--;
      this.calendarCorrectDate();
      this.calendarRender(this.state);
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

let calendar = new Calendar('.calendar');
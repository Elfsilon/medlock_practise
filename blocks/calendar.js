const cellStyle = {
  normal: "calendar__cell",
  disabled: "calendar__cell calendar__cell_disabled",
  active: "calendar__cell calendar__cell_active",
  avaliable: "calendar__cell calendar__cell_avalible",
  head: "calendar__cell calendar__head",
};

const month = {
  0: {
    name: "Январь",
    daysCount: 31,
  },
  1: {
    name: "Февраль",
    daysCount: 28,
  },
  2: {
    name: "Март",
    daysCount: 31,
  },
  3: {
    name: "Апрель",
    daysCount: 30,
  },
  4: {
    name: "Май",
    daysCount: 31,
  },
  5: {
    name: "Июнь",
    daysCount: 30,
  },
  6: {
    name: "Июль",
    daysCount: 31,
  },
  7: {
    name: "Август",
    daysCount: 31,
  },
  8: {
    name: "Сентябрь",
    daysCount: 30,
  },
  9: {
    name: "Октябрь",
    daysCount: 31,
  },
  10: {
    name: "Ноябрь",
    daysCount: 30,
  },
  11: {
    name: "Декабрь",
    daysCount: 31,
  },
};

const date = new Date();
// let curYear = date.getFullYear();
// let curMonth = date.getMonth();
// let curDay = date.getDate();
// let currentActiveCell = null;

let state = {
    realYear: date.getFullYear(),
    realMonth: date.getMonth(),
    curYear: date.getFullYear(),
    curMonth: date.getMonth(),
    curDay: date.getDate(),
    currentActiveCell: null,
};

const calendar = document.querySelector(".calendar__days");
const nextMonthButton = document.querySelector('.calendar__button-next');
const prevMonthButton = document.querySelector('.calendar__button-prev');
const calendarCurrentMonth = document.querySelector('.calendar__current-month');
const calendarCurrentYear = document.querySelector('.calendar__current-year');
const avaliable = [1, 6, 9, 10];

function calendarInit(curMonth, curYear, curDay) {    
  calendarAddWhitespaces(curYear, curMonth);
  changeCalendarTitle(month[curMonth].name, curYear);

  for (let i = 1; i <= month[curMonth].daysCount; i++) {
    let calendarCell = document.createElement("p");
    calendarCell.textContent = i;
    if (curMonth == state.realMonth && curYear == state.realYear && i < curDay) {
      calendarCell.className = cellStyle.disabled;
    } else {
      if (avaliable.includes(i)) {
        calendarCell.className = cellStyle.avaliable;
      } else {
        calendarCell.className = cellStyle.normal;
      }
    }
    calendar.append(calendarCell);
  }
}

function calendarClear() {
    calendar.innerHTML = '';
}

function calendarAddWhitespaces(curYear, curMonth) {
  const firstDay = new Date(curYear, curMonth, 1).getDay();

  let whitepsaceCount;
  if (firstDay == 0) {
    whitepsaceCount = 6;
  } else {
    whitepsaceCount = firstDay - 1;
  }

  do {
    let calendarCell = document.createElement("p");
    calendarCell.className = cellStyle.disabled;
    calendar.append(calendarCell);
    whitepsaceCount--;
  } while (whitepsaceCount > 0);
}

function calendarCanTogglePrev({curMonth, curYear, realMonth, realYear}) {
    return curMonth != realMonth || curYear != realYear;
}

function calendarRender() {
    calendarClear();
    calendarInit(state.curMonth, state.curYear, state.curDay);
}

function calendarCorrectDate() {
    if (state.curMonth > 11) {
        state.curMonth = 0;
        state.curYear++;
    } else if (state.curMonth < 0) {
        state.curMonth = 11;
        state.curYear--;
    }
}

function calendarChangeMonth(where) {
    if (where == 'prev') {
        if (calendarCanTogglePrev(state)) {
            state.curMonth--;
            calendarCorrectDate();
            calendarRender();
        } 
    } else {
        state.curMonth++;
        calendarCorrectDate();
        calendarRender();
    }
}

function changeCalendarTitle(month, year) {
    calendarCurrentMonth.textContent = month;
    calendarCurrentYear.textContent = year;
}

calendar.addEventListener("click", (e) => {
    if (state.currentActiveCell) state.currentActiveCell.classList.remove('calendar__cell_active');
    if (!(e.target.classList.contains("calendar__cell_disabled") ||
          e.target.classList.contains("calendar__head") ||
          e.target.classList.contains("calendar__days"))) {
        e.target.classList.add('calendar__cell_active');
        state.currentActiveCell = e.target;
    }
});

nextMonthButton.addEventListener('click', () => {
    calendarChangeMonth('next');
    
});

prevMonthButton.addEventListener('click', () => {
    calendarChangeMonth('prev');
});

calendarInit(state.curMonth, state.curYear, state.curDay);

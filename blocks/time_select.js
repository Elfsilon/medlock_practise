
class TimeSelect {
    root = null;
    timeList = null;
    timeSelected = null;
    date = {
        month: null,
	    year: null,
		day: null,
		dayOfWeek: null
    };

    constructor(changeWindow) {
        this.changeWindow = changeWindow;
        this.root = this.init();
    }

    setTimeList(timeList) {
        this.timeList = [...timeList];
        this.root.elementRoot = this.render();
    }

    cleanTimeList() {
        this.timeList = null;
        this.root.elementRoot = this.render();
    }

    setDate(obj) {
        this.date = Object.assign({}, obj);
    }

    init() {
        return new Element('div').addClassNames('time-select').addListener('click', (e) => {
            if (this.timeSelected || e.target.classList.contains('time-select__unselect-button')) {
                this.timeSelected.classList.remove('time-select__time_selected');
                this.timeSelected.nextElementSibling.classList.add('time-select_hidden');
                this.timeSelected.previousElementSibling.classList.add('time-select_hidden');
            }
            if (e.target.classList.contains('time-select__time')) {
                e.target.classList.add('time-select__time_selected');
                e.target.nextElementSibling.classList.remove('time-select_hidden');
                e.target.previousElementSibling.classList.remove('time-select_hidden');
                this.timeSelected = e.target;
            }
            if (e.target.classList.contains('time-select__select-button')) { 
                let time = e.target.previousElementSibling.textContent;
                let monthName;
                let dayOfWeekName;
                if (this.date.month == 2 || this.date.month == 7) {
                    monthName = month[this.date.month] + 'а';
                } else {
                    monthName = (month[this.date.month]).slice(0, -1) + 'я';
                }
                dayOfWeekName = dayOfWeek[this.date.dayOfWeek];

                this.changeWindow({
                    time,
                    monthName,
                    dayOfWeekName,
                    day: this.date.day,
                    year: this.date.year
                });
            }
        });
    }
    
    resetBody() {
        this.root.elementRoot.innerHTML = '';
    }

    getCellTemplate(timestring) {
        const cell = new Element('div').addClassNames('time-select__cell', 'time-select__cell_selected');
        const unselectButton = new Element('img', 'assets//unselect.svg', 'x').addClassNames('time-select__unselect-button', 'time-select_hidden');
        const timeContainer = new Element('div').addClassNames('time-select__time', 'button', 'button_dark-blue-bordered').addText(timestring);
        const selectButton = new Element('button').addClassNames('time-select__select-button', 'button', 'button_dark-blue', 'time-select_hidden').addText('Выбрать');
        return cell.append(unselectButton, timeContainer, selectButton);
    }

    getMessageTemplate(message) {
        return new Element('p').addClassNames('time-select__message', 'text').addText(message);
    }

    render() {
        this.resetBody();        
        if (this.timeList) {
            for (const time of this.timeList) {
                this.root.append(this.getCellTemplate(time));
            }
        } else {
            this.root.append(this.getMessageTemplate('Выберите день'));
        }    
        return this.root.elementRoot;
    }
}
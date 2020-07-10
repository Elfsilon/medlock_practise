class TimeSelect {
    root = null;
    timeList = null;
    timeSelected = null;

    constructor(blockSelector) {
        this.root = document.querySelector(blockSelector);
        this.timeSelectInit();
        this.timeSelectRender();
    }

    setTimeList(timeList) {
        this.timeList = [...timeList];
        this.timeSelectRender();
    }

    cleanTimeList() {
        this.timeList = null;
        this.timeSelectRender();
    }

    timeSelectInit() {
        this.root.addEventListener('click', (e) => {
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
            if (e.target.classList.contains('time-select__select-button')) { /* Some code */ }
        });
    }
    
    timeSelectClean() {
        this.root.innerHTML = '';
    }

    timeSelectCellTemplate(timestring) {
        return `
        <div class="time-select__cell time-select__cell_selected">
            <img class="time-select__unselect-button time-select_hidden" src="assets//unselect.svg" alt="x">
            <div class="time-select__time button button_dark-blue-bordered ">${timestring}</div>
            <button class="time-select__select-button button button_dark-blue time-select_hidden">Выбрать</button>
        </div>
        `;
    }

    timeSelectMessageTemplate(message) {
        return `<p class="time-select__message text">${message}</p>`;
    }

    timeSelectRender() {
        this.timeSelectClean();        
        if (this.timeList) {
            for (const time of this.timeList) {
                this.root.insertAdjacentHTML('beforeend', this.timeSelectCellTemplate(time));
            }
        } else {
            this.root.insertAdjacentHTML('beforeend', this.timeSelectMessageTemplate('Выберите день'));
        }
    }
}
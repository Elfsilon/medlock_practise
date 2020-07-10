class ModalWindow {
    root = null;
    opened = false;
    innerBlockSelector = null;
    static instancesCount = 0;

    constructor() {
        if (ModalWindow.instancesCount == 0) {
            let modal = document.createElement('div');
            modal.classList.add('modal');
            document.body.append(modal);
            this.root = modal;
            ModalWindow.instancesCount++;
        } else {
            throw new Error('Instance already exists');
        }
    }

    modalWindowOpen(innerBlockSelector = null) {
        if (!this.opened) {
            this.opened = true;
            this.root.classList.add('modal_opened');
        }
    }

    modalWindowClose() {
        if (this.opened) {
            this.opened = false;
            this.root.classList.remove('modal_opened');
        }
    }

    modalWindowInit() {
        
    }
}

const modal = new ModalWindow();

// const headerAppointmentButton = document.querySelector('.header__appointment-button');
const modalCloseButton = document.querySelector('.appointment__close-btn');

// headerAppointmentButton.addEventListener('click', () => {
//     modal.modalWindowOpen();
// });

modalCloseButton.addEventListener('click', () => {
    modal.modalWindowClose();
});
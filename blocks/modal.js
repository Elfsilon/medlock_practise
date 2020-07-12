class ModalWindow {
	root = null;
	opened = false;
	innerBlockSelector = null;
	innerComponent = null;
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

	modalWindowOpen(innerComponent) {
		if (!this.opened) {
			this.opened = true;
			this.root.classList.add('modal_opened');
			this.root.append(innerComponent);
		}
	}

	modalWindowClose() {
		if (this.opened) {
			this.opened = false;
			this.root.classList.remove('modal_opened');
			this.root.innerHTML = '';
		}
	}

	modalWindowInit() {}
}

const modal = new ModalWindow();

const modalCloseButton = document.querySelector('.appointment__close-btn');
modalCloseButton.addEventListener('click', () => {
	modal.modalWindowClose();
});

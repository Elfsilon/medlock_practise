const headerAppointmentButton = document.querySelector('.header__appointment-button');

headerAppointmentButton.addEventListener('click', () => {
	// const appointment = new Appointment();	
	modal.modalWindowOpen(new Appointment().render());
});
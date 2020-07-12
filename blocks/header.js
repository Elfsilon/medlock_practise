const headerAppointmentButton = document.querySelector('.header__appointment-button');
headerAppointmentButton.addEventListener('click', () => {
	modal.modalWindowOpen(new Appointment());
	console.log(document.querySelector('.calendar'));

	let calendar = new Calendar('.calendar');
});

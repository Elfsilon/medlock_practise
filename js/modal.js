const modalWindow = document.querySelector('.modal');
const headerAppointmentButton = document.querySelector('.header__appointment-button');

headerAppointmentButton.addEventListener('click', () => {
    modalWindow.classList.add('modal_active');
});
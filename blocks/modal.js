const modalWindow = document.querySelector('.modal');
const headerAppointmentButton = document.querySelector('.header__appointment-button');
const modalCloseButton = document.querySelector('.appointment__close-btn');

headerAppointmentButton.addEventListener('click', () => {
    modalWindow.classList.add('modal_active');
});

modalCloseButton.addEventListener('click', () => {
    modalWindow.classList.remove('modal_active');
});
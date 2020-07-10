function createElement(nodeType, classList) {
    let node = document.createElement(nodeType);
    node.classList.add(...classList);
    return node;
}

class Appointment {
    root = null;

    constructor () {
        this.appointmentInit();
        this.appointmentRender();
        `
        <div class="appointment">
            <div class="appointment__wrapper appointment__wrapper_padding_title">
                <p class="appointment__title text text_color_black">Выберите дату и время записи на демонстрацию</p>
                <div class="appointment__close-btn">
                    <img class="appointment__close-icon" src="assets/crossing.svg" alt="x">
                </div>
            </div>
            <div class="appointment__wrapper appointment__wrapper_no-border appointment__wrapper_fullheight">
                <div class="appointment__inner-wrapper appointment__inner-wrapper_width_m appointment__inner-wrapper_white">
                    <div class="calendar"></div>
                </div>
                <div class="appointment__inner-wrapper appointment__inner-wrapper_width_s appointment__inner-wrapper_blue appointment__inner-wrapper_stretch">
                    <div class="time-select"></div>
                </div>
            </div>
      </div>
      `
    }

    init() {
        let mainContainer = createElement('div', ['appointment']);
        let headerWrapper = createElement('div', ['appointment__wrapper', 'appointment__wrapper_padding_title']);
        let title = createElement('p', ['appointment__title', 'text', 'text_color_black']);
        let closeButton = createElement('div', ['appointment__close-btn']);
        let closeButtonIcon = createElement('img', ['appointment__close-icon']);
        let bodyWrapper = createElement('div', ['appointment__wrapper', 'appointment__wrapper_no-border', 'appointment__wrapper_fullheight']);
        let calendarWrapper = createElement('div', ['appointment__inner-wrapper', 'appointment__inner-wrapper_width_m', 'appointment__inner-wrapper_white']);
        let timeSelectWrapper = createElement('div', ['appointment__inner-wrapper', 'appointment__inner-wrapper_width_s', 'appointment__inner-wrapper_blue', 'appointment__inner-wrapper_stretch']);
    }

    render() {

    }
}
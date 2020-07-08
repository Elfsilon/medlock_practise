let elem = document.querySelector('.main-carousel');
let flkty = new Flickity( elem, {
  wrapAround: true,
  cellAlign: 'center',
  prevNextButtons: true,
  groupCells: 2,
  adaptiveHeight: true,
  pageDots: false
});

let mySwiper = new Swiper('.swiper-container', {
  speed: 400,
  spaceBetween: 100,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  setWrapperSize: true,
});
let mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    loop: true,
    navigation: {
      nextEl: '.slider__button-next',
      prevEl: '.slider__button-prev',
    },
    slidesPerView: 2,
    setWrapperSize: true,
    watchSlidesVisibility: true,
    slideClass: 'slider__slide',
    slideVisibleClass: 'slider__slide_visible',
  });
const parallaxBottom = document.querySelector('.parallax__bottom');

document.addEventListener('scroll', () => {
    let offset = -window.pageYOffset / 6;
    if (offset > -105) parallaxBottom.style.transform = `translateY(${offset}px)`;
});
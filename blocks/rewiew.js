const sliderContainer = document.querySelector('.swiper-container');

sliderContainer.addEventListener('click', (e) => {
    if (e.target.className == 'review__show-more') e.target.parentNode.style.display = 'none';
});
const sliderContainer = document.querySelector('.swiper-container');
const sliderButtonNext = document.querySelector('.slider__button-next');
const sliderButtonPrev = document.querySelector('.slider__button-prev');

function eraseSlides() {
    const slidesErasedParts = document.querySelectorAll('.review__erased_hidden');
    for (const slidesErasedPart of slidesErasedParts) {
        slidesErasedPart.classList.remove('review__erased_hidden');
    }
}

sliderContainer.addEventListener('click', (e) => {
    if (e.target.className == 'review__show-more') e.target.parentNode.classList.add('review__erased_hidden');
});

sliderButtonNext.addEventListener('click', eraseSlides);
sliderButtonPrev.addEventListener('click', eraseSlides);
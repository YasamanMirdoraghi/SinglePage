// Menu********************************
const showMenu = document.querySelector('#show-menu')
const hiddenMenu = document.querySelector('.navigation')
const close = document.querySelector('.close')

showMenu.onclick = ()=>{
	hiddenMenu.classList.add('show');
}

console.log(showMenu);
console.log(hiddenMenu);
console.log(close);

close.onclick = ()=>{
	hiddenMenu.classList.remove('show');
}

//Slider**********************************
class ImageSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; 

        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
        this.updateSlider();
    }

    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        this.addTouchSupport();

        // Pause auto-play on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const slider = document.querySelector('.slider');

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // Update navigation buttons state
        this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentSlide === this.totalSlides - 1 ? '0.5' : '1';
    }

    startAutoPlay() {
        this.stopAutoPlay(); 
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    pause() {
        this.stopAutoPlay();
    }

    resume() {
        this.startAutoPlay();
    }

    setAutoPlayDelay(delay) {
        this.autoPlayDelay = delay;
        if (this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new ImageSlider();
    
    window.imageSlider = slider;
    
    // console.log('Image Slider successfully!');
    // console.log('Use arrow keys  to navigate');
    // console.log('Hover over slider to pause auto-play');
});


function pauseSlider() {
    if (window.imageSlider) {
        window.imageSlider.pause();
    }
}

function resumeSlider() {
    if (window.imageSlider) {
        window.imageSlider.resume();
    }
}

function setSliderSpeed(delay) {
    if (window.imageSlider) {
        window.imageSlider.setAutoPlayDelay(delay);
    }
}

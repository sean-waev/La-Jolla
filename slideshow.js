let slideIndex = localStorage.getItem('currentSlide') ? parseInt(localStorage.getItem('currentSlide')) : 1;
let slideInterval;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Store the current slide index in localStorage
    localStorage.setItem('currentSlide', slideIndex);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function startSlideshow() {
    slideInterval = setInterval(function () {
        plusSlides(1);
    }, 3000); // Change slide every 3 seconds
}

window.onload = function() {
    showSlides(slideIndex); // Start by showing the current slide
    startSlideshow(); // Start the slideshow

    // Stop the slideshow when leaving the page to prevent multiple intervals
    window.onbeforeunload = function() {
        clearInterval(slideInterval);
    };
};
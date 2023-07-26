/* --------------------------------------------------------------------------- */
/* Remove Preload class from Body on page load */
/* --------------------------------------------------------------------------- */

window.addEventListener('load', ()=> {
   document.querySelector('body').classList.remove('preload');
});

/* ------------------------------------------------------------ */
/* Add heading to the portfolio section (tablets and mobiles) */
/* ------------------------------------------------------------ */

const portfolioHeading = document.querySelector('#portfolio-heading');
const socialMedia = document.querySelector('#social-media');

const toggleHeading = () => {

   if(window.innerWidth < 960) {

      portfolioHeading.classList.remove('sr-only');

   } else {

      portfolioHeading.classList.add('sr-only');

   }

};

toggleHeading();

window.addEventListener('resize', toggleHeading);

/* ------------------------------------------------------------ */
/* Countdown timer */
/* ------------------------------------------------------------ */

const launchDate = new Date('August 26, 2023 23:59:59');

const daysLeft = document.querySelector('.countdown__days');
const hoursLeft = document.querySelector('.countdown__hours');
const minutesLeft = document.querySelector('.countdown__minutes');
const secondsLeft = document.querySelector('.countdown__seconds');

const countdown = () => {
   const now = new Date();
   const diff = launchDate.getTime() - now.getTime();

   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

   // Add a zero in front of single digit numbers
   const addZero = num => {
      if(num < 10) {
         num = '0' + num;
      }
      return num;
   }

   //Days
   daysLeft.innerHTML = (days === 1) ? 
                        `${addZero(days)}<span>Day</span>` : 
                        `${addZero(days)}<span>Days</span>`;

   //Hours
   hoursLeft.innerHTML = (hours === 1) ? 
                        `${addZero(hours)}<span>Hour</span>` : 
                        `${addZero(hours)}<span>Hours</span>`;

   //Minutes
   minutesLeft.innerHTML = (minutes === 1) ? 
                           `${addZero(minutes)}<span>Minute</span>` : 
                           `${addZero(minutes)}<span>Minutes</span>`;

   //Seconds
   secondsLeft.innerHTML = (seconds === 1) ? 
                           `${addZero(seconds)}<span>Second</span>` : 
                           `${addZero(seconds)}<span>Seconds</span>`;
   
   // If date is reached, set time to zero
   if(diff < 0) {
      daysLeft.innerHTML = `00<span>Days</span>`;
      hoursLeft.innerHTML = `00<span>Hours</span>`;
      minutesLeft.innerHTML = `00<span>Minutes</span>`;
      secondsLeft.innerHTML = `00<span>Seconds</span>`;

      clearInterval(countdown);
   }
}

setInterval(countdown, 1000);

/* ------------------------------------------------------------ */
/* Portfolio Slider */
/* ------------------------------------------------------------ */

const portfolioSlider = new Splide('#portfolio-slider', {
   classes: {
	   arrows   :  'splide__arrows portfolio-slider__arrows',
		arrow    :  'splide__arrow portfolio-slider__arrow',
		prev     :  'splide__arrow--prev portfolio-slider__prev',
		next     :  'splide__arrow--next portfolio-slider__next',
   },
   arrowPath   : 'M27 13.953c0 0.141-0.063 0.281-0.156 0.375l-6 5.531c-0.156 0.141-0.359 0.172-0.547 0.094-0.172-0.078-0.297-0.25-0.297-0.453v-3.5h-19.5c-0.281 0-0.5-0.219-0.5-0.5v-3c0-0.281 0.219-0.5 0.5-0.5h19.5v-3.5c0-0.203 0.109-0.375 0.297-0.453s0.391-0.047 0.547 0.078l6 5.469c0.094 0.094 0.156 0.219 0.156 0.359v0z',
   pagination  :  false,
   perPage     :  1,
   perMove     :  1,
   lazyLoad    :  'nearby',
   type        :  'fade',
   rewind      :  true,
   drag        :  'free'
});

portfolioSlider.mount();

const portfolioIndex = document.querySelector('#portfolio-slider-index');

// Get total slides
const totalSlides = portfolioSlider.Components.Slides.getLength();

// On page load
portfolioIndex.innerHTML = `1  of  ${totalSlides}`; 

// Update Slide index in DOM
portfolioSlider.on('active', () => {
   const currentIndex = portfolioSlider.Components.Controller.getIndex() + 1;

   portfolioIndex.innerHTML = `${currentIndex}  of  ${totalSlides}`;   
});

/* ------------------------------------------------------------ */
/* Sliding Contact Form */
/* ------------------------------------------------------------ */

const btnContact = document.querySelector('#btn-contact');
const contact = document.querySelector('.contact');
const closeContact = document.querySelector('#contact-close');
const contactOverlay = document.querySelector('#contact-overlay');

btnContact.addEventListener('click', e => {

   contact.setAttribute('data-show-form', 'true');
   contactOverlay.classList.add('overlay--active');
   btnContact.setAttribute('aria-expanded', true);

});

closeContact.addEventListener('click', e => {

   contact.setAttribute('data-show-form', 'false');
   contactOverlay.classList.remove('overlay--active');
   btnContact.setAttribute('aria-expanded', false);

});

contactOverlay.addEventListener('click', e => {

   contact.setAttribute('data-show-form', 'false');
   contactOverlay.classList.remove('overlay--active');
   btnContact.setAttribute('aria-expanded', false);

});

/* ------------------------------------------------------------ */
/* Contact Form Validation */
/* ------------------------------------------------------------ */

const contactForm = document.querySelector('#contact__form');
const contactName = document.querySelector('#contact__name');
const contactEmail = document.querySelector('#contact__email');
const contactMessage = document.querySelector('#contact__message');

const patternContactText = /^[a-zA-Z ]{3,}$/;
const patternContactEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/;

contactName.addEventListener('keyup', () => {
   if(patternContactText.test(contactName.value)) {
   
      contactName.style.border = '1px solid green';
   
   } else {
   
      contactName.style.border = '1px solid red';
   
   }
});

contactEmail.addEventListener('keyup', () => {
   if(patternContactEmail.test(contactEmail.value)) {
   
      contactEmail.style.border = '1px solid green';
   
   } else {
      
      contactEmail.style.border = '1px solid red';
   
   }
});

contactMessage.addEventListener('keyup', () => {
   if(contactMessage.value.length > 5) {
      
      contactMessage.style.border = '1px solid green';
   
   } else {
      
      contactMessage.style.border = '1px solid red';
   
   }
})

/* ------------------------------------------------------------ */
/* Netlify Form AJAX Submission */
/* ------------------------------------------------------------ */

const handleSubmit = (event) => {
   event.preventDefault();
 
   const myForm = event.target;
   const formData = new FormData(myForm);
   
   fetch("/", {
     method: "POST",
     headers: { "Content-Type": "application/x-www-form-urlencoded" },
     body: new URLSearchParams(formData).toString(),
   })
      .then(() => success())
      .catch((err) => error(err));
};
 
document
   .querySelector("#contact__form")
   .addEventListener("submit", handleSubmit); 

// success() function
const success = () => {

   const success = document.querySelector('.contact__success');

   success.innerHTML = `Thank you! I'll get in touch with you soon.`;
   success.style.display = 'block';
   
   formDefaultState();

   setTimeout(() => {

      success.style.display = 'none';
   
   }, 5000);

};

// error() function
const error = err => {

   const error = document.querySelector('.contact__error');

   error.innerHTML = `${err}`;
   error.style.display = 'block';
   
   formDefaultState();

   setTimeout(() => {
      
      error.style.display = 'none';

   }, 5000);

};

// formDefaultState() function
const formDefaultState = () => {
   contactName.style.border = '1px solid #888888';
   contactEmail.style.border = '1px solid #888888';
   contactMessage.style.border = '1px solid #888888';
   
   contactForm.reset();
};
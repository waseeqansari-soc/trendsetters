document.addEventListener('DOMContentLoaded', (event) => {
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial_content');
    const totalTestimonials = testimonials.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            testimonial.setAttribute('aria-hidden', 'true'); // Accessibility improvement
        });
        // Show the selected testimonial
        testimonials[index].classList.add('active');
        testimonials[index].setAttribute('aria-hidden', 'false'); // Accessibility improvement
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalTestimonials - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === totalTestimonials - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    });

    // Initialize the first testimonial
    showTestimonial(currentIndex);
});

document.getElementById('bill-toggle').addEventListener('change', function () {
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    if (this.checked) {
      monthlyPrices.forEach(el => el.classList.remove('active'));
      annualPrices.forEach(el => el.classList.add('active'));
      document.getElementById('monthly-label').classList.remove('active-label');
      document.getElementById('annually-label').classList.add('active-label');
    } else {
      annualPrices.forEach(el => el.classList.remove('active'));
      monthlyPrices.forEach(el => el.classList.add('active'));
      document.getElementById('annually-label').classList.remove('active-label');
      document.getElementById('monthly-label').classList.add('active-label');
    }
  });

  function updateProPrice() {
    const select = document.getElementById('maus-select');
    const selectedOption = select.options[select.selectedIndex];
    const monthlyPrice = selectedOption.getAttribute('data-monthly');
    const annualPrice = selectedOption.getAttribute('data-annual');

    document.querySelector('.pro .monthly-price').innerText = `$${monthlyPrice}/month`;
    document.getElementById('pro-original-annual').innerText = `$${monthlyPrice * 12}/year`;
    document.getElementById('pro-discounted-annual').innerText = `$${annualPrice}/year`;
    document.querySelector('.pro .annual-price sub').innerText = `(equivalent to $${(annualPrice / 12).toFixed(2)}/month)`;
  }

  function updateCurrentPlan(planName) {
    document.getElementById('current-plan').innerText = planName;
  }
window.addEventListener('load', function () {
    const logoList = document.querySelector('.logo_list');
    const logos = Array.from(logoList.children);

    // Duplicate the logos to ensure a seamless loop
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        logoList.appendChild(clone);
    });

    let scrollPosition = 0;

    function animateLogos() {
        // Move the logos to the left by 1 pixel each frame
        scrollPosition += 1;

        // If the scroll position goes beyond the first set of logos, reset it to 0
        if (scrollPosition >= (logoList.scrollWidth / 2)) {
            scrollPosition = 0;
        }

        logoList.style.transform = `translateX(-${scrollPosition}px)`;

        // Call this function again on the next animation frame
        requestAnimationFrame(animateLogos);
    }

    // Start the animation
    animateLogos();
});

// variables
let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
let counter = {
    value: 0
};
let loaderDuration = 10;

// If not a first time visit in this tab
if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 2;
    counter = {
        value: 75
    };
}
sessionStorage.setItem("visited", "true");

function updateLoaderText() {
    let progress = Math.round(counter.value);
    $(".loader_number").text(progress);
}

function endLoaderAnimation() {
    $(".trigger").click();
}

let tl = gsap.timeline({
    onComplete: endLoaderAnimation
});
tl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
});
tl.to(".loader_progress", {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
}, 0);

document.querySelector('.navbar_menu-button').addEventListener('click', function () {
    var navMenu = document.querySelector('.w-nav-menu');
    var navOverlay = document.querySelector('.w-nav-overlay');
    var isVisible = navMenu.style.display === 'flex';

    navMenu.style.display = isVisible ? 'none' : 'flex'; // Toggle display
    navOverlay.style.display = isVisible ? 'none' : 'block'; // Toggle overlay
});

document.querySelector('.w-nav-overlay').addEventListener('click', function () {
    this.style.display = 'none';
    document.querySelector('.w-nav-menu').style.display = 'none';
});
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('email-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const emailInput = document.getElementById('email-2');

        // Example: Simulate an error if the email input is empty
        if (!emailInput.value) {
            const errorMessageDiv = document.querySelector('.error-message');
            errorMessageDiv.style.display = 'block'; // Show the error message
            errorMessageDiv.textContent = 'Please enter your email address.';
        } else {
            // Here you would typically send the form data using fetch/XHR/Ajax and handle response
            // For now, let's just simulate a successful submission
            const successMessageDiv = document.querySelector('.w-form-done');
            successMessageDiv.style.display = 'block';
            successMessageDiv.textContent = 'Thank you! Your email has been submitted.';
        }
    });
});

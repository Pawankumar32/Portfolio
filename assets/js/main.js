/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*=============== MENU SHOW ===============*/
// Validate if constant exists
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*=============== MENU HIDDEN ===============*/
// Validate if constant exists
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // when we click on each nav__link, we remove the show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // when scroll is greater then 50 viewport height, add the blur-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const form = document.getElementById('contact-form');
const message = document.getElementById('contact-message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_k5tsjfq', 'template_cja2ll1', '#contact-form', 'kE9AuXtTqBf7IK2WC')
        .then(function (response) {
            message.textContent = 'Message sent successfully ✅';

            setTimeout(() => {
                message.textContent = '';
            }, 5000);

            form.reset();
        })
        .catch(function (error) {
            message.textContent = 'Message not sent (service error) ❌';
            console.error('EmailJS Error:', error);
        });
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // when the scroll is higher then 350 viewport height, add the show-scroll class to
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionID = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionID + ']')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*======= Simplify version of [SCROLL SECTIONS ACTIVE LINK] code =======*/
// const sections = document.querySelectorAll('section[id]');

// function activateSectionLink() {
//   const scrollY = window.pageYOffset;

//   sections.forEach(section => {
//     const sectionTop = section.offsetTop - 58;
//     const sectionHeight = section.offsetHeight;
//     const sectionID = section.getAttribute('id');
//     const sectionLink = document.querySelector(`.nav__menu a[href*='${sectionID}']`);

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//       sectionLink.classList.add('active-link');
//     } else {
//       sectionLink.classList.remove('active-link');
//     }
//   });
// }

// window.addEventListener('scroll', activateSectionLink);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    //reset : true //Animation repeat
})

sr.reveal(`.home__data,.home__social, .contact__container,.footer__container`)
sr.reveal(`.home__image`, { origin: 'bottom' })
sr.reveal(`.about__image,.skills__data`, { origin: 'left' })
sr.reveal(`.about__data,.skills__content`, { origin: 'right' })
sr.reveal(`.service__card, .projects__card`, { interval: 100 })
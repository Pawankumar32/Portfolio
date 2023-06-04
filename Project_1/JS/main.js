// Active navbar

document.addEventListener("DOMContentLoaded", function () {
  let nav = document.querySelector(".navigation-wrap");

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
      nav.classList.add("scroll-on");
    } else {
      nav.classList.remove("scroll-on");
    }
  };
});


// nav hide

// Get the necessary elements
// let navbarToggler = document.querySelector('.nav-link');
let navbarToggler = document.querySelector('.navbar-collapse');
let navbarCollapse = document.querySelector('.navbar-collapse.collapse');

// Add click event listener to the navbar toggler button
navbarToggler.addEventListener('click', function () {
  // Toggle the 'show' class on the navbar collapse element
  navbarCollapse.classList.toggle('show');
});


// counter design
document.addEventListener("DOMContentLoaded", () => {
  function counter(id, start, end, duration) {
    let obj = document.getElementById(id),
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, step);
  }
  counter("count1", 100, 1139, 2000);
  counter("count2", 0, 1675, 2500);
  counter("count3", 150, 1498, 3000);
  counter("count4", 0, 2436, 3500);
}); 
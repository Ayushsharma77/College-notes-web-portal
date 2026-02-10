$(document).ready(function () {

  // 1. SLIDER LOGIC
  // This automatically finds all 5 slides and loops them
  let currentSlide = 0;
  const slides = $('.slide');
  const totalSlides = slides.length;

  function showNextSlide() {
    slides.removeClass('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    $(slides[currentSlide]).addClass('active');
  }

  // Change slide every 4 seconds
  setInterval(showNextSlide, 4000);

  // 2. LIVE COUNTER LOGIC (jQuery)
  let counterStarted = false;

  $(window).scroll(function () {
    var top_of_element = $('#stats').offset().top;
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    if (bottom_of_window > top_of_element && !counterStarted) {
      counterStarted = true;
      $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).data('count')
        }, {
          duration: 2000,
          easing: 'swing',
          step: function (now) {
            $(this).text(Math.ceil(now));
          }
        });
      });
    }
  });

  $(document).ready(function () {
    const slides = $('.slide');
    const dots = $('.dot');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 5000);

    function updateSlider(index) {
      // Remove active class from everything
      slides.removeClass('active');
      dots.removeClass('active');

      // Add active class to the chosen index
      slides.eq(index).addClass('active');
      dots.eq(index).addClass('active');
      currentSlide = index;
    }

    function nextSlide() {
      let next = (currentSlide + 1) % slides.length;
      updateSlider(next);
    }

    // Manual click on dots
    dots.click(function () {
      const targetIndex = $(this).data('index');

      // Stop the auto-timer so it doesn't jump immediately after clicking
      clearInterval(slideInterval);

      updateSlider(targetIndex);

      // Restart the timer
      slideInterval = setInterval(nextSlide, 5000);
    });
    // Next Button Click
    $('.next').click(function () {
      clearInterval(slideInterval);
      let next = (currentSlide + 1) % slides.length;
      updateSlider(next);
      slideInterval = setInterval(nextSlide, 5000);
    });

    // Previous Button Click
    $('.prev').click(function () {
      clearInterval(slideInterval);
      let prev = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider(prev);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });



  // 3. COURSE SEARCH FUNCTIONALITY
  $("#courseSearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".subject-list li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // 4. SMOOTH SCROLLING FOR MENU
  $("nav a").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800);
    }
  });

});
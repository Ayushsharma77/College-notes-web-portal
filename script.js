$(document).ready(function() {
  
  // 1. SIMPLE SLIDER LOGIC
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
  // Check if stats section is in view then trigger animation
  let counterStarted = false;

  $(window).scroll(function() {
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

  // 3. COURSE SEARCH FUNCTIONALITY
  $("#courseSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".subject-list li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // 4. SMOOTH SCROLLING FOR MENU
  $("nav a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800);
    }
  });

});
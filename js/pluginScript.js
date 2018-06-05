$(document).ready(function () {
    AOS.init({
        disable: window.innerWidth < 1024
    });

    $('.client-carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: false,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 5000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });

    $("a").on('click', function (event) {
        // this.hash zwraca wartość ID po URL, a w tym przypadku po kliknięciu w element 'a'.
        if (this.hash !== "") { // Upewniamy się, ze hash nie jest pusty.
            event.preventDefault();
            $('html, body').animate({ // Metoda jQuery do animacji uzyta po to, zeby uzyskać efekt płynnego scrollu.
                scrollTop: $(this.hash).offset().top
            }, 700);
        }
    });
});

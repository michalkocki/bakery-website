$(document).ready(function () {

    $("a").on('click', function (event) {
        // this.hash zwraca wartość ID po URL, a w tym przypadku po kliknięciu w element 'a'.
        if (this.hash !== "") { // Upewniamy się, ze hash nie jest pusty.
            event.preventDefault();
            $('html, body').animate({ // Metoda jQuery do animacji uzyta po to, zeby uzyskać efekt płynnego scrollu.
                scrollTop: $(this.hash).offset().top
            }, 700);
        }
    });

    $('.popup-wrapper').hide();
    $('#map-warsaw').hide();
    $('#map-lublin').hide();
    $('#map-gdynia').hide();
    $('#map-wroclaw').hide();

    $('#close-map').click(function () {
        $('.popup-wrapper').fadeOut(100);
        $('#map-warsaw').fadeOut(100);
        $('#map-lublin').fadeOut(100);
        $('#map-gdynia').fadeOut(100);
        $('#map-wroclaw').fadeOut(100);
        $('body').removeClass('scroll-lock');
    });

    $('#show-warsaw').click(function () {
        $('body').addClass('scroll-lock');
        $('.popup-wrapper').fadeIn(100);
        $('#map-warsaw').fadeIn(100);
    });

    $('#show-lublin').click(function () {
        $('body').addClass('scroll-lock');
        $('.popup-wrapper').fadeIn(100);
        $('#map-lublin').fadeIn(100);
    });

    $('#show-gdynia').click(function () {
        $('body').addClass('scroll-lock');
        $('.popup-wrapper').fadeIn(100);
        $('#map-gdynia').fadeIn(100);
    });

    $('#show-wroclaw').click(function () {
        $('body').addClass('scroll-lock');
        $('.popup-wrapper').fadeIn(100);
        $('#map-wroclaw').fadeIn(100);
    });

});
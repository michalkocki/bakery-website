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

    showMapOnClick('#show-warsaw', '#map-warsaw');
    showMapOnClick('#show-lublin', '#map-lublin');
    showMapOnClick('#show-gdynia', '#map-gdynia');
    showMapOnClick('#show-wroclaw', '#map-wroclaw');

    /* Checking Regex */

    let nameRegex = /^[a-ząśżźćęółń]+\s*[a-ząśżźćęółń]+(?:\s*-\s*)?[a-ząśżźćęółń]+$/i;
    let mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let addressRegex = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s,.'-]{3,}$/;
    let zipRegex = /(\d{2}-\d{3})/;
    let phoneRegex = /\+48 [0-9\s]{11}/;
    checkRegex('#name', nameRegex);
    checkRegex('#mail', mailRegex);
    checkRegex('#address', addressRegex);
    checkRegex('#city', addressRegex);
    checkRegex('#zip', zipRegex);
    checkRegex('#number', phoneRegex);

});

function showMapOnClick(id, mapid) {
    $(id).click(function () {
        $('body').addClass('scroll-lock');
        $('.popup-wrapper').fadeIn(100);
        $(mapid).fadeIn(100);
    });
}

function checkRegex(id, regex) {
    $(id).on('keypress keydown keyup', function () {
        if (!$(id).val().match(regex)) {
            $(id).removeClass('valid');
            $(id).addClass('invalid');
            $('#doneButton').prop("disabled", true);
        } else {
            $(id).removeClass('invalid');
            $(id).addClass('valid');
            $('#doneButton').prop("disabled", false);
        }
    });
}

/* Formatting input boxes */

var numberFormat = new Cleave('.nr', {
    blocks: [3,3,3,3],
    prefix: '+48'
})

var zipCodeFormat = new Cleave('.zc', {
    blocks: [2,3],
    delimiter: '-'
})
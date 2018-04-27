$(document).ready(function () {
    $("a").on('click', function (event) {
        // this.hash zwraca wartość ID po URL, a w tym przypadku po kliknięciu w element 'a'.
        if (this.hash !== "") { // Upewniamy się, ze hash nie jest pusty.
            event.preventDefault();
            $('html, body').animate({ // Metoda jQuery do animacji uzyta po to, zeby uzyskać efekt płynnego scrollu.
                scrollTop: $(this.hash).offset().top
            }, 700, function () {
                window.location.hash = this.hash; // Dodawanie id do URL.
            });
        }
    });
});
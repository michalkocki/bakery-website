$(document).ready(function () {

    $('.popup-wrapper').hide();
    $('#map-warsaw').hide();
    $('#map-lublin').hide();
    $('#map-gdynia').hide();
    $('#map-wroclaw').hide();
    $('#order-personal-sumup').hide();
    $('#order-details').hide();


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
        } else {
            $(id).removeClass('invalid');
            $(id).addClass('valid');
        }
        var invalidName = $('#name').hasClass("invalid");
        var invalidMail = $('#mail').hasClass("invalid");
        var invalidAddress = $('#address').hasClass("invalid");
        var invalidCity = $('#city').hasClass("invalid");
        var invalidZip = $('#zip').hasClass("invalid");
        var invalidNumber = $('#number').hasClass("invalid");
        if (invalidAddress || invalidCity || invalidMail || invalidName || invalidNumber || invalidZip)
            $('#doneButton').prop('disabled', true);
        else $('#doneButton').prop('disabled', false);

    });
}

function submitPersonal() {
    var name = document.getElementById('name').value;
    var street = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var mail = document.getElementById('mail').value;
    var phone = document.getElementById('number').value;
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userStreet', street);
    sessionStorage.setItem('userCity', city);
    sessionStorage.setItem('userZip', zip);
    sessionStorage.setItem('userMail', mail);
    sessionStorage.setItem('userPhone', phone);
}


function fetchToEdit() {
    document.getElementById('name').value = sessionStorage.getItem('userName');
    document.getElementById('address').value = sessionStorage.getItem('userStreet');
    document.getElementById('city').value = sessionStorage.getItem('userCity');
    document.getElementById('zip').value = sessionStorage.getItem('userZip');
    document.getElementById('mail').value = sessionStorage.getItem('userMail');
    document.getElementById('number').value = sessionStorage.getItem('userPhone');
}


/* Formatting input boxes */

var numberFormat = new Cleave('.nr', {
    blocks: [3, 3, 3, 3],
    prefix: '+48'
})

var zipCodeFormat = new Cleave('.zc', {
    blocks: [2, 3],
    delimiter: '-'
})
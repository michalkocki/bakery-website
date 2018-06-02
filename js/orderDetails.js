$(document).ready(function () {
    $('#prompt-container').hide();
    $('#prompt').hide();
    $('#starter-selected').hide();
    $('#premium-selected').hide();
    $('#beverage-selected').hide();
    $('#onVisa').hide();
    $('#onMaestro').hide();
    $('#onMaster').hide();
    $('#onAmex').hide();
    $('#payment').hide();
    
    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        animationDuration: 100,
        delay: 0,
        animation: 'grow'
    });

    $('#plans').change(function () {
        switch ($(this).val()) {
            case 'one-meal':
                $('#one-meal-selected').slideDown();
                $('#starter-selected').slideUp();
                $('#premium-selected').slideUp();
                break;
            case 'premium':
                $('#one-meal-selected').slideUp();
                $('#starter-selected').slideUp();
                $('#premium-selected').slideDown();
                break;
            case 'starter':
                $('#one-meal-selected').slideUp();
                $('#starter-selected').slideDown();
                $('#premium-selected').slideUp();
                break;
            default:
                $('#one-meal-selected').slideUp();
                $('#starter-selected').slideUp();
                $('#premium-selected').slideUp();
                break;
        }

        if ($('#plans').val() == 'premium') {
            document.getElementById('beverage-price').innerText = 'Free';
        } else {
            document.getElementById('beverage-price').innerHTML = '<span>$</span> 5.99';
        }

    });

    // CREDIT CARD VALIDATION

    let visaRegex = /(4[0-9]{12}(?:[0-9]{3})?)/;
    let masterRegex = /^5[1-5][0-9]{14}$/;
    let maestroRegex = /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/;
    let amexRegex = /^3[47][0-9]{13}$/;
    let cvvRegex = /^[0-9]{3,4}$/;
    let cardRegex = /^[0-9]{14,16}$/;
    let dateRegex = /(0[1-9]|10|11|12)\/[0-9]{2}$/;

    function checkRegex(id, regex) {
        $(id).on('keypress keydown keyup', function () {
            if (!$(id).val().match(regex)) {
                $(id).removeClass('valid');
                $(id).addClass('invalid');
            } else {
                $(id).removeClass('invalid');
                $(id).addClass('valid');
            }
            var invalidExpDate = $('#exp-date').hasClass("invalid");
            var invalidCVV = $('#sec-code').hasClass("invalid");
            var invalidCard = $('#card-number').hasClass("invalid");

            if (invalidExpDate || invalidCVV || invalidCard)
                $('#allOrderSet').prop('disabled', true);
            else $('#allOrderSet').prop('disabled', false);
        });
    }

    function checkCardRegex(id, regex, off, on) {
        $(id).on('keypress keydown keyup', function () {

            if ($(id).val().match(regex)) {
                $(off).hide();
                $(on).show();
            } else {
                $(on).hide();
                $(off).show();
            }
        });
    }

    checkCardRegex('#card-number', masterRegex, '#offMaster', '#onMaster');
    checkCardRegex('#card-number', visaRegex, '#offVisa', '#onVisa');
    checkCardRegex('#card-number', maestroRegex, '#offMaestro', '#onMaestro');
    checkCardRegex('#card-number', amexRegex, '#offAmex', '#onAmex');

    checkRegex('#sec-code', cvvRegex);
    checkRegex('#exp-date', dateRegex);
    checkRegex('#card-number', cardRegex);





    $('#beverage').change(function () {
        if ($(this).prop("checked")) {
            $('#beverage-selected').slideDown();
        } else {
            $('#beverage-selected').slideUp();
        }
    });

    $('#finish-order').click(function () {
        $('#prompt-container').fadeIn();
        $('#prompt').fadeIn();
    });

    $('#cancelPrompt').click(function () {
        $('#prompt-container').fadeOut();
        $('#prompt').fadeOut();
    });

    $('#acceptPrompt').click(function () {
        detailsToSessionStorage();
        $('#prompt-container').fadeOut();
        $('#prompt').fadeOut();
        $('#order-personal-sumup').slideUp();
        $('#order-details').slideUp();
        $('#payment').slideDown();
    });

});

function fetchPersonalSumup() {
    document.getElementById('fetchedName').innerText = 'Full name: ' + sessionStorage.getItem('userName');
    document.getElementById('fetchedAddress').innerText = 'Address: ' + sessionStorage.getItem('userStreet') + ', ' + sessionStorage.getItem('userCity') + ' ' + sessionStorage.getItem('userZip');
    document.getElementById('fetchedMail').innerText = 'Mail: ' + sessionStorage.getItem('userMail');
    document.getElementById('fetchedPhone').innerText = 'Phone: ' + sessionStorage.getItem('userPhone');
}

function editPersonalInformation() {
    window.location = "order.html";
}

function detailsToSessionStorage() {
    var selectedPlan = $('#plans').val();
    var additionalInfo = $('input[name=vegetables]:checked').val();
    if (document.getElementById('beverage').checked) {
        var beverageOrdered = 'yes';
    } else {
        var beverageOrdered = 'no';
    }
    sessionStorage.setItem('selected plan', selectedPlan);
    sessionStorage.setItem('additional info', additionalInfo);
    sessionStorage.setItem('beverage', beverageOrdered);
}

function creditCardToSessionStorage() {
    var cardNumber = $('#card-number').val();
    var expDate = $('#exp-date').val();
    var cvvCode = $('#sec-code').val();
    sessionStorage.setItem('Card Number', cardNumber);
    sessionStorage.setItem('Expiration date', expDate);
    sessionStorage.setItem('CVV', cvvCode);
}

function fetchEverything() {
    fetchPersonalSumup();
    document.getElementById('fetchedPlan').innerText = 'Plan: ' + sessionStorage.getItem('selected plan');
    document.getElementById('fetchedInfo').innerText = 'Additional info: ' + sessionStorage.getItem('additional info');
    document.getElementById('fetchedBeverage').innerText = 'Beverage? ' + sessionStorage.getItem('beverage');
    document.getElementById('fetchedCard').innerText = 'Card number: ' + sessionStorage.getItem('Card Number');
    document.getElementById('fetchedExp').innerText = 'Expiry date: ' + sessionStorage.getItem('Expiration date');
    document.getElementById('fetchedCvv').innerText = 'CVV code: ' + sessionStorage.getItem('CVV');

}

var expDate = new Cleave('#exp-date', {
    blocks: [2, 2],
    delimiter: '/'
})
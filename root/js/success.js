function getDigits() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var digitsHeading = document.createElement('p');
    digitsHeading.textContent = 'Card ending in: '
    digitsHeading.textContent += urlParams.get('lastFour');

    return digitsHeading;
}
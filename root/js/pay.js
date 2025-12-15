function getTotal() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var totalHeading = document.createElement('h2');
    totalHeading.textContent = urlParams.get('cartTotal');

    if (urlParams.get('cartTotal') == ''){ //If cart empty, then empty string sent in url as query
        totalHeading.textContent = "£0.00 (Cart was empty!)";
    }

    return totalHeading;
}

window.onload = () => {
    //Dynamically generate years for expiry
    const expiryYearSelect = document.getElementById('expiry-year');
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10;
    const endYear = currentYear + 20;
    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.text = year;
        option.value = year;
        expiryYearSelect.add(option);
    }

    //Dynamically generate months for expiry
    const expiryMonthSelect = document.getElementById('expiry-month');
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.text = month;
        option.value = month;
        expiryMonthSelect.add(option);
    }

    document.getElementById('submit-button').addEventListener('click', e => {
        e.preventDefault();
        //Save all user inputs
        const cardNum = document.getElementById('card-number').value;
        const expMonth = document.getElementById('expiry-month').value;
        const expYear = document.getElementById('expiry-year').value;
        const cvv = document.getElementById('cvv').value;

        //CardNum Val
        if (!cardNum.match(/^5[1-5][0-9]{14}$/)) {
            alert('Invalid card number');
            return false;
        }

        //ExpDate Val
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        if ((parseInt(expYear) < currentYear) || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
            alert('Card expired');
            return false;
        }

        //CVV Val
        if (!cvv.match(/^[0-9]{3,4}$/)) {
            alert('Invalid CVV');
            return false;
        }

        // Send to API if passed all if statements
        const data = {
            "master_card": parseInt(cardNum),
            "exp_month": parseInt(expMonth),
            "exp_year": parseInt(expYear),
            "cvv_code": cvv,
        };
        console.table(data);
        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard";

        fetch(url, {  //2 parameters (where and what to fetch)
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw 'error :(';
            }
        })
        .then(resJ => {
            alert(resJ['message']);
            const lastFourDigits = cardNum.slice(-4);
            location.href = `success.html?lastFour=${lastFourDigits}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}
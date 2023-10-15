// varibales
const form = document.querySelector("#request-quote");



// event
document.addEventListener("DOMContentLoaded", afterLoad);
form.addEventListener("submit", checkSubmit);


// functions
// for loading the page 
function afterLoad() {
    displayYears()
}

// validation for checking form
function checkSubmit(e) {
    // not load when submit form
    e.preventDefault();
    // select values
    const make = document.querySelector("#make").value
    const year = document.querySelector("#year").value
    const level = document.querySelector("input[name='level']:checked").value

    // check form validity
    if (make === "" || year === "" || level === "") {
        console.log("error :(");
        displayError("لطفا فرم را کامل پر کنید")
    } else {
        // console.log(insuranceCase(make, year, level.value));

        let insuranse = {
            make: make,
            year: year,
            level: level
        }
        calculatePrice(insuranse)
    }
}

// value of form
// function insuranceCase(inCarMake, inYear, inLevel) {
//     return {
//         carMake: inCarMake,
//         Yera: inYear,
//         level: inLevel
//     }
// }


function calculatePrice(info) {
    let price = 0,
        base = 2000000
    // + Calculate Make 
    /* 
    make:1      =>      1.15
    make:2      =>      1.30
    make:3      =>      1.80
    */

    switch (info.make) {
        case "1":
            price = base * 1.15
            break;

        case "2":
            price = base * 1.30
            break;
        case "3":
            price = base * 1.80
            break;
    }

    // + Calculate Year
    // get the year

    // change persion string to english number
    let year = info.year
    diffrence = function (year) {
        let
            persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
            fixNumbers = function (str) {
                if (typeof str === 'string') {
                    for (var i = 0; i < 10; i++) {
                        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                    }
                }
                return str;
            };
        let now = new Date().toLocaleDateString("fa-IR");
        let nowYear = now.slice(0, 4)
        let max = parseInt(fixNumbers(nowYear))


        year = max - year
        return year
    }

    // price
    price = price - ((diffrence(year) * 3) / 100) * price


    let level = info.level
    price = calculateLevel(level, price)
    console.log(price);


}

function calculateLevel(level, price) {
    /*
        basic   =>  increase 30%
        complete=>  increase 50%
    */

    if (level == 'basic') {
        // price = price + (price * 0.30) (bara mehrdad)
        price = price * 1.3
    } else {
        price = price * 1.5
    }
    return price
}
// error function

function displayError(msg) {
    // creat div
    const errorDiv = document.createElement("div")
    // add class to div
    errorDiv.classList = "error"
    // pass massage to div
    errorDiv.innerText = msg
    // pass div to DOM
    form.insertBefore(errorDiv, document.querySelector(".form-group"))
    // after 5sec remove class 
    setTimeout(() => {
        // remov class from error div
        document.querySelector(".error").remove()
    }, 5000);
}



function displayYears() {

    // new date
    let now = new Date().toLocaleDateString('fa-IR')
    // get full persion year
    now.slice(0, 4)

    // change persion string to english number

    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };

    // max year
    let maxYear = parseInt(fixNumbers(now))
    // min year
    let minYear = maxYear - 20

    const selectYear = document.querySelector('#year')

    // creat optin for select
    let creartOption = document.createElement('option')
    // pass empty value to option
    creartOption.value = ""
    // pass defult text to option
    creartOption.innerText = `- انتخاب کن-`
    // send option to select
    selectYear.appendChild(creartOption)
    // create loop for find years
    for (let i = maxYear; i >= minYear; i--) {
        // create option element
        let creartOption = document.createElement('option')
        // pass value to option
        creartOption.value = i
        // pass text to option element
        creartOption.innerText = `سال ${i}`
        // send option to select element
        selectYear.appendChild(creartOption)
    }


}
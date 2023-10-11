// selectors
const car = document.querySelector('#car');
const carYear = document.querySelector("#carYear")
const typeInput = document.querySelectorAll(".typeInput")
const factorPrice = document.querySelector(".factorPrice")
const form = document.querySelector("#form")
const facto = document.querySelector("#factor")


// event
form.addEventListener("submit", checkForm)
document.addEventListener("DOMContentLoaded", loadPage)


// founctions

function loadPage() {
    // action the function
    get20YearsAgo()
}


function checkForm(e) {
    e.preventDefault();

    const carType = car.value
    const year = carYear.value
    const level = document.querySelector(".typeInput[name='type']:checked").value
    // condition of form
    if (carType === "" || year === "" || level === "") {
        alert("Please fill the box ")
        // if dosen't fill in the box function dosen't work 'cuase of (return)
        return
    }

    // type insurance
    typeInsurance()
    // tempalte of factor
    factorInsuranceToDom()

    formulInsurance()
}
// DOM functions

// template of insurance factor
function factorInsurance(carType, carYear, insuranceType, price) {
    return `
    <div><span> مدل خودرو : </span> <span>${carType}</span> </div>
    <div><span>سال ساخت : </span> <span>${carYear}</span> </div>
    <div><span>مدل بیمه : </span> <span>${insuranceType}</span> </div>
    <div><span>قیمت بیمه : </span> <span>${price}</span> </div>`
}
// sending factor template to DOM
function factorInsuranceToDom() {
    let carModel = car.options[car.selectedIndex].text;
    let carYears = carYear.value
    // made div in show that in the div (after buytton )
    factorPrice.innerHTML = factorInsurance(carModel, carYears, typeInsuranseChecked)
}
// send years to select element
function yearTemplate(value, year) {
    return `<option value="${value}">${year}</option>`
}

function loading(params) {

}

function getYearsNow() {
    // get new date and just year
    let year = new Date().toLocaleDateString('fa-IR')

    let persianYear = year.slice(0, 4)

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

    let maxYear = parseInt(fixNumbers(persianYear))

    return maxYear
}

// finde 20 years ago
function get20YearsAgo(params) {
    // select new year
    let maxYear = getYearsNow()
    let minYear = getYearsNow() - 20

    carYear.insertAdjacentHTML("beforeend", yearTemplate("", "انتخاب سال"))



    // with for method we find 20 years age
    for (let i = maxYear; i >= minYear; i--) {
        carYear.insertAdjacentHTML("beforeend", yearTemplate(i, `${i} سال`))
    }
}


function findeYearValue(params) {
    let maxYear = getYearsNow()
    let minYear = getYearsNow() - 20
    let yearCar = carYear.options[carYear.selectedIndex].text

    let x = 0
    for (let i = maxYear; i >= minYear; i--) {
        x += 0.5
        if (yearCar == i) {
            console.log(x);
            return x
        }

    }
}


let typeInsuranseChecked;

function typeInsurance() {
    const level = document.querySelector(".typeInput[name='type']:checked")

    if (level) {
        typeInsuranseChecked = level.nextElementSibling.textContent
        console.log(typeInsuranseChecked);
        if (level.vale = "base") {
            console.log(30);
        } else {
            console.log(50);
        }
    }
}


function formulInsurance() {

}
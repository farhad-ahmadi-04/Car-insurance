// selectors
const car = document.querySelector('#car');
const carYear = document.querySelector("#carYear")
const typeInput = document.querySelectorAll(".typeInput")
const factorPrice = document.querySelector(".factorPrice")


const facto = document.querySelector("#factor")
facto.addEventListener("click", () => {
    // if user dosen't choose type of insurance
    if (!typeInput[0].checked && !typeInput[1].checked) {
        alert("Please fill the box ")
        // if dosen't fill in the box function dosen't work 'cuase of (return)
        return
    }

    // type insurance
    typeInsurance()
    // tempalte of factor
    factorInsuranceToDom()

    formulInsurance()
})
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
    let carModel = car.value
    let carYears = carYear.value
    // made div in show that in the div (after buytton )
    factorPrice.innerHTML = factorInsurance(carModel, carYears, typeInsuranseChecked)
}
// send years to select element
function yearTemplate(year) {
    return `<option value="">${year}</option>`
}

function loading(params) {

}
// error function
function error(params) {
    // if user dosen't choose type of insurance
    alert("Please fill in the box ")
    // if dosen't fill in the box function dosen't work 'cuase of (return)
    return
}

// Computational functions
function carPrice() {
    let carName = car.textContent
    if (carName = "پراید") {
        return 1.15
    } else if (carName = "پورشه") {
        return 1.80
    } else if (carName == "اپتیما") {
        return 2
    }
}

function getYearsNow(params) {
    // get new date and just year
    let year = new Date().getFullYear()
    console.log(year);
    return year
}

// finde 20 years ago
function get20YearsAgo(params) {
    // select new year
    let x = getYearsNow()
    // send new year to DOM
    carYear.insertAdjacentHTML("beforeend", yearTemplate(x))
    // with for method we find 20 years age
    for (let i = 0; i < 20; i++) {
        // every time year - 1, sending toDOM
        x -= 1
        carYear.insertAdjacentHTML("beforeend", yearTemplate(x))
    }
}
// action the function
get20YearsAgo()

function findeYearValue(params) {
    let yearCar = carYear.options[carYear.selectedIndex].text

    let x = 0
    for (let i = 2023; i >= 2003; i--) {
        x += 0.5
        if (yearCar == i) {
            return x
        }

    }
}


let typeInsuranseChecked;

function typeInsurance() {
    // each input user select, find next element text contain
    let y
    typeInput.forEach((item) => {
        if (item.checked) {
            typeInsuranseChecked = item.nextElementSibling.textContent
            // if text conent be that return 30
            if (typeInsuranseChecked == "ساده - شخص ثالث") {
                y = 30
            }
            // if text conent be that return 50
            if (typeInsuranseChecked == "کامل - شخص ثالث و بیمه بدنه") {
                y = 50
            }
            console.log(y);
            return y
        }
    });
}


function formulInsurance() {
    // base insurance
    let base = 2000000;
    // price of car * base
    let mashin = carPrice() * base
    let takhfif = (mashin * findeYearValue()) / 100
    let x = mashin - takhfif
    let incruse = (base * typeInsurance()) / 100
    console.log(typeInsurance());

    let factor = x + incruse
    console.log(factor);
}
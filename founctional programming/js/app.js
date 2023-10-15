// varibales...........
const form = document.querySelector("#request-quote");



// event.................
document.addEventListener("DOMContentLoaded", afterLoad);
form.addEventListener("submit", checkSubmit);

// information storage.............. 
const config = {
    // prices of insurance
    prices: {
        price: 0, // default price of insurance
        basePrice: 2000000, // base of insurance price,
    },
    // The coefficient of cars
    carsPrace: {
        make1: 1.15, // praid coefficient
        make2: 1.3, // optima coefficient
        make3: 1.8, // porsh coefficient
    },
    // type of insurance value
    typeOfInsurance: {
        basic: 1.3, // 30%
        complete: 1.5, // 50%
    },
    yearsNumber: 20, // for min year
};


// functions.....................

// for loading the page 
function afterLoad() {
    displayYears()
}

// make year
function displayYears() {
    let minYear = currentYear() - config.yearsNumber
    const selectYear = document.querySelector('#year')
    // defult year
    years(selectYear, "", "- انتخاب سال -")
    // 20 years ago
    for (let i = currentYear(); i >= minYear; i--) {
        years(selectYear, i, `سال ${i}`)
    }
}

// years for pass to DOM
// + parametr1 : posision for year in DOM
// + parametr2 : value of year
// + parametr3 : text of year in select element
// > output : showing current year until 20 years ago in DOM
function years(selectYear, i, yearText) {
    // create option element
    let creartOption = document.createElement('option')
    // pass value to option
    creartOption.value = i
    // pass text to option element
    creartOption.innerText = yearText
    // send option to select element
    selectYear.appendChild(creartOption)
}

// find current persian year
// return : current year
function currentYear() {
    // new date
    let now = new Date().toLocaleDateString('fa-IR')
    // get full persion year
    now.slice(0, 4) // remove month and day
    // max year
    let maxYear = parseInt(englishNumber(now)) // change to number type with parseInt
    return maxYear

}

// change persian string to english string
//  parametr: !english current year string > get number with type of string
// return : english number (type of string)
function englishNumber(str) {
    let
        // persian number (perasian key board)
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        // arabic number (arabic key board)
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g]
    // type of str should be string
    if (typeof str === 'string') {
        // start loop from 0 to 9 ( each key board have 10 key numbers )
        for (var i = 0; i < 10; i++) {
            // replace persian number to english number (type of string)
            // replace arabic number to english number (type of string)
            str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
    }
    return str;
}

// checking form
// output : validaition
function checkSubmit(e) {
    // not refresh page when submit the form
    e.preventDefault();
    // select values
    const make = document.querySelector("#make").value
    const year = document.querySelector("#year").value
    const level = document.querySelector("input[name='level']:checked").value

    // check form validity
    afterCheckForm(make, year, level)
}

// validation form
// + parameter1 : value car input
// + parameter2 : value year input
// + parameter3 : value type of insurance
// returns : value of status
function validaition(make, year, level) {
    let status = false
    if (make === "" || year === "" || level === "") {
        status = false
    } else {
        status = true
    }
    return status
}

// if validate is true call insuranceCase and if validate is false call displayError function
// parameter1 : the value of car
// parameter2 : the value of year
// parameter3 : the value of type of insurance
// parameter4 : the error message
function afterCheckForm(make, year, level, error = "لصفا فرم را پر کنید") {
    if (validaition(make, year, level)) {
        insuranceCase(make, year, level)
    } else {
        displayError(error)
    }
}

// error function
// + parametr : massage for error
// > output : showing error in DOM for 5seconds
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

// value of form inputs
// + parameter1 : value of car input
// + parameter2 : value of year input
// + parameter3 : value of type of insutance
function insuranceCase(inCarMake, inYear, inLevel) {
    let info = {
        carMake: inCarMake,
        carYear: inYear,
        level: inLevel
    }
    // pass object to calculatePrice function
    calculatePrice(info)
}

// price of insurance
// parameter1 : object of value from input  
// return : price of insurance
function calculatePrice(info) {
    let price = config.prices.price,
        base = config.prices.basePrice
    // formula for insurance
    price = (CalculateCar(price, base, info) - ((yearDiscount(info) * 3) / 100) * CalculateCar(price, base, info)) * CalculateLevl(info)
    console.log(price);
}

// Insurance price based on car factor
// parameter1 : price of insurance
// parameter2 : base price of insurance
// parameter3 : object of value from input 
// return : price 
function CalculateCar(price, base, info) {
    switch (info.carMake) {
        case "1":
            price = base * calculateOfCar(info)
            break;
        case "2":
            price = base * calculateOfCar(info)
            break;
        case "3":
            price = base * calculateOfCar(info)
            break;
    }
    return price
}

// Discount of year
// parameter : object of value from input 
// return = The year chosen by the user - current year
function yearDiscount(info) {
    let year = info.carYear
    year = currentYear() - year
    return year
}

// The coefficient of cars According to car input value
// parameter : object of value from input 
// output : The coefficient of cars
function calculateOfCar(info) {
    let carValue = info.carMake
    switch (carValue) {
        case "1":
            return config.carsPrace.make1
        case "2":
            return config.carsPrace.make2
        case "3":
            return config.carsPrace.make3
    }
}

// It takes the type of insurance chosen by the user and gives a numerical insurance type based on the value
// parameter : object of value from input 
// return : number type of insurance
function CalculateLevl(info) {
    let level = info.level
    if (level == 'basic') {
        // price = price + (price * 0.30)
        return config.typeOfInsurance.basic
    } else {
        return config.typeOfInsurance.complete
    }
}
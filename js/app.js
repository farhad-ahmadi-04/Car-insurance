
// varibales...........
const form = document.querySelector("#request-quote");
let htmlUi = new Html()




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
    htmlUi.displayYears()
}

// checking form
// output : validaition
function checkSubmit(e) {
    // not refresh page when submit the form
    e.preventDefault();

    // selects
    let make = document.querySelector("#make").value
    let makeText = htmlUi.textCar(make)
    let year = document.querySelector("#year").value
    let level = document.querySelector("input[name='level']:checked").value
    let levelText = "";
    if (level == "basic") {
        levelText = "ساده"
    } else {
        levelText = "کامل"
    }

    // check form validity
    afterCheckForm(make, makeText, year, level, levelText)
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
function afterCheckForm(make, makeText, year, level, levelText, error = "لصفا فرم را پر کنید") {
    if (validaition(make, year, level)) {
        let insuranse = new InsuranceProcces(make, makeText, year, level, levelText)
        insuranse.insuranceCase()
    } else {
        htmlUi.displayError(error)
    }
}

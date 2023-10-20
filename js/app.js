// varibales
const form = document.querySelector("#request-quote");
let html = new HtmlUi()



// event
document.addEventListener("DOMContentLoaded", afterLoad);
form.addEventListener("submit", checkSubmit);


// functions
// for loading the page 
function afterLoad() {
    html.displayYears()
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
        html.displayError("لطفا فرم را کامل پر کنید")
    } else {
        let insuranse = {
            make: make,
            year: year,
            level: level
        }
        let factor = new InsuranceProcces(make, year, level)
        html.showFactor(factor.calculatePrice(insuranse), insuranse)
    }
}
// error function
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
    const level = document.querySelector("input[name='level']:checked")

    // check form validity
    if (make === "" || year === "" || level === "") {
        console.log("error :(");
    } else {
        console.log("allRight :)");
    }


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
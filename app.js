// farhad.13ahmadi.83@gmail.com
const carname = document.querySelector('#car')
const result = document.querySelector('.result input')
const main = document.querySelector('#main')
const ansewr = document.querySelector('#ansewr')
let InsureType = document.querySelectorAll('.InsureType input')
console.log(InsureType);
// when click on button
result.addEventListener('click', sendToDom)

class Price {
    constructor(name, carYear, type) {
        this.name = name
        this.carYear = carYear
        this.type = type
    }
    userInsure() {

        this.name = 4241900
        return this.name
    }
    yearThierdPerson() {
        let price;
        if (this.carYear == "2 Year") {
            price = this.name * 0.05
        } else if (this.carYear == "3 Year") {
            price = this.name * 0.10
        } else if (this.carYear == "4 Year") {
            price = this.name * 0.15
        } else if (this.carYear == "5 Year") {
            price = this.name * 0.20
        } else if (this.carYear == "6 Year") {
            price = this.name * 0.30
        } else if (this.carYear == "7 Year") {
            price = this.name * 0.35
        } else if (this.carYear == "8 Year") {
            price = this.name * 0.40
        } else if (this.carYear == "9 Year") {
            price = this.name * 0.45
        } else if (this.carYear == "14 Year") {
            price = this.name * 0.70
        }
        return price
    }
    bodyinsurance() {
        let price;
        if (this.carYear == "2 Year") {
            price = this.name * 0.40
        } else if (this.carYear == "3 Year") {
            price = this.name * 0.50
        } else if (this.carYear == "4 Year") {
            price = this.name * 0.60
        } else if (this.carYear == "5 Year") {
            price = this.name * 0.70
        }
        return price
    }
    InsureType() {
        let type = this.type
        let typeOfInsure;
        if (type == "third party") {
            typeOfInsure = this.userInsure() - this.yearThierdPerson()
        } else if (type == "Third party and body") {
            typeOfInsure = this.userInsure() - this.bodyinsurance()
        }
        return typeOfInsure
    }
}



// create template
function insure(car, year, type, price) {
    return `
    <div id="ansewr">
    <h5>Your insurance</h5>
    <div>
    <span class="car">${car}</span>
    <span>: Car name</span>
    </div>
    <div>
    <span class="year">${year}</span>
    <span>: Insurance discount year</span>
    </div>
    <div>
    <span class="type">${type}</span>
    <span>: Type of insurance</span>
    </div>
    <hr />
    <div class="price">
    <h6>${price}</h6>
    </div>
    </div>
`
}
// for action just for on time
let action = false
// function for send all of them to DOM
function sendToDom() {
    // select value of ar name && Year of car production
    let car = document.querySelector('#car').value
    let year = document.querySelector('#carYear').value
    // validation for user (user should fill in the box:)
    if (!InsureType[0].checked && !InsureType[1].checked) {
        alert("Please fill in the box ")
        // if dosen't fill in the box function dosen't work 'cuase of (return)
        return
    }
    //   if for action the function for one time
    if (!action) {
        action = true
        let selectedType;
        // each one radio button user choose we find next element (for send that in template)
        InsureType.forEach(function (item) {
            if (item.checked) {
                selectedType = item.nextElementSibling.textContent
            }
        });

        let test = new Price(car, year, selectedType)
        let test2 = test.InsureType()

        // set the position of the template in main element
        main.
        insertAdjacentHTML("beforeend", insure(car, year, selectedType, test2))
    }
}
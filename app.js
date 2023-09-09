//                        In the name of rainbow god

// Farhad Ahmadi
// farhad.13ahmadi.83@gmail.com

const section=document.querySelector("section")
const carname = document.querySelector('#car')
const result = document.querySelector('.result input')
const main = document.querySelector('#main')
const ansewr = document.querySelector('#ansewr')
let InsureType = document.querySelectorAll('.InsureType input')
const thierdParty=document.querySelector('#thierdParty')
const boduInsurance=document.querySelector('#boduInsurance')
const loader=document.querySelector('.spinner')
console.log(loader);

// when click on button
result.addEventListener('click', sendToDom)
// when click on thierd party button
thierdParty.addEventListener("click",selectStyle)
// when click on body insurance button
boduInsurance.addEventListener("click",selectStyle)

// for loader part
// after3.6sec this function is called
setTimeout(() => {
    loader.style.display = "none"
    section.style.display="block"
}, 3600);


class Price {
    // get user select
    constructor(name, carYear, bodyYear, type) {
        // car name
        this.name = name
        // year of user dosen't damages(thierd party)
        this.carYear = carYear
        // year of user dosen't damages(body insurance)
        this.bodyYear = bodyYear
        // type of insurance
        this.type = type
    }
    // price of insurance
    userInsure() {

        this.name = 4241900
        return this.name
    }
    // effect of Years without damage (thierd person)
    yearThierdPerson() {
        let price;
        // if user dosen't  damage of 2 years, he has 5% discount
        if (this.carYear == "2 Year") {
            price = this.name * 0.05
            // if user dosen't damage of 3 years, he has 10% discount
        } else if (this.carYear == "3 Year") {
            price = this.name * 0.10
            // if user dosen't damage of 4 years, he has 15% discount
        } else if (this.carYear == "4 Year") {
            price = this.name * 0.15
            // if user dosen't damage of 5 years, he has 20% discount
        } else if (this.carYear == "5 Year") {
            price = this.name * 0.20
            // if user dosen't damage of 6 years, he has 30% discount
        } else if (this.carYear == "6 Year") {
            price = this.name * 0.25
            // if user dosen't damage of 7 years, he has 35% discount
        } else if (this.carYear == "7 Year") {
            price = this.name * 0.30
            // if user dosen't damage of 8 years, he has 40% discount
        } else if (this.carYear == "8 Year") {
            price = this.name * 0.35
            // if user dosen't damage of 9 years, he has 45% discount
        } else if (this.carYear == "9 Year") {
            price = this.name * 0.40
            // if user dosen't damage of 14 years, he has 70% discount
        } else if (this.carYear == "14 Year") {
            price = this.name * 0.70
        }
        return price
    }
    // effect of year in insurance (body insurance)
    bodyinsurance() {
        let price;
        // if user dosen't damage of 1 years, he has 30% discount
        if (this.bodyYear == "1 Year") {
            price = this.name * 0.30
            // if user dosen't damage of 2 years, he has 40% discount
        } else if (this.bodyYear == "2 Year") {
            price = this.name * 0.40
            // if user dosen't damage of 3 years, he has 50% discount
        } else if (this.bodyYear == "3 Year") {
            price = this.name * 0.50
            // if user dosen't damage of 4 years, he has 60% discount
        } else if (this.bodyYear == "4 Year") {
            price = this.name * 0.60
            // if user dosen't damage of 5 years, he has 70% discount
        } else if (this.bodyYear == "5 Year") {
            price = this.name * 0.70
        }
        return price
    }
    // depend on typr of insurance
    InsureType() {
        let type = this.type
        let typeOfInsure;
        if (type == "third party") {
            typeOfInsure = this.userInsure() - this.yearThierdPerson()
        } else if (type == "body insurance") {
            typeOfInsure = this.userInsure() - this.bodyinsurance()
        }
        return `${typeOfInsure}T`
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
    // for third party
    let year = document.querySelector('#carYear').value
    // for body insurance
    let bodyYear = document.querySelector('#carYearBody').value
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

        // create a new calss
        let test = new Price(car, year, bodyYear, selectedType)
        // action the methid of class
        let test2 = test.InsureType()


        if (selectedType=="third party") {
             // set the position of the template in main element
        main.
        insertAdjacentHTML("beforeend", insure(car, year, selectedType, test2))
        } else if (selectedType=="body insurance") {
                 // set the position of the template in main element
        main.
        insertAdjacentHTML("beforeend", insure(car, bodyYear, selectedType, test2))
        }
       
    }
}

// when click on radio button action the function
function selectStyle() {
    
  // for third party
  let year = document.querySelector('#carYear')
  // for body insurance
  let bodyYear = document.querySelector('#carYearBody')

    let selectedType;
    // each one radio button user choose we find next element (for send that in template)
    InsureType.forEach(function (item) {
        if (item.checked) {
            selectedType = item.nextElementSibling.textContent
        }
        if (selectedType=="third party") {
            bodyYear.disabled = true
            year.disabled = false
        } else if (selectedType== "body insurance") {
            year.disabled = true
            bodyYear.disabled = false
        }
    });
}

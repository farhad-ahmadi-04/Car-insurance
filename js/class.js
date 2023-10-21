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

// class : calculate procces
class InsuranceProcces {
    // constructor
    constructor(make, makeText, year, level, levelText) {
        this.make = make;
        this.makeText = makeText;
        this.year = year;
        this.level = level;
        this.levelText = levelText;
    }

    // value of form inputs
    // + parameter1 : value of car input
    // + parameter2 : value of year input
    // + parameter3 : value of type of insutance
    insuranceCase() {
        let info = {
            makeValue: this.make,
            carText: this.makeText,
            year: this.year,
            levelValue: this.level,
            textLevel: this.levelText
        }
        // pass object to calculatePrice function
        Ui.showFactor(this.calculatePrice(info), info)
    }
    // methods
    // find current persian year
    // return : current year
    currentYear() {
        // new date
        let now = new Date().toLocaleDateString('fa-IR')
        // get full persion year
        now.slice(0, 4) // remove month and day
        // max year
        let maxYear = parseInt(englishNumber(now)) // change to number type with parseInt
        return maxYear

    }

    // price of insurance
    // parameter1 : object of value from input  
    // return : price of insurance
    calculatePrice(info) {
        let price = config.prices.price,
            base = config.prices.basePrice
        // formula for insurance
        price = (this.CalculateCar(price, base, info) - ((this.yearDiscount(info) * 3) / 100) * this.CalculateCar(price, base, info)) * this.CalculateLevl(info)
        return price
    }
    // Insurance price based on car factor
    // parameter1 : price of insurance
    // parameter2 : base price of insurance
    // parameter3 : object of value from input 
    // return : price 
    CalculateCar(price, base, info) {
        let make = info.makeValue
        switch (make) {
            case "1":
                price = base * this.calculateOfCar(info)
                break;
            case "2":
                price = base * this.calculateOfCar(info)
                break;
            case "3":
                price = base * this.calculateOfCar(info)
                break;
        }
        return price
    }
    // Discount of year
    // parameter : object of value from input 
    // return = The year chosen by the user - current year
    yearDiscount(info) {
        let year = info.year
        year = this.currentYear() - year
        return year
    }
    // It takes the type of insurance chosen by the user and gives a numerical insurance type based on the value
    // parameter : object of value from input 
    // return : number type of insurance
    CalculateLevl(info) {
        let level = info.levelValue
        if (level == 'basic') {
            // price = price + (price * 0.30)
            return config.typeOfInsurance.basic
        } else {
            return config.typeOfInsurance.complete
        }
    }
    // The coefficient of cars According to car input value
    // parameter : object of value from input 
    // output : The coefficient of cars
    calculateOfCar(info) {
        let carValue = info.makeValue
        switch (carValue) {
            case "1":
                return config.carsPrace.make1
            case "2":
                return config.carsPrace.make2
            case "3":
                return config.carsPrace.make3
        }
    }
}
// ceate obj froem class
let ins = new InsuranceProcces()

// class : to DOM procces
class Html {

    // error function
    // + parametr : massage for error
    // > output : showing error in DOM for 5seconds
    displayError(msg) {
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
    // getting car model
    // paramet : car value
    // returt : car model
    textCar(car) {
        let text;
        switch (car) {
            case "1":
                text = "پراید"
                break;
            case "2":
                text = "اپتیما"
                break;
            case "3":
                text = "پورشه"
                break;
        }
        return text
    }
    // showing factor : create div for send factor to it, but before it show loader for 3sec
    // + paramt1 : price of insurance
    // + paramt2 : obj that put value and texts of inputs
    //   appendChild : Factor template
    showFactor(price, info) {
        const result = document.querySelector('#result');
        // default we shouidn't have anything in result div
        result.innerHTML = ""
        const div = document.createElement('div')
        // add template to div
        div.innerHTML = this.templateFactor(price, info)
        // select load image
        const load = document.querySelector("#loading img")
        load.style.display = 'block'
        // after 3sec active Instructions
        setTimeout(() => {
            load.style.display = 'none'
            result.appendChild(div)
        }, 3000);
    }
    // template of insurace factor
    // + paramt1 : price of insurance
    // + paramt2 : obj that put value and texts of inputs
    templateFactor(price, info) {
        return `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل خودرو :${info.carText}</p>
    <p>سال ساخت :${info.year}</p>
    <p>نوع بیمه :${info.textLevel}</p>
    <p>قیمت :${price}</p>`
    }
    // years for pass to DOM
    // + parametr1 : posision for year in DOM
    // + parametr2 : value of year
    // + parametr3 : text of year in select element
    // > output : showing current year until 20 years ago in DOM
    years(selectYear, i, yearText) {
        // create option element
        let creartOption = document.createElement('option')
        // pass value to option
        creartOption.value = i
        // pass text to option element
        creartOption.innerText = yearText
        // send option to select element
        selectYear.appendChild(creartOption)
    }
    // make year
    displayYears() {
        let minYear = ins.currentYear() - config.yearsNumber
        const selectYear = document.querySelector('#year')
        // defult year
        this.years(selectYear, "", "- انتخاب سال -")
        // 20 years ago
        for (let i = ins.currentYear(); i >= minYear; i--) {
            this.years(selectYear, i, `سال ${i}`)
        }
    }
}
// create obj from class
let Ui = new Html()
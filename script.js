// Input
const form = document.querySelector(".hero__form");
const metricContainer = document.querySelector(".form__metric-container");
const imperialContainer = document.querySelector(".form__imperial-container");
const cmInput = document.querySelector("input[name=height-metric]");
const kgInput = document.querySelector("input[name=weight-metric]");
const ftInput = document.querySelector("input[name=height-ft]"); 
const inchInput = document.querySelector("input[name=height-inch]");
const stInput = document.querySelector("input[name=weight-st]");
const lbsInput = document.querySelector("input[name=weight-lbs]");
const radioMetric = document.querySelector("#metric");
const radioImperial = document.querySelector("#imperial");
const radioContainer = document.querySelector(".form__radio-container");
// Output
const resultContainer = document.querySelector(".form__result-container");
const resultPara = document.querySelector(".result__para");
const resultSpan = document.querySelector(".result__span");
const idealPara = document.querySelector(".result__ideal-weight-para");
const idealSpan = document.querySelector(".result__ideal-weight-span");


radioContainer.addEventListener("change",async () => {
    if (radioMetric.checked) {
        form.style.maxHeight = "";
        resultContainer.style.maxHeight = "";
        await delay(250);
        imperialContainer.classList.add("not-active");
        metricContainer.classList.remove("not-active");
        ftInput.value = "";
        inchInput.value = "";
        stInput.value = "";
        lbsInput.value = "";
        resultDefault();
    } else if (radioImperial.checked) {
        metricContainer.classList.add("not-active");
        imperialContainer.classList.remove("not-active");
        form.style.maxHeight = "600px";
        cmInput.value = "";
        kgInput.value = "";
        resultDefault();
    }
});
const delay = async (ms) => { await new Promise(resolve => setTimeout(resolve, ms)) };

metricContainer.addEventListener("input", (evt) => {
    setTimeout(metricCalculate, 2000);
    evt.target.value = evt.target.value.replace(",", ".");
});
imperialContainer.addEventListener("input", (evt) => {
    setTimeout(imperialCalculate, 2000);
    evt.target.value = evt.target.value.replace(",", ".");
});


function inputValidator(evt) {
    return !(evt.keyCode < 48 || evt.keyCode > 57) || (evt.keyCode === 46 && !evt.target.value.includes(".")) || evt.keyCode === 44;
}

async function resultDefault() {
    resultContainer.style.maxHeight = "";
    await delay(250);
    resultContainer.style.flexDirection = "";
    resultContainer.style.alighnItems = "";
    resultContainer.style.alignItems = "";
    resultPara.textContent = "Welcome!";
    resultPara.style.fontSize = "";
    idealPara.textContent = "Enter your height and weight and you’ll see your BMI result here";
    idealPara.style.width = "";
}

async function resultInvalid() {
    resultContainer.style.maxHeight = "";
    await delay(250);
    resultContainer.style.flexDirection = "";
    resultContainer.style.alighnItems = "";
    resultContainer.style.alignItems = "";
    resultPara.textContent = "Please!";
    resultPara.style.fontSize = "";
    idealPara.textContent = "Enter proper height and weight";
    idealPara.style.width = "";
}

const resultOutput = async (bmi, min, max) => {
    if (window.innerWidth > 767) {
        resultContainer.style.maxHeight = "166px";
        resultContainer.style.flexDirection = "row";
        resultContainer.style.alignItems = "center";
    } else {
        form.style.maxHeight = "660px";
        resultContainer.style.maxHeight = "257px";
    }
    if (bmi > 10 && bmi < 100) {
        resultPara.innerHTML = `Your BMI is...<span class="result__span">${bmi}<span>`;
        resultPara.style.fontSize = "16px";
        window.innerWidth > 1439 ? idealPara.style.width = "206px" : window.innerWidth < 1440 && window.innerWidth > 767 ? idealPara.style.width = "267px" : idealPara.style.width = "";
        const fat = bmi < 18.5 ? "underweight" : bmi <= 24.9 ? "healthy weight" : bmi <= 29.9 ? "overweight" : bmi <= 34.9 ? "obese" : bmi <= 39.9 ? "severely obese" : "morbidly obese";
        idealPara.innerHTML = `Your BMI suggests you’re a ${fat}. Your ideal weight is between <span class="result__ideal-weight-span">${min} - ${max}</span>.`;
    }
}


function metricCalculate() {
    const bmi = Number((Number(kgInput.value) / ((Number(cmInput.value) / 100) ** 2))).toFixed(1);
    if (cmInput.value.length > 1 && kgInput.value.length > 1) {
        window.innerWidth > 767 ? form.style.maxHeight = "485px" : form.style.maxHeight = "650px"
        const minIdealWeight = (18.5 * ((Number(cmInput.value) / 100) ** 2)).toFixed(1) + "kgs";
        const maxIdealWeight = (24.9 * ((Number(cmInput.value) / 100) ** 2)).toFixed(1) + "kgs";
        resultOutput(bmi, minIdealWeight, maxIdealWeight);
    } else if (cmInput.value.length === 0 || kgInput.value.length === 0) {
        resultDefault();
    }
    if ((bmi < 10 || bmi > 100) && cmInput.value.length > 0 && kgInput.value.length > 0) {
        resultInvalid();
    }
}

function imperialCalculate() {
    const inch = Number(inchInput.value) + Number(ftInput.value) * 12;
    const lbs = Number(lbsInput.value) + Number(stInput.value) * 14;
    const bmi = Number(((703 * lbs) / (inch ** 2))).toFixed(1);
    console.log(typeof (bmi));
    if ((lbsInput.length > 0 || stInput.value.length > 0) && (ftInput.value.length > 0 || inchInput.value.length > 0)) {
        form.style.maxHeight = "608px";
        const minWeight = (5 * 18.5 + (18.5 / 5) * (inch - 60));
        const maxWeight = (5 * 24.9 + (24.9 / 5) * (inch - 60));
        const minIdealWeight = (Math.floor(minWeight / 14) + "st ") + ((minWeight % 14 - 1).toFixed(0) + "lbs");
        const maxIdealWeight = (Math.floor(maxWeight / 14) + "st ") + ((maxWeight % 14 - 1).toFixed(0) + "lbs");
        resultOutput(bmi, minIdealWeight, maxIdealWeight);
    } else if ((ftInput.value.length === 0 && inchInput.value.length === 0) || (stInput.value.length === 0 && lbsInput.value.length === 0)) {
        resultDefault();
    }
    if ((bmi < 10 || bmi > 100) && (lbsInput.length > 0 || stInput.value.length > 0) && (ftInput.value.length > 0 || inchInput.value.length > 0)) {
        resultInvalid();
    }
}
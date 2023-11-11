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
        form.style.maxHeight = "450px";
        await delay(500);
        imperialContainer.classList.add("not-active");
        metricContainer.classList.remove("not-active");
        ftInput.value = "";
        inchInput.value = "";
        stInput.value = "";
        lbsInput.value = "";
    } else if (radioImperial.checked) {
        metricContainer.classList.add("not-active");
        imperialContainer.classList.remove("not-active");
        form.style.maxHeight = "600px";
        cmInput.value = "";
        kgInput.value = "";
    }
});

metricContainer.addEventListener("input", metricCalculate);
imperialContainer.addEventListener("input", imperialCalculate);

const delay = async (ms) => { await new Promise(resolve => setTimeout(resolve, ms)) }

function inputValidator(evt) {
    return !(evt.keyCode < 48 || evt.keyCode > 57) || (evt.keyCode === 46 && !evt.target.value.includes("."));
}

async function resultDefault() {
    resultContainer.style.maxHeight = "";
    await delay(500);
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
    await delay(500);
    resultContainer.style.flexDirection = "";
    resultContainer.style.alighnItems = "";
    resultContainer.style.alignItems = "";
    resultPara.textContent = "Please!";
    resultPara.style.fontSize = "";
    idealPara.textContent = "Enter proper height and weight";
    idealPara.style.width = "";
}
async function metricCalculate() {
    const bmi = Number(kgInput.value / ((cmInput.value / 100) ** 2)).toFixed(1);
    console.log(typeof(Number(bmi)));
    if (cmInput.value.length > 1 && kgInput.value.length > 1) {
        form.style.maxHeight = "480px";

        resultContainer.style.flexDirection = "row";
        resultContainer.style.alighnItems = "center";
        resultContainer.style.maxHeight = "166px";
        resultContainer.style.alignItems = "center";

        resultPara.innerHTML = `Your BMI is...<span class="result__span">${bmi}<span>`;
        resultPara.style.fontSize = "16px";

        idealPara.style.width = "206px";
        
        const minIdealWeight = (24.9 * ((Number(cmInput.value) / 100) ** 2)).toFixed(1);
        const maxIdealWeight = (18.5 * ((Number(cmInput.value) / 100) ** 2)).toFixed(1);

        const fat = bmi < 18.5 ? "underweight" : bmi <= 24.9 ? "healthy weight" : bmi <= 29.9 ? "overweight" : bmi <= 34.9 ? "obese" : bmi <= 39.9 ? "severely obese" : "morbidly obese";
        idealPara.innerHTML = `Your BMI suggests you’re a ${fat}. Your ideal weight is between <span class="result__ideal-weight-span">${maxIdealWeight}kgs - ${minIdealWeight}kgs</span>.`;
    } else if (cmInput.value.length === 0 || kgInput.value.length === 0) {
        resultDefault();
    }if ((Number(bmi) < 10 || Number(bmi) > 100) && cmInput.value.length > 1 && kgInput.value.length > 1) {
        resultInvalid();
    }
}

function imperialCalculate() {
    const bmi = Number(703 * ((lbsInput.value + stInput.value * 14) / (ftInput.value + (inchInput.value * 0,833333 / 10) ** 2)));
    console.log(bmi);
}
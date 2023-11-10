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


radioContainer.addEventListener("change", async () => {
    if (radioMetric.checked) {
        form.style.maxHeight = "448px";
        await new Promise(resolve => setTimeout(resolve, 150));
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

function inputValidator(evt) {
    return !(evt.keyCode < 48 || evt.keyCode > 57) || (evt.keyCode === 46 && !evt.target.value.includes("."));
}

function metricCalculate() {
    if (cmInput.value.length > 0 && kgInput.value.length > 0) {
        resultContainer.style.flexDirection = "row";
        resultContainer.style.maxHeight = "166px";

        resultPara.textContent = "Your BMI is...";
        resultPara.style.fontSize = ""
    }
}
function imperialCalculate() {

}
const resultSpan = document.getElementById("result");
const copyTextSpan = document.getElementById("copy-text");
const copyButton = document.getElementById("copy-button");

const lengthNumber = document.getElementById("length-number");
const lengthRange = document.getElementById("length-range");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const strengthTextSpan = document.getElementById("strength-text");
const strengthGauges = document.querySelectorAll(".card__body--strength-gauge");

const generateButton = document.getElementById("generate-button");

lengthRange.addEventListener("input", (e) => {
    const rangeValue = e.target.value;
    lengthNumber.textContent = rangeValue;
    // Calculate percentage of range and turns it into a whole number
    const wholeNumber = (rangeValue / lengthRange.max) * 100;
    // Removes decimals
    const progress = wholeNumber.toFixed(0);

    lengthRange.style.background = `linear-gradient(to right, var(--color-green-200) ${progress}%, var(--color-grey-850) ${progress}%)`;
});

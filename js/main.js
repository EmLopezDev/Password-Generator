const resultSpan = document.getElementById("result");
const copyTextSpan = document.getElementById("copy-text");
const copyButton = document.getElementById("copy-button");

const lengthNumber = document.getElementById("length-number");
const lengthRange = document.getElementById("length-range");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const strengthTextSpan = document.getElementById("strength-text");
const strengthGauges = document.querySelectorAll(".card__body--strength-gauge");

const generateButton = document.getElementById("generate-button");

let lengthValue = 0;
const checkedOptions = {};

let finalPW = "";

const passwordCharacters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/",
};

const isChecked = () => {
    checkboxes.forEach((cb) => {
        checkedOptions[`${cb.value}`] = cb.checked;
    });
};

checkboxes.forEach((cb) => {
    cb.addEventListener("input", isChecked);
});

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

const randomCharacter = () => {
    finalPW = "";
    const checked = Object.keys(checkedOptions).filter(
        (key) => checkedOptions[key] === true
    );
    while (finalPW.length < lengthValue) {
        const randomIndex = randomNumber(checked.length);
        const randomCategory = checked[randomIndex];
        const categoryValues = passwordCharacters[randomCategory];
        const randomCharAt = randomNumber(categoryValues.length + 1);
        const randomCharacter = categoryValues.charAt(randomCharAt);
        finalPW += randomCharacter;
    }
};

lengthRange.addEventListener("input", (e) => {
    const rangeValue = e.target.value;
    lengthValue = Number(rangeValue);
    lengthNumber.textContent = rangeValue;
    // Calculate percentage of range and turns it into a whole number
    const wholeNumber = (rangeValue / lengthRange.max) * 100;
    // Removes decimals
    const progress = wholeNumber.toFixed(0);

    lengthRange.style.background = `linear-gradient(to right, var(--color-green-200) ${progress}%, var(--color-grey-850) ${progress}%)`;
});

generateButton.addEventListener("click", () => {
    randomCharacter();
    resultSpan.style.color = "var(--color-grey-200)";
    resultSpan.textContent = finalPW;
});

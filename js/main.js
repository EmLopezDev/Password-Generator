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

const isChecked = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
};

const canGenerate = () => {
    if (isChecked(checkedOptions).length && lengthValue) {
        generateButton.removeAttribute("disabled");
        return true;
    } else {
        generateButton.setAttribute("disabled", true);
        return false;
    }
};

const checkboxValue = () => {
    checkboxes.forEach((cb) => {
        checkedOptions[`${cb.value}`] = cb.checked;
    });
    canGenerate();
};

checkboxes.forEach((cb) => {
    cb.addEventListener("input", checkboxValue);
});

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

const randomCharacter = () => {
    finalPW = "";
    const checked = isChecked(checkedOptions);
    while (finalPW.length < lengthValue) {
        const randomIndex = randomNumber(checked.length);
        const randomCategory = checked[randomIndex];
        const categoryValues = passwordCharacters[randomCategory];
        const randomCharAt = randomNumber(categoryValues.length + 1);
        const randomCharacter = categoryValues.charAt(randomCharAt);
        finalPW += randomCharacter;
    }
};

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(finalPW);
        copyTextSpan.style.opacity = "1";
        setTimeout(() => {
            copyTextSpan.style.opacity = "0";
        }, 2000);
    } catch (err) {
        console.error("FAILED");
    }
};

const canCopy = () => {
    if (finalPW) {
        copyButton.removeAttribute("disabled");
    } else {
        copyButton.setAttribute("disabled", true);
    }
};

const resetStrength = () => {
    strengthGauges.forEach((gauge) => {
        gauge.className = "card__body--strength-gauge";
    });
};

const changeGauges = (length, strength) => {
    resetStrength();
    const gauges = Array.from(strengthGauges);
    const gauge = gauges.splice(0, length);
    gauge.forEach((g) => {
        g.classList.add(strength === "very weak" ? "very-weak" : strength);
    });
    strengthTextSpan.textContent = `${strength}`;
};

const finalPwStrength = () => {
    const checkedLength = isChecked(checkedOptions).length;
    if (lengthValue < 15 && checkedLength === 1) {
        changeGauges(1, "very weak");
    } else if (lengthValue < 15 && checkedLength === 2) {
        changeGauges(2, "weak");
    } else if (lengthValue < 15 && checkedLength > 2) {
        changeGauges(3, "medium");
    } else if (lengthValue > 15 && checkedLength === 1) {
        changeGauges(2, "weak");
    } else if (lengthValue > 15 && checkedLength === 2) {
        changeGauges(3, "medium");
    } else {
        changeGauges(4, "strong");
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

    canGenerate();
});

generateButton.addEventListener("click", () => {
    randomCharacter();
    canCopy();
    finalPwStrength();
    resultSpan.style.color = "var(--color-grey-200)";
    resultSpan.textContent = finalPW;
});

copyButton.addEventListener("click", copyText);

let mainNumber = 0;

const countNumber = document.querySelector(".count-number");

const increaseButton = document.querySelector(".increase-button");
const decreaseButton = document.querySelector(".decrease-button");
const resetButton = document.querySelector(".reset-button");

increaseButton.addEventListener("click", () => {
    if (mainNumber < 10) {
        mainNumber++;
        countNumber.textContent = mainNumber;
    }
})

decreaseButton.addEventListener("click", () => {
    if (mainNumber > 0) {
        mainNumber--;
        countNumber.textContent = mainNumber;
    }
})

resetButton.addEventListener("click", () => {
    mainNumber = 0;
    countNumber.textContent = mainNumber;
})
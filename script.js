
/* AI-assisted code: interactive details and cost calculator for Skill Swap. */
console.log("Welcome to Skill Swap!");

const skillButtons = document.querySelectorAll(".skill-button");

skillButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".skill-card");
        const details = card.querySelector(".skill-details");

        details.hidden = !details.hidden;
        button.textContent = details.hidden ? "Show Details" : "Hide Details";
    });
});

const costForm = document.querySelector("#cost-form");
const hourlyRateInput = document.querySelector("#hourly-rate");
const hoursInput = document.querySelector("#hours");
const costResult = document.querySelector("#cost-result");

costForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const hourlyRate = Number(hourlyRateInput.value);
    const hours = Number(hoursInput.value);

    if (
        hourlyRateInput.value.trim() === "" ||
        hoursInput.value.trim() === "" ||
        !Number.isFinite(hourlyRate) ||
        !Number.isFinite(hours) ||
        hourlyRate < 0 ||
        hours < 0
    ) {
        costResult.textContent = "Please enter valid, non-negative numbers.";
        return;
    }

    const total = hourlyRate * hours;
    costResult.textContent = `Total cost: $${total.toFixed(2)}`;
});

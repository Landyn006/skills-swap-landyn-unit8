
/* AI-assisted code: interactive details, cost calculator, and skill matching. */
console.log("Welcome to Skill Swap!");

// Show and hide skill details
const skillButtons = document.querySelectorAll(".skill-button");

skillButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".skill-card");
        const details = card.querySelector(".skill-details");

        details.hidden = !details.hidden;
        button.textContent = details.hidden ? "Show Details" : "Hide Details";
    });
});

// Cost calculator
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

// Find My Match
const matchForm = document.querySelector("#match-form");
const matchCategoryInput = document.querySelector("#match-category");
const maxPriceInput = document.querySelector("#max-price");
const matchResults = document.querySelector("#match-results");

matchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const category = matchCategoryInput.value;
    const maxPrice = Number(maxPriceInput.value);

    if (
        maxPriceInput.value.trim() === "" ||
        !Number.isFinite(maxPrice) ||
        maxPrice < 0
    ) {
        matchResults.textContent = "Please enter a valid, non-negative budget.";
        return;
    }

    const skillCards = Array.from(
        document.querySelectorAll("#skill-list .skill-card")
    );

    const matchingCards = skillCards.filter((card) => {
        const skillCategory = card.dataset.category;
        const skillPrice = Number(card.dataset.price);

        const categoryMatches =
            category === "All" || skillCategory === category;

        return categoryMatches && skillPrice <= maxPrice;
    });

    matchResults.replaceChildren();

    if (matchingCards.length === 0) {
        matchResults.textContent =
            "No skills match your category and budget. Try changing your preferences.";
        return;
    }

    matchingCards.forEach((card) => {
        const resultCard = card.cloneNode(true);
        resultCard.querySelector(".skill-details").hidden = true;

        const detailsButton = resultCard.querySelector(".skill-button");
        detailsButton.textContent = "Show Details";

        detailsButton.addEventListener("click", () => {
            const details = resultCard.querySelector(".skill-details");
            details.hidden = !details.hidden;
            detailsButton.textContent = details.hidden
                ? "Show Details"
                : "Hide Details";
        });

        matchResults.appendChild(resultCard);
    });
});

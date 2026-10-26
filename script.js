
/* AI-assisted code: interactive details for Skill Swap cards. */
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

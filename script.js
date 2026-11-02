
/* Skill Swap frontend connected to the backend API. */

console.log("Welcome to Skill Swap!");

const skillList = document.querySelector("#skill-list");
const skillForm = document.querySelector("#skill-form");
const skillMessage = document.querySelector("#skill-message");

let allSkills = [];

// Create category filter and matching controls.
const skillsSection = document.querySelector("#skills");

const filterLabel = document.createElement("label");
filterLabel.textContent = "Filter by category: ";
const categoryFilter = document.createElement("select");
categoryFilter.innerHTML = '<option value="All">All Categories</option>';
filterLabel.appendChild(categoryFilter);

const matchLabel = document.createElement("label");
matchLabel.textContent = "Find skills by your interests (enter categories separated by commas): ";
const matchInput = document.createElement("input");
matchInput.type = "text";
matchInput.placeholder = "Example: Programming, Music";
const matchButton = document.createElement("button");
matchButton.type = "button";
matchButton.textContent = "Find Matches";

const matchMessage = document.createElement("p");

skillsSection.insertBefore(filterLabel, skillList);
skillsSection.insertBefore(matchLabel, skillList);
skillsSection.insertBefore(matchButton, skillList);
skillsSection.insertBefore(matchMessage, skillList);

// Display skills on the page.
function displaySkills(skills) {
    skillList.innerHTML = "";

    if (!skills || skills.length === 0) {
        skillList.innerHTML = "<p>No skills found.</p>";
        return;
    }

    skills.forEach((skill) => {
        const card = document.createElement("article");
        card.className = "skill-card";

        const title = document.createElement("h3");
        title.textContent = skill.title;

        const description = document.createElement("p");
        description.textContent = skill.description;

        const category = document.createElement("p");
        category.textContent = `Category: ${skill.category}`;

        const price = document.createElement("p");
        price.textContent = `Price: $${skill.price} per lesson`;

        const provider = document.createElement("p");
        provider.textContent = `Provider: ${skill.provider || "Skill Swap member"}`;

        card.append(title, description, category, price, provider);
        skillList.appendChild(card);
    });
}

// Load skills from the backend database.
async function loadSkills() {
    try {
        skillList.innerHTML = "<p>Loading skills...</p>";

        allSkills = await window.apiService.fetchSkills();

        const categories = [...new Set(allSkills.map(skill => skill.category))];

        categoryFilter.innerHTML = '<option value="All">All Categories</option>';

        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        displaySkills(allSkills);

    } catch (error) {
        console.error("Error loading skills:", error);
        skillList.innerHTML =
            "<p>Unable to load skills. Please check that the backend server is running.</p>";
    }
}

// Use filterSkillsByCategory.
categoryFilter.addEventListener("change", () => {
    const filteredSkills = window.filterSkillsByCategory(
        allSkills,
        categoryFilter.value
    );

    displaySkills(filteredSkills);
});

// Use matchSkillsToUser.
matchButton.addEventListener("click", () => {
    const userSkills = matchInput.value
        .split(",")
        .map(category => category.trim())
        .filter(category => category !== "");

    if (userSkills.length === 0) {
        matchMessage.textContent = "Please enter at least one category.";
        return;
    }

    const matches = window.matchSkillsToUser(allSkills, userSkills);

    matchMessage.textContent = `Found ${matches.length} matching skill(s).`;
    displaySkills(matches);
});

// Add a new skill to the database.
skillForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const skillData = {
        title: document.querySelector("#skill-title").value.trim(),
        category: document.querySelector("#skill-category").value.trim(),
        price: Number(document.querySelector("#skill-price").value),
        description: document.querySelector("#skill-description").value.trim()
    };

    try {
        skillMessage.textContent = "Adding your skill...";

        await window.apiService.createSkill(skillData);

        skillMessage.textContent = "Skill added successfully!";
        skillForm.reset();

        await loadSkills();

    } catch (error) {
        console.error("Error adding skill:", error);
        skillMessage.textContent =
            "Unable to add skill. Please check your information and try again.";
    }
});

// Use calculateTotalCosts.
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
        costResult.textContent =
            "Please enter valid, non-negative numbers.";
        return;
    }

    const total = window.calculateTotalCosts(hourlyRate, hours);

    costResult.textContent = `Total cost: $${total.toFixed(2)}`;
});

// Load skills when the page opens.
loadSkills();

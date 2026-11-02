function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

function calculateTotalCosts(hourlyRate, hours) {
  return hourlyRate * hours;
}

function matchSkillsToUser(skills, userSkills) {
  return skills.filter(skill =>
    userSkills.includes(skill.category)
  );
}

// Make functions available to the browser.
if (typeof window !== 'undefined') {
  window.filterSkillsByCategory = filterSkillsByCategory;
  window.calculateTotalCosts = calculateTotalCosts;
  window.matchSkillsToUser = matchSkillsToUser;
}

// Make functions available to Jest.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
  };
}
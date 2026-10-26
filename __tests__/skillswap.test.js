
const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {
  test('filters skills by category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 }
    ]);
  });

  test('returns all skills when category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when no skills match', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
  test('calculates hourly rate multiplied by hours', () => {
    expect(calculateTotalCosts(20, 3)).toBe(60);
  });

  test('returns zero for a free skill', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
  });

  test('returns zero when hours are zero', () => {
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test('handles decimal hours', () => {
    expect(calculateTotalCosts(20, 1.5)).toBe(30);
  });
});

describe('matchSkillsToUser', () => {
  const matchingSkills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Free Coding Help', category: 'Programming', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 30 }
  ];

  test('matches skills by category and maximum price', () => {
    expect(
      matchSkillsToUser(
        { category: 'Programming', maxPrice: 20 },
        matchingSkills
      )
    ).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Free Coding Help', category: 'Programming', price: 0 }
    ]);
  });

  test('includes free skills when the budget is zero', () => {
    expect(
      matchSkillsToUser(
        { category: 'Programming', maxPrice: 0 },
        matchingSkills
      )
    ).toEqual([
      { title: 'Free Coding Help', category: 'Programming', price: 0 }
    ]);
  });

  test('returns an empty array when nothing matches', () => {
    expect(
      matchSkillsToUser(
        { category: 'Cooking', maxPrice: 10 },
        matchingSkills
      )
    ).toEqual([]);
  });
});

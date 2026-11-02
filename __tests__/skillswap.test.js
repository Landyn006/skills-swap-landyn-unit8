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
    expect(filterSkillsByCategory(skills, 'Programming')).toHaveLength(2);
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
  test('matches skills based on user skill categories', () => {
    const matches = matchSkillsToUser(skills, ['Programming']);
    expect(matches).toHaveLength(2);
  });

  test('returns an empty array when there are no matches', () => {
    expect(matchSkillsToUser(skills, ['Cooking'])).toEqual([]);
  });
});
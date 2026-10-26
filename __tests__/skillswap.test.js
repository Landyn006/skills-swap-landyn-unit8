
const {
  filterSkillsByCategory,
  calculateTotalCosts
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

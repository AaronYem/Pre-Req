const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getUniversityFromEmail,
  isAllowedEduEmail,
} = require('../src/config/universities');

test('maps known domains to university', () => {
  const data = getUniversityFromEmail('student@kennesaw.edu');
  assert.equal(data.university, 'kennesaw_state_university');
});

test('rejects non-edu and unrecognized edu domains', () => {
  assert.equal(isAllowedEduEmail('hello@gmail.com'), false);
  assert.equal(isAllowedEduEmail('person@unknown.edu'), false);
  assert.equal(isAllowedEduEmail('person@clemson.edu'), true);
});

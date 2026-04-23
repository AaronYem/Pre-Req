const UNIVERSITY_DOMAINS = {
  kennesaw_state_university: ['kennesaw.edu', 'students.kennesaw.edu'],
  clemson_university: ['clemson.edu'],
  georgia_tech: ['gatech.edu'],
  university_of_georgia: ['uga.edu'],
};

function getUniversityFromEmail(email) {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase();

  for (const [university, domains] of Object.entries(UNIVERSITY_DOMAINS)) {
    if (domains.includes(domain)) {
      return { university, domain };
    }
  }

  return null;
}

function isAllowedEduEmail(email) {
  const basicEduFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/i;
  if (!basicEduFormat.test(String(email || '').trim())) return false;
  return !!getUniversityFromEmail(email);
}

module.exports = {
  UNIVERSITY_DOMAINS,
  getUniversityFromEmail,
  isAllowedEduEmail,
};

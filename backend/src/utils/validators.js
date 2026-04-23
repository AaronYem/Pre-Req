function isAdult(age) {
  const num = Number(age);
  return Number.isInteger(num) && num >= 18 && num <= 99;
}

function isValidPhotoArray(photos) {
  return Array.isArray(photos) && photos.length >= 3 && photos.length <= 6;
}

module.exports = { isAdult, isValidPhotoArray };

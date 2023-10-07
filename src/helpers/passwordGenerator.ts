const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const specialChrs = "!@#$%^&*/_.:;()[]{}-+=|";

export function containsSpecialChars(str: string) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}
export function containsNumber(str: any) {
  return !isNaN(str);
}
export function containsUppercase(str: string) {
  return str.toUpperCase() === str;
}
export function generatePassword(options: {
  passwordLength: number;
  isUppercase?: boolean;
  isSpecialChr?: boolean;
  isNumbers?: boolean;
}) {
  const { passwordLength, isUppercase, isSpecialChr, isNumbers } = options;
  let allChars = lowerChars;
  let randPasswordArray = Array(passwordLength);
  randPasswordArray[0] = lowerChars;
  randPasswordArray[1] = isNumbers ? numberChars : ["a"];
  randPasswordArray[2] = isUppercase ? uppercaseLetters : ["d"];
  randPasswordArray[3] = isSpecialChr ? specialChrs : ["x"];
  if (isNumbers) {
    allChars += numberChars;
  }
  if (isUppercase) {
    allChars += uppercaseLetters;
  }
  if (isSpecialChr) {
    allChars += specialChrs;
  }
  randPasswordArray = randPasswordArray.fill(allChars, 4);
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
}
export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

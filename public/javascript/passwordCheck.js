/* THE STRING */
const passwordValidationString = document.getElementById('passwordValidationString');
const passwordConfirmationMatch = document.getElementById('passwordConfirmationMatch');
// error message
const passwordMatchErrorMessage = document.querySelector("p.passwordMatchErrorMessage");

/* CHECK */
const charsNumberRegexValid = document.getElementById('charsNumberRegexValid');
const lowercaseRegexValid = document.getElementById('lowercaseRegexValid');
const uppercaseRegexValid = document.getElementById('uppercaseRegexValid');
const specialCharsRegexValid = document.getElementById('specialCharsRegexValid');
const numberRegexValid = document.getElementById('numberRegexValid');

/* control if the two password value from the sign-up form match together */
const checkPasswordMatch = (passwordInputId, passwordConfirmationInputId) => {

  const password = document.getElementById(passwordInputId);
  const passwordConfirmation = document.getElementById(passwordConfirmationInputId);

    if (password.value !== passwordConfirmation.value) {
      passwordMatchErrorMessage.innerHTML = 'Les mots de passe ne correspondent pas.';
    }
    else {
      passwordMatchErrorMessage.innerHTML = "";
    }
}


// INFORM THE USER IF HIS PASSWORD IS VALID
const newPasswordValidityCheck = (passwordInputId) => {

    const passwordInput = document.getElementById(passwordInputId);

    if (passwordInput.value.length >= 8) charsNumberRegexValid.classList.add('regexValid')
    else charsNumberRegexValid.classList.remove('regexValid');
    if (passwordInput.value.match(/[a-z]/g)) lowercaseRegexValid.classList.add('regexValid')
    else lowercaseRegexValid.classList.remove('regexValid');
    if (passwordInput.value.match(/[A-Z]/g)) uppercaseRegexValid.classList.add('regexValid')
    else uppercaseRegexValid.classList.remove('regexValid');
    if (passwordInput.value.match(/[@$!%*._?\-&#]/g)) specialCharsRegexValid.classList.add('regexValid')
    else specialCharsRegexValid.classList.remove('regexValid');
    if (passwordInput.value.match(/[0-9]/g)) numberRegexValid.classList.add('regexValid')
    else numberRegexValid.classList.remove('regexValid');


}


const passwordCheck = (passwordInputId, passwordConfirmationInputId) => {

  checkPasswordMatch(passwordInputId, passwordConfirmationInputId) ;
  newPasswordValidityCheck(passwordInputId);

}
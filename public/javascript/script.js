/* SIGN-IN FORM */
const signInForm = document.querySelector('.signInForm');
const signInEmailInput = document.getElementById("signInEmailInput");
const signInPasswordInput = document.getElementById("signInPasswordInput");

/* SIGN-UP FORM */
const signUpForm = document.querySelector('.signUpForm');
const signUpPasswordInput = document.getElementById("signUpPassword");
const signUpConfirmationPasswordInput = document.getElementById("signUpConfirmationPassword");
const signUpEmailInput = document.getElementById("signUpEmailInput");

/* ERRORS MESSAGES */
const connectionErrorMessage = document.getElementById('connectionErrorMessage');
const signUpPasswordMatchError = document.getElementById("signUpPasswordMatchError");

/* show the password input value */
const togglePasswordVisibility = (iconId, inputId) => {
    const icon = document.getElementById(`${iconId}`)
    const passwordInput = document.getElementById(`${inputId}`)

    icon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'password') {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
        else {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        };
    })
}

  /* control if the two password value from the sign-up form match together */
const checkPasswordMatch = () => {
        if (signUpPasswordInput.value !== signUpConfirmationPasswordInput.value) {
            signUpPasswordMatchError.innerHTML = 'Les mot de passe ne correspondent pas.';
        }
        else {
            signUpPasswordMatchError.innerHTML = "";
        }
}

// prevent the submit of empty input in sign-in form
const validateSignInForm = (event) => {
    console.log("CONNEXION")
    if (inputName.value.trim() === '' || signInPasswordInput.value.trim() === '') {
        connectionErrorMessage.innerHTML = 'Veuillez remplir tous les champs.';
        event.preventDefault(); // block form submit
    }
}
signInForm.addEventListener('submit' , validateSignInForm)

// prevent the submit of empty input in sign-up form
const validateSignUpForm = (event) => {
    if (signUpPasswordInput.value.trim() === '' || signUpConfirmationPasswordInput.value.trim() === '' || signUpEmailInput.value.trim() === '') {
        connectionErrorMessage.innerHTML = 'Veuillez remplir tous les champs.';
        event.preventDefault();
    }
}
signUpForm.addEventListener('submit', validateSignUpForm)
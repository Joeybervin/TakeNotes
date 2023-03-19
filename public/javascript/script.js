/* SIGN-IN FORM */
const signInForm = document.querySelector('.signInForm');
const signInEmailInput = document.getElementById("signInEmailInput");
const signInPasswordInput = document.getElementById("signInPasswordInput");

/* SIGN-UP FORM */
const signUpForm = document.querySelector('.signUpForm');
const signUpEmailInput = document.getElementById("signUpEmailInput");
const signUpPasswordInput = document.getElementById("signUpPassword");
const signUpConfirmationPasswordInput = document.getElementById("signUpConfirmationPassword");

/* ERRORS MESSAGES */
const connectionErrorMessage = document.querySelector('main > p.errorMessage');
const signUpPasswordMatchError = document.querySelector("div > i + .errorMessage");

/* show the password input value */
const togglePasswordVisibility = (iconId, inputId) => {
    const icon = document.getElementById(`${iconId}`)
    const passwordInput = document.getElementById(`${inputId}`)

    icon.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        if (type === 'password') {
            
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
            
        }
        else {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        };
    })
}

togglePasswordVisibility("signInPasswordIcon", 'signInPasswordInput');
togglePasswordVisibility("signUpPasswordIcon", 'signUpPassword');
togglePasswordVisibility("signUpConfirmationPasswordIcon", 'signUpConfirmationPassword');

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
    if (signInEmailInput.value.trim() === '' || signInPasswordInput.value.trim() === '') {
        connectionErrorMessage.innerHTML = 'Veuillez remplir tous les champs.';
        // block form submit
        event.preventDefault(); 
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

/* LOADING PAGE */
signInForm.addEventListener('submit', () => {
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none');
});
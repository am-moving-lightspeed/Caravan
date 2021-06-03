formErrorsMessages = {
    username: `Incorrect username: use A-Z, 0-9, underscore or dot characters. Name cannot start
        with 0-9, underscore or dot.`,
    email: "Incorrect email: check if you've printed it right.",
    password: `Password must contain A-Z in upper or lower case, 0-9 or underscores and must consist
        at least of 8 symbols.`,
    repeatPassword: "Repeated password value must match your password.",
    invalidCredential: "Invalid email or password."
};



formRegex = {
    username: /^[a-z]{1}[\w.]{2,19}$/i,
    email: /^[\w.]+@([a-z]+\.?)*([a-z]+\.[a-z]+)$/i,
    password: /^[\w]{8,}$/
}



let testPassword = (password,
                     differentCases,
                     underscore,
                     minLength,
                     maxLength) => {

    let latinOK = true;
    let diffCasesOK = false;
    let underscoreOK = false;
    let minLengthOK = false;
    let maxLengthOK = false;

    for (const i in password) {

        if (
            (
                password.charCodeAt(i) < 65 ||
                (password.charCodeAt(i) > 90 && password.charCodeAt(i) < 97) ||
                password.charCodeAt(i) > 122
            ) &&
            password.charAt(i) !== "_"
        ) {

            latinOK = false;
        }
        if (differentCases) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                diffCasesOK = true;
            }
        }
        if (underscore && password[i] === "_") {
            underscoreOK = true;
        }
    }

    if (minLength && password.length >= minLength) {
        minLengthOK = true;
    }
    if (maxLength && password.length <= maxLength) {
        maxLengthOK = true;
    }

    return (differentCases ? diffCasesOK : true) &&
           (underscore ? underscoreOK : true) &&
           (minLength ? minLengthOK : true) &&
           (maxLength ? maxLengthOK : true) &&
           latinOK;
};



let testEmail = (email) => formRegex.email.test(email);



let testUsername = (username) => formRegex.username.test(username);



function checkFormUsername(form) {

    let username = form.querySelector('input[name="username"]');
    let errList = form.querySelector('ul[name="form-error-list"]');

    removePrevMessageOfKind(form, 'username');

    if (!testUsername(username.value) || username.value === '') {
        addMessageOfKind(form, 'username', formErrorsMessages['username']);
    }
}



function checkFormPassword(form) {

    let password = form.querySelector('input[name="password"]');
    let errList = form.querySelector('ul[name="form-error-list"]');

    removePrevMessageOfKind(form, 'password');

    // NOTE: Configure password requirements here.
    if (!testPassword(password.value, false, false, 8)) {
        addMessageOfKind(form, 'password', formErrorsMessages['password']);
    }
}



function checkFormRepeatedPassword(form) {

    let errList = form.querySelector('ul[name="form-error-list"]');
    let password = form.querySelector('input[name="password"]');
    let repPassword = form.querySelector('input[name="repeat-password"]');

    removePrevMessageOfKind(form, 'repeat-password');

    if (password.value !== repPassword.value || repPassword.value === '') {
        addMessageOfKind(form, 'repeat-password', formErrorsMessages['repeatPassword']);
    }
}



function checkFormEmail(form) {

    let email = form.querySelector('input[name="email"]');
    let errList = form.querySelector('ul[name="form-error-list"]');

    removePrevMessageOfKind(form, 'email');

    if (!testEmail(email.value)) {
        addMessageOfKind(form, 'email', formErrorsMessages['email']);
    }
}



function removePrevMessageOfKind(form, messageFor) {

    let errList = form.querySelector('ul[name="form-error-list"]');
    let errorMsgs = Array.from(errList.children).filter(
        (element) => element.getAttribute('err-message-for') === messageFor
    );

    for (const element of errorMsgs) {
        errList.removeChild(element);
    }
    if (errList.children.length === 0) {
        errList.style.display = 'none';
    }
}



function addMessageOfKind(form, messageFor, errorMsg) {

    let errList = form.querySelector('ul[name="form-error-list"]');

    let li = document.createElement('li');
    li.appendChild(
        document.createTextNode(errorMsg)
    );
    li.setAttribute('err-message-for', messageFor);
    errList.appendChild(li);
    errList.style.display = 'block';
}

var formErrorsMessages = {
    username: `Incorrect username: use A-Z, 0-9, underscore or dot characters. Name cannot start
        with 0-9, underscore or dot.`,
    email: "Incorrect email: check if you've printed it right.",
    password: `Password must contain A-Z in upper or lower case, 0-9 or underscores and must consist
        at least of 8 symbols.`,
    repeatPassword: "Repeated password value must match your password."
};

var formRegex = {
    username: /^[a-z]{1}[\w.]{2,19}$/i,
    email: /^[\w.]+@([a-z]+\.?)*([a-z]+\.[a-z]+)$/i,
    password: /^[\w]{8,}$/
}

let checkWithRegex = (value, regex) => regex.test(value);

let checkPassword = (password,
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

let checkEmail = (email) => formRegex.email.test(email);

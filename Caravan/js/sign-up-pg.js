var firebaseConfig = {
    apiKey: "AIzaSyAzTbNoOPT1pp6WRSLydYQn4xLoZz5c0cc",
    authDomain: "caravan-card-game.firebaseapp.com",
    projectId: "caravan-card-game",
    storageBucket: "caravan-card-game.appspot.com",
    messagingSenderId: "494542768135",
    appId: "1:494542768135:web:305670b89ca65fede202a2"
};

firebase.initializeApp(firebaseConfig);

var errorMessages = {
    username: `Incorrect username: use A-Z, 0-9, underscore or dot characters. Name cannot start
        with 0-9, underscore or dot.`,
    email: "Incorrect email: check if you've printed it right",
    password: `Password must contain A-Z in upper or lower case, 0-9 or underscores and must consist
        at least of 8 symbols.`,
    repeatPassword: "Repeated password value must match your password."
};



(function() {

    let backBtn = document.getElementsByName('back-button')[0];
    let submitBtn = document.getElementsByName('submit')[0];
    let form = document.getElementsByName('registration-form')[0];

    backBtn.addEventListener(
        'click',
        (e) => {
            e.stopPropagation();
            location.assign('index.html');
        }
    )

    form.addEventListener(
        'submit',
        (e) => onSubmitForm(form, e)
    )

    // form.addEventListener(
    //     'submit',
    //     (e) => e.preventDefault()
    // )
})();



function onSubmitForm(form, event) {

    let errList = form.querySelector('ul[name="form-error-list"]');

    while (errList.firstChild) {
        errList.removeChild(errList.lastElementChild);
    }

    let errors = [];
    checkIfFormInputsMatchRegex(form, errors);

    if (errors.length != 0) {
        errList.style.display = 'block';

        for (const err of errors) {
            if (errorMessages.hasOwnProperty(err)) {

                let li = document.createElement('li');
                li.appendChild(
                    document.createTextNode(errorMessages[err])
                )
                errList.appendChild(li);
            }
        }

        event.preventDefault();
    }
}



var REGEX = {
    username: /^[a-z]{1}[\w.]{2,19}$/i,
    email: /^[\w.]+@([a-z]+\.?)*([a-z]+\.[a-z]+)$/i,
    password: /^[\w]{8,}$/
}

function checkIfFormInputsMatchRegex(form, errors) {

    let inputs = form.getElementsByTagName('input');

    for (const input of inputs) {
        if (input.hasAttribute('name')) {

            if (
                REGEX.hasOwnProperty(input.name) &&
                !REGEX[input.name].test(input.value)
            ) {
                errors[errors.length] = input.name
            }
        }
    }
}

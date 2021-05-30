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

    form.addEventListener(
        'submit',
        (e) => e.preventDefault()
    )

    console.log(firebase.auth().currentUser);
})();



function onSubmitForm(form, event) {

    let errList = form.querySelector('ul[name="form-error-list"]');

    errList.style.display = 'none';
    while (errList.firstChild) {
        errList.removeChild(errList.lastElementChild);
    }

    let errors = [];
    checkIfFormInputsMatchRegex(form, errors);
    console.log(errors)

    if (errors.length != 0) {
        errList.style.display = 'block';

        for (const err of errors) {
            if (formErrorsMessages.hasOwnProperty(err)) {

                let li = document.createElement('li');
                li.appendChild(
                    document.createTextNode(formErrorsMessages[err])
                )
                errList.appendChild(li);
            }
        }

        event.preventDefault();
    } else {
        registerWithFormData(form);
        event.preventDefault();
    }
}



function registerWithFormData(form) {

    let inputs = Array.from(form.getElementsByTagName('input'));

    let email = inputs.filter((input) => input.name === 'email')[0].value;
    let password = inputs.filter((input) => input.name === 'password')[0].value;

    this.firebase.auth()
                 .createUserWithEmailAndPassword(email, password)
                 .then((credential) => console.log(credential))
                 .catch((error) => console.log(error));
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

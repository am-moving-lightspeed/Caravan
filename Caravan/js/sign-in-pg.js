(function() {

    let backBtn = document.getElementsByName('back-button')[0];
    let submitBtn = document.getElementsByName('submit')[0];
    let form = document.getElementsByName('sign-in-form')[0];
    let email = form.querySelector('input[name="email"]');
    let password = form.querySelector('input[name="password"]');

    backBtn.addEventListener(
        'click',
        (e) => {
            location.assign('index.html');
        }
    );

    password.addEventListener(
        'input',
        (e) => checkFormPassword(form)
    );

    email.addEventListener(
        'input',
        (e) => checkFormEmail(form)
    );

    submitBtn.addEventListener(
        'click',
        (e) => {
            checkFormPassword(form);
            checkFormEmail(form);
            onSubmitForm(e, form);
        }
    );

        form.addEventListener(
            'submit',
            (e) => e.preventDefault()
        );
})();



function checkFormPassword(form) {

    let password = form.querySelector('input[name="password"]');
    let errList = form.querySelector('ul[name="form-error-list"]');
    let pswdErrorMsgs = Array.from(errList.children).filter(
        (element) => element.getAttribute('err-message-for') === 'password'
    );

    for (const element of pswdErrorMsgs) {
        errList.removeChild(element);
    }
    if (errList.children.length === 0) {
        errList.style.display = 'none';
    }

    // NOTE: Configure password requirements here.
    if (!checkPassword(password.value, false, false, 8)) {
        let li = document.createElement('li');
        li.appendChild(
            document.createTextNode(formErrorsMessages['password'])
        );
        li.setAttribute('err-message-for', 'password');
        errList.appendChild(li);
        errList.style.display = 'block';
    }
}



function checkFormEmail(form) {

    let email = form.querySelector('input[name="email"]');
    let errList = form.querySelector('ul[name="form-error-list"]');
    let emailErrorMsgs = Array.from(errList.children).filter(
        (element) => element.getAttribute('err-message-for') === 'email'
    );

    for (const element of emailErrorMsgs) {
        errList.removeChild(element);
    }
    if (errList.children.length === 0) {
        errList.style.display = 'none';
    }

    if (!checkEmail(email.value)) {
        let li = document.createElement('li');
        li.appendChild(
            document.createTextNode(formErrorsMessages['email'])
        )
        li.setAttribute('err-message-for', 'email');
        errList.appendChild(li);
        errList.style.display = 'block';
    }
}



function onSubmitForm(event, form) {

    let errList = form.querySelector('ul[name="form-error-list"]');

    if (errList.children.length > 0) {
        event.preventDefault();

    } else {

        let email = form.querySelector('input[name="email"]').value;
        let password = form.querySelector('input[name="password"]').value;
        firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((credential) => {
                    console.log(credential);
                    location.replace('index.html');
                })
                .catch((error) => {
                    console.log(error);
                });

        event.preventDefault();
    }
}

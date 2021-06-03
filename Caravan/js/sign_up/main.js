(function() {

    let backBtn = document.getElementsByName('back-button')[0];
    let form = document.getElementsByName('registration-form')[0];
    let username = form.querySelector('input[name="username"]');
    let email = form.querySelector('input[name="email"]');
    let password = form.querySelector('input[name="password"]');
    let repPassword = form.querySelector('input[name="repeat-password"]');

    backBtn.addEventListener(
        'click',
        (e) => location.assign('index.html')
    )

    username.addEventListener(
        'input',
        (e) => {
            removePrevMessageOfKind(form, 'registration-error');
            checkFormUsername(form);
        }
    );

    password.addEventListener(
        'input',
        (e) => {
            removePrevMessageOfKind(form, 'registration-error');
            checkFormPassword(form);
        }
    );

    repPassword.addEventListener(
        'input',
        (e) => {
            removePrevMessageOfKind(form, 'registration-error');
            checkFormRepeatedPassword(form);
        }
    );

    email.addEventListener(
        'input',
        (e) => {
            removePrevMessageOfKind(form, 'registration-error');
            checkFormEmail(form);
        }
    );

    form.addEventListener(
        'submit',
        (e) => {
            checkFormUsername(form);
            checkFormEmail(form);
            checkFormPassword(form);
            checkFormRepeatedPassword(form);
            onSubmitForm(e, form);
        }
    )
})();



function onSubmitForm(event, form) {

    let errList = form.querySelector('ul[name="form-error-list"]');

    if (errList.children.length > 0) {
        event.preventDefault();

    } else {

        let email = form.querySelector('input[name="email"]').value;
        let password = form.querySelector('input[name="password"]').value;

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                location.replace('index.html');
            })
            .catch((error) => {
                addMessageOfKind(
                    form,
                    'registration-error',
                    error.message
                );
            });

        event.preventDefault();
    }
}

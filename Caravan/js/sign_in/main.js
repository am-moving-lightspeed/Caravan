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
        (e) => {
            removePrevMessageOfKind(form, 'invalid-credential');
            checkFormPassword(form);
        }
    );

    email.addEventListener(
        'input',
        (e) => {
            removePrevMessageOfKind(form, 'invalid-credential');
            checkFormEmail(form);
        }
    );

    submitBtn.addEventListener(
        'click',
        (e) => {
            checkFormPassword(form);
            checkFormEmail(form);
            onSubmitForm(e, form);
        }
    );
})();



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
                    location.replace('index.html');
                })
                .catch((error) => {
                    addMessageOfKind(
                        form,
                        'invalid-credential',
                        this.formErrorsMessages['invalidCredential']
                    );
                });

        event.preventDefault();
    }
}

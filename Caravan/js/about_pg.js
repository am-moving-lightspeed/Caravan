(function () {

    let backBtns = document.getElementsByTagName('button')

    for (const i in backBtns) {

        backBtns[i].addEventListener('click', ev => {

            location.assign('index.html');
            ev.stopPropagation();
        });
    }
})();

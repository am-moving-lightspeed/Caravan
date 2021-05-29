(function() {

    let backBtns = document.getElementsByTagName('button')

    for (const i in backBtns) {

        backBtns[i].addeentListener(
            'click',
            e => {
                location.assign('index.html');
                e.stopPropagation();
            });
    }
})();

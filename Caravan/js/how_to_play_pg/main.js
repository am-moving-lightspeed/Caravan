(function() {

    let backBtns = document.getElementsByTagName('button');

    for (const btn of backBtns) {

        btn.addEventListener(
            'click',
            e => {
                location.assign('index.html');
            });
    }
})();

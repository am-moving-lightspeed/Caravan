(function() {

    let playBtn = document.getElementById('play');
    let signInBtn = document.getElementById('sign-in');
    let signUpBtn = document.getElementById('sign-up');
    let howToPlayBtn = document.getElementById('how-to-play');

    playBtn.addEventListener(
        'click',
        e => {

        }
    )

    signInBtn.addEventListener(
        'click',
        e => {
            e.stopPropagation();
            location.assign('sign-in.html')
        }
    )

    signUpBtn.addEventListener(
        'click',
        e => {
            e.stopPropagation();
            location.assign('sign-up.html')
        }
    )

    howToPlayBtn.addEventListener(
        'click',
        e => {
            e.stopPropagation();
            location.assign('how-to-play.html')
        }
    )

})();

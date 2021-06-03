(function() {

    let playBtn = document.getElementById('play');
    let signInBtn = document.getElementById('sign-in');
    let signUpBtn = document.getElementById('sign-up');
    let howToPlayBtn = document.getElementById('how-to-play');

    playBtn.addEventListener(
        'click',
        e => {
            if (this.currentUser) {
                location.assign('building-deck.html');
            } else {
                location.assign('sign-in.html');
            }
        }
    )

    signInBtn.addEventListener(
        'click',
        e => location.assign('sign-in.html')
    )

    signUpBtn.addEventListener(
        'click',
        e => location.assign('sign-up.html')
    )

    howToPlayBtn.addEventListener(
        'click',
        e => location.assign('how-to-play.html')
    )

    this.timer = setInterval(getCurrentUserName, 1000);
})();



function getCurrentUserName() {

    let userStatus = document.getElementById('user-status');
    this.currentUser = firebase.auth().currentUser;

    if (currentUser) {
        userStatus.innerText = 'Signed as ' + currentUser.email;
        clearTimeout(this.timer);
    }
}

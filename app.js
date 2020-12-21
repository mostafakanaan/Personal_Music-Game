let allCards = document.getElementsByClassName('card');
let playfield = document.getElementById('playfield');
let songName = "No song found!";
let prevCard = null;
let prevCardNum = 0;
let cardNum = 0;
let flip = new Audio('sfx/flip.mp3');
let fairuz = new Audio('sfx/fairuz.mp3');
fairuz.addEventListener("ended", () => {
    playfield.classList.remove("playing")
});
const songs = [
    {
        name: "Don't let me down",
        cards: [1, 3]
    },
    {
        name: "Bitte geh",
        cards: [5, 9]
    }
];

const openCard = function (e) {
    this.classList.add("rotate");
    flip.play();
    cardNum = this.textContent;
    this.textContent = "";

    setTimeout(() => {

        fairuz.play();
        playfield.classList.add("playing");
        this.classList.add("play");
        this.classList.remove("rotate");


        if (prevCard === null) {
            prevCardNum = cardNum;
            prevCard = this;
        }
        else {

            // compare
            songs.some(song => {
                if (song.cards.includes(parseInt(cardNum)) && song.cards.includes(parseInt(prevCardNum))) {
                    songName = song.name;
                    // point!!
                    this.classList.add("hide");
                    prevCard.classList.add("hide");
                    return;
                }
            })

            console.log(songName);

            // reset
            prevCard.textContent = prevCardNum;
            prevCard.classList.remove("play");
            this.classList.remove("play");
            this.textContent = cardNum;
            prevCard = null;
            prevCardNum = 0;
            songName = "No song found!"
        }
    }, 400);
};

for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', openCard, false);
}
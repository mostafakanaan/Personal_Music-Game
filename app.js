let allCards = document.getElementsByClassName('card');
let playfield = document.getElementById('playfield');
let songName = "No song found!";
let prevCard = null;
let prevCardNum = 0;
let prevAudio = null;
let cardNum = 0;
let flip = new Audio('sfx/flip.mp3');

const songs = [
    {
        name: "fairuz",
        cards: [1, 3]
    },
    {
        name: "Bitte Geh",
        cards: [5, 9]
    },
    {
        name: "Baller los",
        cards: [4, 8]
    },
    {
        name: "Olabilir",
        cards: [2, 7]
    }
];

const openCard = function () {
    this.classList.add("rotate");
    // flip.play();
    cardNum = this.textContent;
    this.textContent = "";

    setTimeout(() => {

        if(prevAudio !== null)
        {
            prevAudio.pause();
        }

        songs.some(song => {
            if (song.cards.includes(parseInt(cardNum))) {
                const audio = new Audio('sfx/' + song.name + '.mp3');
                audio.addEventListener("ended", () => {
                    playfield.classList.remove("playing")
                });
                prevAudio = audio;
                audio.play();
                return;
            }
        })

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
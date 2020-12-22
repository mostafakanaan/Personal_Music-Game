let allCards = document.getElementsByClassName('card');
let playfield = document.getElementById('playfield');
let songName = "No song found!";
let prevCard = null;
let prevCardNum = 0;
let prevAudio = null;
let cardNum = 0;
let flip = new Audio('sfx/flip.mp3');
let openCards = [];
let reservedNums = [];

const songs = [
    {
        name: "fairuz",
        cards: pickCardNums()
    },
    {
        name: "Bitte Geh",
        cards: pickCardNums()
    },
    {
        name: "Baller los",
        cards: pickCardNums()
    },
    {
        name: "Olabilir",
        cards: pickCardNums()
    }
];

const openCard = function () {

    if(openCards.length === 2)
        return;
        
    this.classList.add("rotate");
    // flip.play();
    cardNum = this.textContent;
    this.textContent = "";

    setTimeout(() => {

        if (prevAudio !== null) {
            prevAudio.pause();
        }

        songs.some(song => {
            if (song.cards.includes(parseInt(cardNum))) {
                const audio = new Audio('sfx/' + song.name + '.mp3');
                audio.addEventListener("ended", () => {
                    playfield.classList.remove("playing");
                });
                prevAudio = audio;
                audio.play();
                return;
            }
        })

        playfield.classList.add("playing");
        this.classList.add("play");
        openCards.push(this.textContent);
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

            // reset


            setTimeout(() => {
                prevCard.classList.remove("play");
                this.classList.remove("play");
                openCards = [];
                playfield.classList.remove("playing");
                prevCard.textContent = prevCardNum;
                this.textContent = cardNum;
                prevCard = null;
                prevCardNum = 0;
                cardNum = 0;
                songName = "No song found!";
            }, 5500);
        }
    }, 400);
};

for (let i = 0; i < allCards.length; i++) {
    allCards[i].addEventListener('click', openCard, false);
}

function pickCardNums() {
    let res = []
    let num1 = 0;
    let num2 = 0;

    do {
        num1 = Math.floor(Math.random() * 40) + 1;
    } while (reservedNums.includes(parseInt(num1)));

    reservedNums.push(num1);
    res.push(num1);


    do {
        num2 = Math.floor(Math.random() * 40) + 1;
    } while (reservedNums.includes(parseInt(num2)));

    reservedNums.push(num2);
    res.push(num2);
    return res;
}

songs.forEach(song => {
    console.log(song.cards[0] + " " + song.cards[1])
});
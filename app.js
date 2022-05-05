import { renderGoblin } from './render-utils.js';
const defeatedNumberEl = document.querySelector('#defeated-number');
const adventureHPEL = document.querySelector('#adventurer-hp');
const adventurerImgEl = document.querySelector('#adventurer-img');
const form = document.querySelector('form');
const goblinListEl = document.querySelector('.goblins');
const player = {};

let defeatedGoblinsCount = 0;
player.hp = 10;
let goblins = [
    { name: 'Cookie', hp: 1 },
    { name: 'professor goblin', hp: 4 },
];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const goblinName = data.get('goblin-name');

    const newGoblin = {
        name: goblinName,
        hp: Math.ceil(Math.random() * 5),
    };

    goblins.push(newGoblin);
    displayGoblins();
});

function displayGoblins() {
    goblinListEl.textContent = '';

    for (let goblin of goblins) {
        const goblinEl = renderGoblin(goblin);

        goblinEl.addEventListener('click', () => {
            goblinClickHandler(goblin);
        });
        goblinListEl.append(goblinEl);
    }
}
displayGoblins();

function goblinClickHandler(goblin) {


    if (goblin.hp === 0) return;
    if (player.hp === 0) return;

    const playerHit = Math.random();
    if (playerHit < 0.5) {
        goblin.hp--;
        displayGoblins();
        alert(`You hit ${goblin.name}!`);

        if (goblin.hp === 0) {
            defeatedGoblinsCount++;
            defeatedNumberEl.textContent = defeatedGoblinsCount;
        }
    } else {
        alert('You missed!');
    }

    const goblinHit = Math.random();
    if (goblinHit < 0.5) {
        player.hp--;
        adventureHPEL.textContent = player.hp;
        alert(`${goblin.name} hit you! ${player.hp === 0 ? 'Game Over 🥲' : ''}`);
    } else {
        alert(`${goblin.name} tried to hit you and missed!!`);
        adventurerImgEl.classList.add('game-over');
    }

}

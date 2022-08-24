import test from './modules/test';
import blue from './data/mythicCards/blue/index';
import green from './data/mythicCards/green/index';
import brown from './data/mythicCards/brown/index';
import ancients from './data/ancients';
import difficulty from './data/difficulties';

/**
 * 1й этап: выбираем древнего
 */

let choosedAncient = {};

const ancientContainer = document.querySelector('.ancients_container');
// создаём карточки древних
for (let i = 0; i < (ancients.length); i++) {
  let image = new Image();
  image.src = `${ancients[i].cardFace}`;
  image.id = `${ancients[i].id}`
  image.classList.add('ancient_card')
  ancientContainer.append(image);
}

const ancientCard = document.querySelectorAll('.ancient_card');
// выбираем древнего и записываем выбранного в переменную choosedAncient
ancientCard.forEach((el, idx) => {
  el.addEventListener('click', (event) => {
    if ((ancients[idx].id) == event.target.id) {
      choosedAncient = ancients[idx];
      ancientCard.forEach(el => {
        el.classList.remove('active');
      })
      event.target.classList.add('active');
    }
  })
})

// закрываем выбор древних, открываем выбор сложности
const but = document.querySelector('.button');
but.addEventListener('click', () => {
  console.log(choosedAncient.firstStage.greenCards);
  // TODO отобразить число карточек в счётчике, скрыть выбор древних, открыть уровень сложности
})
console.log(ancients);

/**
// выбираем уровень сложности и составляем колоду
*/

let choosedDifficulty;

const difficultyContainer = document.querySelector('.difficulty_container');

for (let i = 0; i < (difficulty.length); i++) {
  const btn = document.createElement('button');
  btn.innerHTML = `${difficulty[i].name}`;
  btn.classList.add('btn_diff');
  btn.id = `${difficulty[i].id}`;
  difficultyContainer.append(btn);
}

const difficultyBtn = document.querySelectorAll('.btn_diff');

difficultyBtn.forEach((el, idx) => {
  el.addEventListener('click', (event) => {
    if (difficulty[idx].id === event.target.id) {
      choosedDifficulty = event.target.id;
      console.log(choosedDifficulty);
      difficultyBtn.forEach(el => {
        el.classList.remove('active');
      })
      event.target.classList.add('active');
    }
  })
});

// составляем колоду

const diffOkBtn = document.querySelector('#difficultyOk');

let miniDeck = [];
let allDeck = [];
let playDeck = [];

allDeck = allDeck.concat(green);
allDeck = allDeck.concat(blue);
allDeck = allDeck.concat(brown);

// console.log(allDeck);

diffOkBtn.addEventListener('click', () => {
  miniDeck = [];
  if (choosedDifficulty == 'very_easy') {
    allDeck.forEach((el) => {
      if (el.difficulty == 'easy') {
        miniDeck.push(el);
        console.log(miniDeck);
      }
      miniDeck = miniDeck.sort(() => Math.random - 0.5);
    })
    deckSort(choosedAncient, miniDeck);
  }

  if (choosedDifficulty == 'easy') {
    allDeck.forEach((el) => {
      if (el.difficulty != 'hard') {
        miniDeck.push(el);
        console.log(miniDeck);
      }
    })
  }

  if (choosedDifficulty == 'normal') {
    allDeck.forEach((el) => {       
        miniDeck.push(el);
        console.log(miniDeck);      
    })
  }

  if (choosedDifficulty == 'hard') {
    allDeck.forEach((el) => {
      if (el.difficulty != 'easy') {
        miniDeck.push(el);
        console.log(miniDeck);
      }
    })
  }

  if (choosedDifficulty == 'very_hard') {
    allDeck.forEach((el) => {
      if (el.difficulty == 'hard') {
        miniDeck.push(el);
        console.log(miniDeck);
      }
    })
  }

})



const deckSort = (choosedAncient, miniDeck) => {
  for (let i = 0; i <= choosedAncient.firstStage.greenCards - 1; i++) {
    
    miniDeck.forEach(el => {
      console.log(el);
    })
    
  }
}



/**
// счётчик карт, отображение карт по одной из колоды
*/





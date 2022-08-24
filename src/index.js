import test from './modules/test';
import blue from './data/mythicCards/blue/index';
import green from './data/mythicCards/green/index';
import brown from './data/mythicCards/brown/index';
import ancients from './data/ancients';
import difficulty from './data/difficulties';

/**
 ** 1й этап: выбираем древнего
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
const cell = document.querySelectorAll('.count_cell');
let greenCardsArr = [];
let brownCardsArr = [];
let blueCardsArr = [];
but.addEventListener('click', () => {
  // очищаем значения в массивах
  greenCardsArr = [];
  brownCardsArr = [];
  blueCardsArr = [];
  // зелёные карточки
  greenCardsArr.push(choosedAncient.firstStage.greenCards);
  greenCardsArr.push(choosedAncient.secondStage.greenCards);
  greenCardsArr.push(choosedAncient.thirdStage.greenCards);
  brownCardsArr.push(choosedAncient.firstStage.brownCards);
  brownCardsArr.push(choosedAncient.secondStage.brownCards);
  brownCardsArr.push(choosedAncient.thirdStage.brownCards);
  blueCardsArr.push(choosedAncient.firstStage.blueCards);
  blueCardsArr.push(choosedAncient.secondStage.blueCards);
  blueCardsArr.push(choosedAncient.thirdStage.blueCards);

  cell.forEach((el, idx) => {
    if (idx % 3 == 0) {
      el.textContent = `${greenCardsArr[idx / 3]}`;
    } else  // коричневые карточки
      if (idx == 1 || idx == 4 || idx == 7) {
        el.textContent = `${brownCardsArr[idx == 7 ? 2 : (idx != 1 ? idx - 3 : 0)]}`
      }  // голубые карточки
      else {
        el.textContent = `${blueCardsArr[idx == 2 ? 0 : (idx == 5 ? 1 : 2)]}`
      }

  })
  // console.log(choosedAncient.firstStage.greenCards);
  // console.log(Object.values(choosedAncient.firstStage));
  // TODO отобразить число карточек в счётчике, скрыть выбор древних, открыть уровень сложности
})
console.log(ancients);

/**
//* 2й этап  выбираем уровень сложности и составляем колоду
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
// * 3й этап счётчик карт, отображение карт по одной из колоды
*/

// TODO тображать колоды согласно карте древнего. Добавить кнопку "Заново"

// TODO разделить экраны по этапам



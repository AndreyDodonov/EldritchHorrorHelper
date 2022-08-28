import colorsArr from './modules/colorsArr';
import blue from './data/mythicCards/blue/index';
import green from './data/mythicCards/green/index';
import brown from './data/mythicCards/brown/index';
import ancients from './data/ancients';
import difficulty from './data/difficulties';
import randomIndex from './modules/randomIndex';

/**
 ** 1й этап: выбираем древнего
 */

let choosedAncient = {};

const ancientContainer = document.querySelector('.ancients_container');
const difficultyContainer = document.querySelector('.difficulty_container');
const deckContainer = document.querySelector('.deck_container')

difficultyContainer.style.display = 'none';
deckContainer.style.display = 'none';
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
let brownCardsArrNormal = [];
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

  ancientContainer.style.display = 'none';
  difficultyContainer.style.display = 'flex';

})

/**
//* 2й этап  выбираем уровень сложности и составляем колоду
*/

let choosedDifficulty;

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

let miniDeck = []; // колода, сформированная согласно уровня сложности
let allDeck = [];

// собираем все карты в один массив
allDeck = allDeck.concat(green);
allDeck = allDeck.concat(blue);
allDeck = allDeck.concat(brown);

let playDeck1stStage = [];
let playDeck2ndStage = [];
let playDeck3rdStage = [];

let normalDeck = [];

diffOkBtn.addEventListener('click', () => {
  miniDeck = [];

  allDeck.forEach((el) => {
    if (el.difficulty == 'normal') {
      normalDeck.push(el);
    }
  })

  if (choosedDifficulty == 'very_easy') {
    allDeck.forEach((el) => {
      if (el.difficulty == 'easy') {
        miniDeck.push(el);
      }
    })
  }

  if (choosedDifficulty == 'easy') {
    allDeck.forEach((el) => {
      if (el.difficulty != 'hard') {
        miniDeck.push(el);
      }
    })
  }

  if (choosedDifficulty == 'normal') {
    allDeck.forEach((el) => {
      miniDeck.push(el);
    })
  }

  if (choosedDifficulty == 'hard') {
    allDeck.forEach((el) => {
      if (el.difficulty != 'easy') {
        miniDeck.push(el);
      }
    })
  }

  if (choosedDifficulty == 'very_hard') {
    allDeck.forEach((el) => {
      if (el.difficulty == 'hard') {
        miniDeck.push(el);
      }
    })
  }
  // мини колоды по цветам
  colorsArr('green', greenCardsArr, miniDeck);
  colorsArr('blue', blueCardsArr, miniDeck);
  colorsArr('brown', brownCardsArr, miniDeck);

  colorsArr('brown', brownCardsArrNormal, normalDeck);

  // колода для первого стейджа
  for (let i = 0; i < choosedAncient.firstStage.greenCards; i++) {
    let randomIdx = randomIndex(greenCardsArr);
    playDeck1stStage.push(greenCardsArr[randomIdx]);
    greenCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.firstStage.blueCards; i++) {
    let randomIdx = randomIndex(blueCardsArr);
    playDeck1stStage.push(blueCardsArr[randomIdx]);
    blueCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.firstStage.brownCards; i++) {
    let randomIdx = randomIndex(brownCardsArr);
    playDeck1stStage.push(brownCardsArr[randomIdx]);
    brownCardsArr.splice(randomIdx, 1);
  }
  console.log(playDeck1stStage);

  // колода для второго стейджа
  for (let i = 0; i < choosedAncient.secondStage.greenCards; i++) {
    let randomIdx = randomIndex(greenCardsArr);
    playDeck2ndStage.push(greenCardsArr[randomIdx]);
    greenCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.secondStage.blueCards; i++) {
    let randomIdx = randomIndex(blueCardsArr);
    playDeck2ndStage.push(blueCardsArr[randomIdx]);
    blueCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.secondStage.brownCards; i++) {
    let randomIdx = randomIndex(brownCardsArr);
    playDeck2ndStage.push(brownCardsArr[randomIdx]);
    brownCardsArr.splice(randomIdx, 1);
  }
  console.log(playDeck2ndStage);

  // колода для третьего стейджа
  for (let i = 0; i < choosedAncient.thirdStage.greenCards; i++) {
    let randomIdx = randomIndex(greenCardsArr);
    playDeck3rdStage.push(greenCardsArr[randomIdx]);
    greenCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.thirdStage.blueCards; i++) {
    let randomIdx = randomIndex(blueCardsArr);
    playDeck3rdStage.push(blueCardsArr[randomIdx]);
    blueCardsArr.splice(randomIdx, 1);
  }
  for (let i = 0; i < choosedAncient.thirdStage.brownCards; i++) {
    let randomIdx = randomIndex(brownCardsArr);
    if (brownCardsArr[randomIdx] == undefined) {
      let randomIdx = randomIndex(brownCardsArrNormal);
      playDeck3rdStage.push(brownCardsArrNormal[randomIdx]);
    } else {
      playDeck3rdStage.push(brownCardsArr[randomIdx]);
      brownCardsArr.splice(randomIdx, 1);
    }
   
  }


  console.log(playDeck3rdStage);
  difficultyContainer.style.display = 'none';
  deckContainer.style.display = 'flex';

})

/**
// * 3й этап счётчик карт, отображение карт по одной из колоды
*/

const frontDeck = document.querySelector('.front-deck'); // лицевая сторона карты
const stageIndicator = document.querySelectorAll('.text_cell');

let showFrontDeck = () => {
  // меняем отображение этапа
  if (playDeck1stStage.length != 0) {
    stageIndicator[0].style.textDecoration = 'underline';
    // показываем карты по очереди  
    let randomIdx = randomIndex(playDeck1stStage);
    frontDeck.style.backgroundImage = `url(${playDeck1stStage[randomIdx].cardFace})`;
    if (playDeck1stStage[randomIdx].color == 'green') {
      cell[0].textContent = `${--cell[0].textContent}`
    } else if (playDeck1stStage[randomIdx].color == 'blue') {
      cell[2].textContent = `${--cell[2].textContent}`
    } else if (playDeck1stStage[randomIdx].color == 'brown') {
      cell[1].textContent = `${--cell[1].textContent}`
    }
    playDeck1stStage.splice(randomIdx, 1);

  } else if (playDeck2ndStage.length != 0) {
    stageIndicator[0].style.textDecoration = 'line-through';
    stageIndicator[1].style.textDecoration = 'underline';
    // показываем карты по очереди  
    let randomIdx = randomIndex(playDeck2ndStage);
    frontDeck.style.backgroundImage = `url(${playDeck2ndStage[randomIdx].cardFace})`;
    if (playDeck2ndStage[randomIdx].color == 'green') {
      cell[3].textContent = `${--cell[3].textContent}`
    } else if (playDeck2ndStage[randomIdx].color == 'blue') {
      cell[5].textContent = `${--cell[5].textContent}`
    } else if (playDeck2ndStage[randomIdx].color == 'brown') {
      cell[4].textContent = `${--cell[4].textContent}`
    }
    playDeck2ndStage.splice(randomIdx, 1);
    // меняем счётчик

  } else if (playDeck3rdStage.length != 0) {
    stageIndicator[0].style.textDecoration = 'line-through';
    stageIndicator[1].style.textDecoration = 'line-through';
    stageIndicator[2].style.textDecoration = 'underline';
    // показываем карты по очереди  
    let randomIdx = randomIndex(playDeck3rdStage);
    frontDeck.style.backgroundImage = `url(${playDeck3rdStage[randomIdx].cardFace})`;
    if (playDeck3rdStage[randomIdx].color == 'green') {
      cell[6].textContent = `${--cell[6].textContent}`
    } else if (playDeck3rdStage[randomIdx].color == 'blue') {
      cell[8].textContent = `${--cell[8].textContent}`
    } else if (playDeck3rdStage[randomIdx].color == 'brown') {
      cell[7].textContent = `${--cell[7].textContent}`
    }
    playDeck3rdStage.splice(randomIdx, 1);
  } else {
    stageIndicator[0].style.textDecoration = 'line-through';
    stageIndicator[1].style.textDecoration = 'line-through';
    stageIndicator[2].style.textDecoration = 'line-through';
    // !TODO выводить надпись "карты кончились, нажмите кнопку заново"
  }

}


frontDeck.addEventListener('click', showFrontDeck);

// кнопка перезагрузки страницы, чтобы начать заново

const reloadButton = document.querySelector('#reload_button');

reloadButton.addEventListener('click', () => {
  window.location.reload();
})

// TODO отображать колоды согласно карте древнего. Добавить кнопку "Заново"

// TODO разделить экраны по этапам



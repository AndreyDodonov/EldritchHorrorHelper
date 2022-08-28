/**
 * *Рекурсивная функция по сбору карт определённого цвета в один массив
 * (получилась не рекурсивная - ну и ладно)
 * @param {*} color - цвета по которым надо отсортировать маиив карт
 * @param {*} resArr - результирующий массив
 * @param {*} startArr - исходный массив
 */

const colorsArr = (color, resArr, startArr) => {
  for (let item of startArr) {
    if (item.color === color){
      resArr.push(item);
    }    
  }
  // ! вот такое вот тупое решение! Не знаю откуда берутся первые три элемента
  // ! поэтому просто удаляю их
  // !TODO fix it!
  // !TODO rename function because this is not recursion
  resArr.shift();
  resArr.shift();
  resArr.shift();  
}

export default colorsArr;
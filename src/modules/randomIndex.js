/**
 * *Функция генерирующая случайное число, не превышающее длину индекса и проверяющая, чтобы массив не был пустой
 *
 * @param {*} arr массив на основе длины которого надо сформировать число
 * @returns возвращает сгенерированное на основе длины массива случайное число 
 */

const randomIndex = (arr) => {
  let randomIdx = Math.floor(Math.random() * arr.length);
  if (arr[randomIndex] == '') {
    randomIndex(arr)
  }
  return randomIdx;
}

export default randomIndex;
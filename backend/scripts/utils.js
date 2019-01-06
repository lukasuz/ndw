/**
* https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array#6274398
*/
module.exports.shuffle = function(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/**
* Liefert ein random Element aus einem Array
* @param {Array} array aus dem ein Element ausgewählt werden soll
* @returns {Object} random Element aus dem Array
*/
module.exports.getRandomElementFromArray = function(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

module.exports = {
   randomArrayItem(array) {
    let item = array[Math.floor(Math.random() * array.length)];
    return item;
   }
  
}
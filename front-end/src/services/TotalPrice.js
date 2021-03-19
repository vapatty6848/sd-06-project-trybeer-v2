// function calculateOrderPrice(array, total) {
//   const productsPrice = array.reduce((acc, curr) => {
//     const number = parseInt((curr.price), 10);
//     return acc + number;
//   }, 0);

//   total(productsPrice);
// }
function sumTotal(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
}

export default sumTotal;

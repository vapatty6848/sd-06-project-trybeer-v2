function TotalPrice(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
}

export default TotalPrice;

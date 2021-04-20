const disable = (setAble, products, address) => {
  const lengthZero = 0;
  const listLength = products.length > lengthZero;
  if (listLength && address.rua !== '' && address.numero !== '') {
    setAble(false);
  } else {
    return setAble(true);
  }
};

const valueTotal = (list, callBack) => {
  const reducer = (acc, curr) => acc + curr;
  const noValue = '0,00';
  if (list.length > 0) {
    const totalValue = list.map((item) => item.totalValue).reduce(reducer);
    callBack(totalValue.toFixed(2));
    return totalValue;
  }
  callBack(noValue);
  return noValue;
};

module.exports = { disable, valueTotal };

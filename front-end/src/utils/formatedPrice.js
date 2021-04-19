const CURRENCY = 'R$';

const formatedPrice = (price) => {
  if (price === '0') return `${CURRENCY} 0,00`;
  return `${CURRENCY} ${price.toString().replace('.', ',')}`;
};

export default formatedPrice;

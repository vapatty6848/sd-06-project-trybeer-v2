import { getUserInfo } from './localStorage';

export const chatTime = () => {
  const dateToFormat = new Date();
  const formatedDate = new Intl.DateTimeFormat('pt-BR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(dateToFormat);

  return formatedDate;
}

export const formatCurrency = (quantity = 1, price) => {
  const formatedCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(quantity * Number(price));

  return formatedCurrency;
}

export const formatMessage = (text) => {
  const { id:userId } = getUserInfo();

  const message = { userId, text }
  return message;
};

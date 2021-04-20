import { getUserInfo } from './localStorage';

export const formatDate = (date) => {
  const dateToFormat = new Date(date);
  const formatedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
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

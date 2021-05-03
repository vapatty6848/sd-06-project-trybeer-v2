const dateFormat = require('dateformat');

export default function formatDate(date) {
  const sentAt = dateFormat(date, 'HH:MM');
  return sentAt;
}

const dateFormat = require('dateformat');

export default function formatDate(date) {
  const sentAt = dateFormat(date, 'H:MM');
  return sentAt;
}

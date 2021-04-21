export default (price) => `${parseFloat(price).toFixed(2)}`.replace('.', ',');

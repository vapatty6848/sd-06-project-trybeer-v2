export default (productId, quantity, products) => {
  const product = products.find((curr) => curr.id === productId);
  if (!product) return null;
  const price = parseFloat(product.price);
  const quantityInt = parseInt(quantity, 10);
  const productTotal = (price * quantityInt).toFixed(2);
  return productTotal;
};

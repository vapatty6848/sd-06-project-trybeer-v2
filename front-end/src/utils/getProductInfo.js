const getProductInfo = (productId, products, info) => {
  const product = products.find((curr) => curr.id === productId);
  if (!product) return {};
  return product[info];
};

export default getProductInfo;

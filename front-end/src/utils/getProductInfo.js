const getProductInfo = (productId, products, info) => {
  const product = products.find((curr) => curr.id === productId);
  return product[info];
};

export default getProductInfo;

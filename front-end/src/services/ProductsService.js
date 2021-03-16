const productsFetch = async () => {
  const allProducts = await fetch('http://localhost:3001/products')
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return allProducts;
};

export default productsFetch;

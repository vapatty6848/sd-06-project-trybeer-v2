const productsFetch = async () => {
  const allProducts = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return allProducts;
};

export default productsFetch;

const baseURL = 'http://localhost:3001/admin/orders';

const updateStatus = async (sale) => {
  console.log('clicou no btn', sale)
  const postMethod = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sale,
    }),
  };
  const apiRequest = await fetch(`${baseURL}/${sale.id}`, postMethod);
  const apiResponse = await apiRequest.json();
  return apiResponse.updatedSale[0];
};

export default updateStatus;

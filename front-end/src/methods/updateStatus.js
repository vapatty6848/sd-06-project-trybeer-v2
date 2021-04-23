const baseURL = 'http://localhost:3001/admin/orders';

const updateStatus = async (sale, status) => {
  const postMethod = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sale: { id: sale.saleId, status },
    }),
  };
  const apiRequest = await fetch(`${baseURL}/${sale.saleId}`, postMethod);
  const apiResponse = await apiRequest.json();
  console.log('resposta da api', apiResponse);
  return apiResponse;
};

export default updateStatus;

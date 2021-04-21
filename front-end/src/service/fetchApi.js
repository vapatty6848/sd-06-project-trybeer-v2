const POST = 'POST';
const fetchApiJsonBody = async (urlParameter, body, method = POST, token = '') => fetch(
  `http://localhost:3001${urlParameter}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(body),
  },
).then((response) => response.json());

export default fetchApiJsonBody;

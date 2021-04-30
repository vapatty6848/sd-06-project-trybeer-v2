const POST = 'POST';
const fetchApiJsonBody = async (urlParameter, body, method = POST, token = '') => fetch(
  `https://main-group-6-back.herokuapp.com${urlParameter}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(body),
  },
).then((response) => response.json());

export default fetchApiJsonBody;

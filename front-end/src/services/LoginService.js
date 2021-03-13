const loginFetch = async (email, password) => {
  const jsonWebToken = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return jsonWebToken;
};

export default loginFetch;

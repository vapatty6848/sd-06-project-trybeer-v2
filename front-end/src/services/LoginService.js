const loginFetch = async (email, password) => {
  const userResponse = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error.message));
  return userResponse;
};

export default loginFetch;

const loginFetch = async (email, password) => {
  const userResponse = await fetch('localhost:3001/login', {
    method: 'POST',
    headers: {
      'Accept': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const response = await userResponse.json();
  console.log('response', response);
    // .then((resp) => console.log(resp.json()))
    // .catch((error) => console.log(error.message));
  // console.log(userResponse);
  return userResponse;
};

export default loginFetch;

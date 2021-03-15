const registerFetch = async (name, email, password, role) => {
  const newUser = await fetch('http://localhost:3001/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return newUser;
};

export default registerFetch;

const profileFetch = async (name, email) => {
  const jsonWebToken = await fetch('http://localhost:3001/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  })
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
  return jsonWebToken;
};

export default profileFetch;

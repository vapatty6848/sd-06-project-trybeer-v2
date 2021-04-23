const baseURL = 'http://localhost:3001/chat';

const fetchMessages = async () => {
  const apiRequest = await fetch(baseURL);
  const apiResponse = await apiRequest.json();
  return apiResponse;
};

export default fetchMessages;

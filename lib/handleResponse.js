function handleResponse(response) {
  return response.json().then((json) => {
    if (json.errors) {
      throw new Error('Failed to fetch API');
    }
    return json.data;
  });
}
export default handleResponse;

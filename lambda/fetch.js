import fetch from "node-fetch";

const API_ENDPOINT = "https://www.artstation.com/projects.json";

exports.handler = async (event, context) => {
  const { page, sorting } = event.queryStringParameters;

  return fetch(`${API_ENDPOINT}?page=${page}&sorting=${sorting}`)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

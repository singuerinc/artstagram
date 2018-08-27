import fetch from "node-fetch";

const API_ENDPOINT = "https://www.artstation.com/projects.json";

exports.handler = async event => {
  const { page, sorting } = event.queryStringParameters;
  const url = `${API_ENDPOINT}?page=${page}&sorting=${sorting}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

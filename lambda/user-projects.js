import fetch from "node-fetch";
const { URLSearchParams } = require("url");

const API_ENDPOINT = user =>
  `https://www.artstation.com/users/${user}/projects.json`;

exports.handler = async ({ queryStringParameters }) => {
  const params = new URLSearchParams(queryStringParameters);

  params.set("nocache", new Date().getTime());

  const user = params.get("user");
  const url = `${API_ENDPOINT(user)}?${params.toString()}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

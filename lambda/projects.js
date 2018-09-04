import fetch from "node-fetch";
const { URLSearchParams } = require("url");

const API_ENDPOINT = `https://www.artstation.com/projects.json`;

exports.handler = async ({ queryStringParameters }) => {
  const params = new URLSearchParams(queryStringParameters);

  params.set("nocache", new Date().getTime());

  const url = `${API_ENDPOINT}?${params.toString()}`;

  console.log({ url });

  return fetch(url)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

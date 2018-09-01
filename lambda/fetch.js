import fetch from "node-fetch";
const { URLSearchParams } = require("url");

exports.handler = async ({ queryStringParameters }) => {
  const { url } = queryStringParameters;

  const params = new URLSearchParams(queryStringParameters);
  params.delete("url");

  return fetch(`${url}?${params.toString()}`)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};

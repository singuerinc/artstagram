import fetch from "node-fetch";

const API_ENDPOINT = "https://www.artstation.com/projects.json";

export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);
  params.set("nocache", Date.now());

  const url = `${API_ENDPOINT}?${params.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(422).send(String(error));
  }
}

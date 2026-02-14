import fetch from "node-fetch";

const API_ENDPOINT = (user) =>
  `https://www.artstation.com/users/${user}/projects.json`;

export default async function handler(req, res) {
  const params = new URLSearchParams(req.query);
  params.set("nocache", Date.now());

  const user = params.get("user");
  params.delete("user");

  const url = `${API_ENDPOINT(user)}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(422).send(String(error));
  }
}

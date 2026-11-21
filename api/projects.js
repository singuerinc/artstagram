import fetch from "node-fetch";
import { buildCommunityUrl, toArtImage } from "./_lib/community.js";

const API_ENDPOINT = "https://www.artstation.com/projects.json";

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
};

export default async function handler(req, res) {
  try {
    if (req.query.sorting === "picks") {
      const { data } = await fetchJson(buildCommunityUrl(req.query));
      return res.status(200).json({ data: data.map(toArtImage) });
    }

    const params = new URLSearchParams(req.query);
    params.set("nocache", Date.now());
    const data = await fetchJson(`${API_ENDPOINT}?${params.toString()}`);
    res.status(200).json(data);
  } catch (error) {
    res.status(422).send(String(error));
  }
}

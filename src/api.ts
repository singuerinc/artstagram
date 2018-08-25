import * as axios from "axios";

const get = (x, url) => {
  return x.get(url);
};

export const request = (url: string) => get(axios, url);

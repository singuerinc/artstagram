import * as axios from "axios";

const get = (x, url, params) => {
  return x.get(url, params);
};

export const request = (url, params) => get(axios, url, params);

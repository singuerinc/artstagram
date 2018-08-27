import * as axios from "axios";

const get = (x, url) => x.get(url);

export const request = (url: string) => get(axios, url);

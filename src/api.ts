import * as axios from "axios";
import { ArtImage } from "./artImage";

const get = (x, url) => x.get(url);

export const request = (
  url: string
): axios.AxiosPromise<{ data: ArtImage[] }> => get(axios, url);

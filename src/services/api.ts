import ky, { ResponsePromise } from "ky";
import { IArtImage } from "../IArtImage";

interface IResponse {
  data: IArtImage[];
}

interface IParams {
  [param: string]: any;
}

const encode = encodeURIComponent;
const asQuery = (obj: IParams) =>
  Object.keys(obj)
    .map(key => encode(key) + "=" + encode(obj[key]))
    .join("&");

const request = (url: string): ResponsePromise => ky.get(url);

const load = async (endpoint: string, params?: IParams | null) => {
  const query = asQuery(params || {});
  const url = `${endpoint}${query ? `&${query}` : ""}`;
  const { data } = await request(url).json();

  return data as IArtImage[];
};

export { load, request, asQuery, IParams, IResponse };

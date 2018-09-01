import * as axios from "axios";
import { IArtImage } from "../IArtImage";
import { Sorting } from "../Sorting";

interface IResponse {
  data: IArtImage[];
}

interface IParams {
  [param: string]: any;
}

const encode = encodeURIComponent;
const asQuery = obj =>
  Object.keys(obj)
    .map(key => encode(key) + "=" + encode(obj[key]))
    .join("&");

const request = (url: string): axios.AxiosPromise<IResponse> => axios.get(url);

const load = async (endpoint: string, params: IParams | null) => {
  const query = asQuery(params || {});
  const url = `${endpoint}${query ? `&${query}` : ""}`;
  const {
    data: { data }
  } = await request(url);

  return data as IArtImage[];
};

export { load };

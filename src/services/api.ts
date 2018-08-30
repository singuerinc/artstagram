import * as axios from "axios";
import { prop } from "ramda";
import { IArtImage } from "../IArtImage";
import { Sorting } from "../Sorting";

interface IParams {
  sorting: Sorting;
  page: number;
}

const get = (x, url) => x.get(url);
const mapData = prop("data");

const request = (url: string): axios.AxiosPromise<{ data: IArtImage[] }> =>
  get(axios, url);

const load = async (
  url: string,
  { page, sorting }: IParams
): Promise<IArtImage[]> => {
  const { data } = await request(`${url}?page=${page}&sorting=${sorting}`);

  return mapData(data);
};

export { load };

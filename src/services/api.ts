import * as axios from "axios";
import { IArtImage } from "../IArtImage";
import { Sorting } from "../Sorting";

interface IResponse {
  data: IArtImage[];
}

interface IParams {
  sorting: Sorting;
  page: number;
}

const request = (url: string): axios.AxiosPromise<IResponse> => axios.get(url);

const load = async (url: string, { page, sorting }: IParams) => {
  const {
    data: { data }
  } = await request(`${url}?page=${page}&sorting=${sorting}`);

  return data as IArtImage[];
};

export { load };

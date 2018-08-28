import { prop } from "ramda";
import { request } from "./api";
import { ArtImage } from "./artImage";
import { Sorting } from "./sorting";

type Params = {
  page: number;
  sorting: Sorting;
};

const mapData = prop("data");

const load = (url: string, { page, sorting }: Params): Promise<ArtImage[]> =>
  request(`${url}?page=${page}&sorting=${sorting}`).then(({ data }) => {
    return mapData(data);
  });

export { load };

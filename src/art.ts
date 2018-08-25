import { prop } from "ramda";
import { request } from "./api";
import { ArtImage } from "./artImage";

const mapData = prop("data");

const load = (
  url: string,
  { page, sorting }: { page: number; sorting: string }
): Promise<ArtImage[]> =>
  request(`${url}?page=${page}&sorting=${sorting}`).then(({ data }) => {
    return mapData(data) as ArtImage[];
  });

export { load };

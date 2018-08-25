import { map, prop } from "ramda";
import { request } from "./api";
import { ArtImage } from "./artImage";

const mapData = prop("data");

const load = (
  url: string,
  { page, sorting }: { page: number; sorting: string }
): Promise<ArtImage[]> =>
  request(`${url}?page=${page}&sorting=${sorting}`).then(({ data }) => {
    const collection: ArtImage[] = mapData(data);

    return collection;
  });

export { load };

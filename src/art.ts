import { map, prop } from "ramda";
import { request } from "./api";
import { ArtImage } from "./artImage";

const mapData = prop("data");

const load = (url: string): Promise<ArtImage[]> =>
  request(url, {
    page: 1,
    sorting: "picks"
  }).then(({ data }) => {
    const collection: ArtImage[] = mapData(data);

    return collection;
  });

export { load };

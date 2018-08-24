import { map, prop } from "ramda";
import { request } from "./api";
import { ArtImage, RawArtImage } from "./artImage";

const mapData = prop("data");

const findImage = (x: RawArtImage): ArtImage => ({
  id: x.id,
  title: x.title,
  adult_content: x.adult_content,
  src: x.cover.medium_image_url
});

const mapImages = map(findImage);

const load = (url: string): Promise<ArtImage[]> =>
  request(url, {
    page: 1,
    sorting: "picks"
  }).then(({ data }) => {
    const collection: RawArtImage[] = mapData(data);
    const images: ArtImage[] = mapImages(collection);

    return images;
  });

export { load };

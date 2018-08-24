import { map, prop } from "ramda";
import { request } from "./api";
import { ArtImage, RawArtImage } from "./artImage";

// small_image_url
// medium_image_url
// small_square_url
// thumb_url
// micro_square_image_url

const mapData = prop("data");

const findImage = (x: RawArtImage): ArtImage => ({
  id: x.id,
  src: x.cover.small_image_url
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

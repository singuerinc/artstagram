import { map, prop } from "ramda";
import { request } from "./api";

// small_image_url
// medium_image_url
// small_square_url
// thumb_url
// micro_square_image_url

const mapData = prop("data");
const findImage = x => x.cover.small_image_url;
const mapImages = map(findImage);

const load = url =>
  request(url, {
    page: 1,
    sorting: "picks"
  }).then(({ data }) => {
    const collection = mapData(data);
    const images = mapImages(collection);
    return images;
  });

export { load };

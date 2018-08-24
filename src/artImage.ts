export type RawArtImage = {
  id: string;
  cover: {
    small_image_url: string;
    medium_image_url: string;
    small_square_url: string;
    thumb_url: string;
    micro_square_image_url: string;
  };
};

export type ArtImage = {
  id: string;
  src: string;
};

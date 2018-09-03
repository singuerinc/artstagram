export interface Icons {
  image: boolean;
  video: boolean;
  model3d: boolean;
  marmoset: boolean;
  pano: boolean;
}

export interface ICover {
  id: number;
  small_image_url: string;
  medium_image_url: string;
  small_square_url: string;
  thumb_url: string;
  micro_square_image_url: string;
  aspect: number;
}

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar_file_name: string;
  country: string;
  city: string;
  subdomain: string;
  headline: string;
  pro_member: boolean;
  is_staff: boolean;
  medium_avatar_url: string;
  large_avatar_url: string;
  full_name: string;
  permalink: string;
  artstation_profile_url: string;
  location: string;
}

export interface IArtImage {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  slug: string;
  published_at: string;
  adult_content: boolean;
  cover_asset_id: number;
  admin_adult_content: boolean;
  views_count: number;
  hash_id: string;
  permalink: string;
  hide_as_adult: boolean;
  user: IUser;
  cover: ICover;
  icons: Icons;
  assets_count: number;
}

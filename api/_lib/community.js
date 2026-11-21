// The legacy `projects.json?sorting=picks` list stopped updating in 2021.
// ArtStation's home page now uses the v2 "community" explore feed, which
// returns a slimmer item shape, so we map it to what the client expects
// (`IArtImage` in src/IArtImage.ts).

const COMMUNITY_ENDPOINT =
  "https://www.artstation.com/api/v2/community/explore/projects/community.json";

export const buildCommunityUrl = (query) => {
  const params = new URLSearchParams({
    page: String(query.page || 1),
    dimension: "all",
    per_page: "50",
  });
  return `${COMMUNITY_ENDPOINT}?${params.toString()}`;
};

const toUser = (user) => ({
  id: user.id,
  username: user.username,
  first_name: "",
  last_name: "",
  avatar_file_name: null,
  country: "",
  city: "",
  subdomain: user.username,
  headline: "",
  pro_member: Boolean(user.pro_member),
  is_staff: Boolean(user.is_staff),
  medium_avatar_url: user.medium_avatar_url,
  large_avatar_url: user.medium_avatar_url,
  full_name: user.full_name,
  permalink: `https://www.artstation.com/${user.username}`,
  artstation_profile_url: `https://www.artstation.com/${user.username}`,
  location: "",
});

export const toArtImage = (item) => ({
  id: item.id,
  user_id: item.user.id,
  title: item.title,
  description: "",
  created_at: "",
  updated_at: "",
  published_at: "",
  likes_count: 0,
  views_count: 0,
  slug: "",
  adult_content: Boolean(item.hide_as_adult),
  admin_adult_content: false,
  hide_as_adult: Boolean(item.hide_as_adult),
  cover_asset_id: 0,
  hash_id: item.hash_id,
  permalink: item.url,
  user: toUser(item.user),
  cover: {
    id: 0,
    small_image_url: item.small_square_cover_url,
    medium_image_url: item.small_square_cover_url,
    small_square_url: item.small_square_cover_url,
    thumb_url: item.smaller_square_cover_url,
    micro_square_image_url: item.smaller_square_cover_url,
    aspect: 1,
  },
  icons: item.icons,
  assets_count: 0,
});

import { buildCommunityUrl, toArtImage } from "../_lib/community.js";

const v2Item = {
  id: 22777045,
  hash_id: "31qBlE",
  url: "https://www.artstation.com/artwork/31qBlE",
  smaller_square_cover_url:
    "https://cdnb.artstation.com/p/assets/covers/images/101/805/479/smaller_square/thumb.webp?1",
  small_square_cover_url:
    "https://cdnb.artstation.com/p/assets/covers/images/101/805/479/small_square/thumb.webp?1",
  hide_as_adult: true,
  title: "Anatomy Studies",
  is_highlighted: false,
  icons: { video: false, image: true, model3d: false, marmoset: false, pano: false },
  user: {
    id: 73984,
    username: "lukaslima",
    medium_avatar_url: "https://cdna.artstation.com/avatar.jpg",
    is_staff: false,
    pro_member: true,
    full_name: "Lukas Lima",
  },
};

describe("buildCommunityUrl", () => {
  it("requests the v2 community feed for the given page", () => {
    const url = new URL(buildCommunityUrl({ page: "3" }));
    expect(url.origin + url.pathname).toBe(
      "https://www.artstation.com/api/v2/community/explore/projects/community.json"
    );
    expect(url.searchParams.get("page")).toBe("3");
    expect(url.searchParams.get("dimension")).toBe("all");
  });

  it("defaults to page 1", () => {
    expect(new URL(buildCommunityUrl({})).searchParams.get("page")).toBe("1");
  });
});

describe("toArtImage", () => {
  it("maps the fields the feed renders", () => {
    const art = toArtImage(v2Item);

    expect(art.id).toBe(22777045);
    expect(art.hash_id).toBe("31qBlE");
    expect(art.title).toBe("Anatomy Studies");
    expect(art.description).toBe("");
    expect(art.permalink).toBe("https://www.artstation.com/artwork/31qBlE");
    expect(art.adult_content).toBe(true);
    expect(art.cover.small_square_url).toBe(v2Item.small_square_cover_url);
    expect(art.cover.micro_square_image_url).toBe(v2Item.smaller_square_cover_url);
    expect(art.icons).toEqual(v2Item.icons);
  });

  it("maps the user and derives the profile url", () => {
    const { user, user_id } = toArtImage(v2Item);

    expect(user_id).toBe(73984);
    expect(user.username).toBe("lukaslima");
    expect(user.full_name).toBe("Lukas Lima");
    expect(user.medium_avatar_url).toBe("https://cdna.artstation.com/avatar.jpg");
    expect(user.pro_member).toBe(true);
    expect(user.artstation_profile_url).toBe("https://www.artstation.com/lukaslima");
    expect(user.headline).toBe("");
    expect(user.location).toBe("");
  });
});

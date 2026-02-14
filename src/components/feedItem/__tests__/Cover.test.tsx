import { render, screen } from "@testing-library/react";
import { Cover, IProps as ICoverProps } from "../Cover";
import { openLargeImage, smallToLarge } from "../cover.utils";

describe("<Cover />", () => {
  it("renders props correctly", () => {
    const props: ICoverProps = {
      onLoad: () => {},
      smallImageUrl: "bar",
      src: "faz",
      title: "foo"
    };

    render(<Cover {...props} />);
    const img = screen.getByRole("img");

    expect(img.getAttribute("alt")).toBe("foo");
    expect(img.getAttribute("title")).toBe("foo");
    expect(img.getAttribute("src")).toBe("faz");
  });
});

describe("smallToLarge", () => {
  it("should convert an URL", () => {
    const small =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/20181101034912/small_square/aisosa-ugiagbe-1.jpg?1536153239";
    const large =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/large/aisosa-ugiagbe-1.jpg?1536153239";

    expect(smallToLarge(small)).toBe(large);
  });

  it("should convert an url with date", () => {
    const small =
      "https://cdna.artstation.com/p/assets/images/images/013/779/574/20181101034912/small_square/tom-garden-tom-garden-rdr2-fanart.jpg?1541062153";
    const large =
      "https://cdna.artstation.com/p/assets/images/images/013/779/574/large/tom-garden-tom-garden-rdr2-fanart.jpg?1541062153";

    expect(smallToLarge(small)).toBe(large);
  });
});

describe("openLargeImage", () => {
  it("should open a link in a new window with a converted small_square image into large", () => {
    const small =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/20181101034912/small_square/aisosa-ugiagbe-1.jpg?1536153239";
    const large =
      "https://cdnb.artstation.com/p/assets/images/images/012/713/977/large/aisosa-ugiagbe-1.jpg?1536153239";

    window.open = vi.fn();
    openLargeImage(small)();

    expect(window.open).toBeCalledWith(large);
  });
});

import { render } from "@testing-library/react";
import { art } from "../feedItem/__tests__/art.fixture";
import { Image, IProps as IImageProps } from "../Image";

describe("<Image />", () => {
  it("should render the cover image with correct props", () => {
    const props: IImageProps = {
      art,
      src: "test-image.jpg"
    };
    const { container } = render(<Image {...props} />);

    const img = container.querySelector("img");
    expect(img).toBeTruthy();
    expect(img!.getAttribute("alt")).toBe(art.title);
    expect(img!.getAttribute("title")).toBe(art.title);
  });
});

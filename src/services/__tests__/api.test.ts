import { IArtImage } from "../../IArtImage";
import { asQuery, IParams, IResponse, load, request } from "../api";

describe("asQuery", () => {
  it("should convert parameters in query", () => {
    const params: IParams = {
      bar: "foo",
      foo: "bar"
    };
    expect(asQuery(params)).toBe("bar=foo&foo=bar");
  });
});

describe("load", () => {
  it("should ", async () => {
    const res: IArtImage[] = await load("https://u.rl");
    expect(res).toBe("algo");
  });
});

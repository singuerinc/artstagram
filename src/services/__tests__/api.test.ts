import { IArtImage } from "../../IArtImage";
import { asQuery, IParams, load } from "../api";

vi.mock("axios", async () => {
  const { data } = await vi.importActual<typeof import("../../__mocks__/remote.fixture")>("../../__mocks__/remote.fixture");
  return {
    default: {
      get: vi.fn(() => ({ data: { data } }))
    }
  };
});

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
  it("should load data", async () => {
    const res: IArtImage[] = await load("https://u.rl");
    expect(res).toHaveLength(50);
  });
});

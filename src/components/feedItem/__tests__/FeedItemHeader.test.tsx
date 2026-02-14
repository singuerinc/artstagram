import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import {
  FeedItemHeader,
  IProps as IFeedItemHeaderProps
} from "../FeedItemHeader";
import { art } from "./art.fixture";

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => ui });
  const routeTree = rootRoute.addChildren([]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("<FeedItemHeader />", () => {
  it("should render props", async () => {
    art.user.username = "johndoe";
    art.user.full_name = "John Doe";
    art.user.medium_avatar_url = "https://ava.tar/johndoe.jpg";

    const props: IFeedItemHeaderProps = {
      art,
      user: art.user
    };

    const { container } = renderWithRouter(<FeedItemHeader {...props} />);

    await waitFor(() => {
      const link = container.querySelector("a")!;
      expect(link.getAttribute("href")).toContain("/user/johndoe");
    });

    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("@johndoe")).toBeTruthy();

    const img = screen.getByRole("img");
    expect(img.getAttribute("alt")).toBe("@johndoe");
    expect(img.getAttribute("src")).toBe("https://ava.tar/johndoe.jpg");
    expect(img.getAttribute("title")).toBe("@johndoe");
  });
});

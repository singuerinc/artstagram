import { render, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { Feed, IProps as IFeedProps } from "../Feed";

vi.mock("../../services/api", () => ({
  load: vi.fn(() => Promise.resolve([]))
}));

vi.mock("nprogress", () => ({
  default: { start: vi.fn(), done: vi.fn() }
}));

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => ui });
  const routeTree = rootRoute.addChildren([]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("<Feed />", () => {
  it("should render the fake Feed when the images are not loaded", async () => {
    const props: IFeedProps = {
      urlFunc: ""
    };

    const { container } = renderWithRouter(<Feed {...props} />);

    await waitFor(() => {
      const listItems = container.querySelectorAll("li");
      expect(listItems).toHaveLength(2);
    });
  });
});

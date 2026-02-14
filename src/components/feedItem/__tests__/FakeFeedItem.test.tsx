import { render, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { FakeFeedItem } from "../FakeFeedItem";

function renderWithRouter(ui: React.ReactElement) {
  const rootRoute = createRootRoute({ component: () => ui });
  const routeTree = rootRoute.addChildren([]);
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });
  return render(<RouterProvider router={router} />);
}

describe("<FakeFeedItem />", () => {
  it("should render children", async () => {
    const { container } = renderWithRouter(<FakeFeedItem />);

    await waitFor(() => {
      expect(container.querySelector("li")).toBeTruthy();
    });
    expect(container.querySelector("a")).toBeTruthy();
    expect(container.querySelector("footer")).toBeTruthy();
  });
});

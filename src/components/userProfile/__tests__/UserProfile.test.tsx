import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { UserProfile } from "../UserProfile";
import { user } from "./user.fixture";

vi.mock("../../../services/api", () => ({
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

describe("<UserProfile />", () => {
  it("renders user information", async () => {
    window.scrollTo = vi.fn() as any;

    renderWithRouter(<UserProfile user={user} />);

    await waitFor(() => {
      expect(screen.getByText(user.full_name)).toBeTruthy();
    });
    expect(screen.getByText(user.location)).toBeTruthy();
    expect(screen.getByText("View on ArtStation")).toBeTruthy();
  });
});

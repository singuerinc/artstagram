import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import styled from "styled-components";
import { IUser } from "./IArtImage";
import { Sorting } from "./Sorting";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { ThemeSwitch } from "./components/theme/ThemeSwitch";
import { UserProfile } from "./components/userProfile/UserProfile";

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 48rem) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  margin-top: 1.5rem;
`;

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <NavBar />
      <Content>
        <Outlet />
      </Content>
      <ThemeSwitch />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/feed/$sorting", params: { sorting: "picks" } });
  },
});

const sortingValues: Record<string, Sorting> = {
  picks: Sorting.PICKS,
  latest: Sorting.LATEST,
  trending: Sorting.TRENDING,
  randomize: Sorting.COMMUNITY,
};

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/feed/$sorting",
  component: function FeedRoute() {
    const { sorting } = feedRoute.useParams();
    const sortingEnum = sortingValues[sorting] ?? Sorting.PICKS;
    return <Home key={sorting} sorting={sortingEnum} />;
  },
});

type UserSearchParams = {
  username: string;
  full_name: string;
  medium_avatar_url: string;
  headline: string;
  artstation_profile_url: string;
  location: string;
};

const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$id",
  validateSearch: (search: Record<string, unknown>): UserSearchParams => ({
    username: (search.username as string) ?? "",
    full_name: (search.full_name as string) ?? "",
    medium_avatar_url: (search.medium_avatar_url as string) ?? "",
    headline: (search.headline as string) ?? "",
    artstation_profile_url: (search.artstation_profile_url as string) ?? "",
    location: (search.location as string) ?? "",
  }),
  component: function UserRoute() {
    const search = userRoute.useSearch();
    const user: IUser = {
      id: 0,
      username: search.username,
      first_name: "",
      last_name: "",
      avatar_file_name: null,
      country: "",
      city: "",
      subdomain: "",
      headline: search.headline,
      pro_member: false,
      is_staff: false,
      medium_avatar_url: search.medium_avatar_url,
      large_avatar_url: "",
      full_name: search.full_name,
      permalink: "",
      artstation_profile_url: search.artstation_profile_url,
      location: search.location,
    };
    return <UserProfile user={user} />;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, feedRoute, userRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router, rootRoute, feedRoute, userRoute };

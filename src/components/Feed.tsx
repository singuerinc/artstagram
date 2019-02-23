import * as NProgress from "nprogress";
import "nprogress/nprogress.css";
import * as React from "react";
import { useEffect, useState } from "react";
import Waypoint from "react-waypoint";
import styled from "styled-components";
import { IArtImage, IUser } from "../IArtImage";
import { load } from "../services/api";
import { FakeFeedItem } from "./feedItem/FakeFeedItem";
import { FeedItem } from "./feedItem/FeedItem";

const hasCover = (x: IArtImage) => !!x.cover;
const equal = (value: IArtImage) => (x: IArtImage) => x.id === value.id;
const unique = (arr: IArtImage[]) => {
  return arr.filter(
    (value: IArtImage, _: number, self: IArtImage[]) =>
      typeof self.find(equal(value)) !== "undefined"
  );
};

interface IProps {
  urlFunc: string;
  user?: IUser;
}

function Feed({ urlFunc, user }: IProps) {
  const [images, setImages] = useState<IArtImage[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    NProgress.start();
    // ! no way of canceling the loading
    load(urlFunc, { page }).then(newImages => {
      const onlyWithCover = unique([...images, ...newImages]).filter(hasCover);
      setImages(onlyWithCover);
      setIsLoading(false);
      NProgress.done();
    });
  }, [page]);

  // TODO: use Suspense
  return isLoading ? (
    <FeedContainer>
      <FakeFeedItem />
      <FakeFeedItem />
    </FeedContainer>
  ) : (
    <FeedContainer>
      {images.map((art: IArtImage) => (
        <FeedItem key={art.id} art={art} user={user || art.user} />
      ))}
      <Waypoint onEnter={() => setPage(page + 1)} />
    </FeedContainer>
  );
}

const FeedContainer = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  max-width: 48rem;
  width: 100%;
`;

export { Feed, FeedContainer, IProps };

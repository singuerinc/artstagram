import * as React from "react";
import * as R from "ramda";

const capitalize = R.compose(
  R.join(""),
  R.over(R.lensIndex(0), R.toUpper)
);

type Props = {
  sorting: string;
};

const SortingTitle = ({ sorting }: Props) => (
  <h3 className="cat-title">{capitalize(sorting)}</h3>
);

export { SortingTitle };

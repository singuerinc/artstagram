export const smallToLarge = (x: string) =>
  x.replace(/(\/[\d]{14})?\/small_square\//gi, "/large/");

export const openLargeImage = (smallImageUrl: string) => () => {
  window.open(smallToLarge(smallImageUrl));
};

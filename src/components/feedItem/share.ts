export interface IShare {
  title: string;
  permalink: string;
}

export const share = async ({ title, permalink: url }: IShare) => {
  console.log("SHARE!");
  // native share: only Android
  // @ts-ignore
  if (navigator.share) {
    navigator
      // @ts-ignore
      .share({
        text: "",
        title,
        url
      })
      .then(() => {
        //
      })
      .catch(() => {
        //
      });
  }
};

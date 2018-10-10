export interface IShare {
  url: string;
  text: string;
  title: string;
}

export function share({ title, url, text }: IShare) {
  // native share: only Android
  if (typeof navigator.share !== "undefined") {
    navigator
      .share({
        text,
        title,
        url
      })
      .then(() => {
        //
      })
      .catch(e => {
        // tslint:disable-next-line
        console.error(e);
      });
  }
}

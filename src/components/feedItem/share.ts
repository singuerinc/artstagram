export interface IShare {
  url: string;
  text: string;
  title: string;
  shareFn: (
    data: {
      url?: string;
      text?: string;
      title?: string;
    }
  ) => Promise<any>;
}

export function share({ title, url, text, shareFn }: IShare) {
  // native share: only Android
  if (typeof shareFn !== "undefined") {
    shareFn({
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

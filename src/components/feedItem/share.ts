interface IShare {
  title: string;
  permalink: string;
}

function share({ title, permalink: url }: IShare) {
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
}

export { IShare, share };

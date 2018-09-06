const share = jest
  .fn()
  .mockImplementation(async ({ title, permalink: url }) => {
    return { title, url };
  });

export { share };

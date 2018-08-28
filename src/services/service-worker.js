const CACHE = "network-or-cache";

self.addEventListener("install", evt => {
  evt.waitUntil(precache());
});

self.addEventListener("fetch", evt => {
  if (evt.request.url.match(/netlify/)) {
    return false;
  }

  evt.respondWith(fromNetwork(evt.request, 4000).catch(fromCache(evt.request)));
});

const precache = () => caches.open(CACHE).then(cache => cache.addAll([]));

const fromNetwork = (request, timeout) =>
  new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });

const fromCache = request =>
  caches.open(CACHE).then(cache =>
    cache.match(request).then(matching => {
      return matching || Promise.reject("no-match");
    })
  );

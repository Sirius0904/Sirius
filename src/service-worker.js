/* eslint-disable no-restricted-globals */

// Этот сервисный работник может быть настроен!
// См. https://developers.google.com/web/tools/workbox/modules
// для списка доступных модулей Workbox, или добавьте любой другой
// код, который вы хотите.
// Вы также можете удалить этот файл, если вы предпочитаете не использовать
// service worker, и шаг сборки Workbox будет пропущен.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();
// Предварительно кэшируйте все активы, созданные вашим процессом сборки.
// Их URL-адреса вставляются в переменную манифеста ниже.
// Эта переменная должна присутствовать где-то в вашем файле service worker,
// даже если вы решили не использовать прекэширование. См. https://cra.link/PWA

precacheAndRoute(self.__WB_MANIFEST);

// Настройте маршрутизацию в стиле App Shell, чтобы все навигационные запросы
// выполнялись с помощью вашей оболочки index.html. Подробнее на
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Верните false, чтобы исключить выполнение запросов через index.html.
  ({ request, url }) => {
    // Если это не навигация, пропустите.
    if (request.mode !== "navigate") {
      return false;
    } // Если это URL, начинающийся с /_, пропустите.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // Если это похоже на URL для ресурса, поскольку содержит // расширение файла, пропустите.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Верните true, чтобы сообщить, что мы хотим использовать обработчик.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
);

// Пример маршрута кэширования во время выполнения для запросов, которые не обрабатываются прекэшем.
// предварительный кэш, в данном случае одноименные запросы .png, такие как запросы из public/
registerRoute(
  // Добавьте любые другие расширения файлов или критерии маршрутизации по мере необходимости.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // Убедитесь, что как только кэш времени выполнения достигнет максимального размера, то
      // удаляются наименее часто используемые изображения.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  }),
);

// Это позволяет веб-приложению запускать skipWaiting через
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

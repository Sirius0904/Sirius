// Этот необязательный код используется для регистрации рабочего сервиса.
// По умолчанию // register() не вызывается.

// Это позволяет приложению загружаться быстрее при последующих посещениях в продакшене и дает
// ему возможность работы в автономном режиме. Однако это также означает, что разработчики (и пользователи)
// будут видеть развернутые обновления только при последующих посещениях страницы, после того как все
// существующих вкладок, открытых на странице, были закрыты, поскольку ранее кэшированные
// ресурсы обновляются в фоновом режиме.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Наш сервисный работник не будет работать, если PUBLIC_URL находится на другом источнике.
      // от того, на котором обслуживается наша страница. Это может произойти, если используется CDN.
      // обслуживания активов; см. https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Это запущено на localhost. Давайте проверим, существует ли рабочий сервис или нет.
        checkValidServiceWorker(swUrl, config);

        // Добавьте несколько дополнительных логов на localhost, указывая разработчикам на
        // документацию по service worker/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Это веб-приложение обслуживается кэш-первой службой " +
              "worker. Чтобы узнать больше, посетите сайт https://cra.link/PWA",
          );
        });
      } else {
        // Не является localhost. Просто зарегистрируйте рабочий сервис
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // В этот момент обновленный контент из прекэша был получен,
              // но предыдущий работник службы все еще будет обслуживать старое
              // содержимое, пока все клиентские вкладки не будут закрыты.
              console.log(
                "Новое содержимое доступно и будет использовано, когда все " +
                  "вкладки для этой страницы будут закрыты. См. https://cra.link/PWA.",
              );

              // Выполнить обратный вызов.
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // На этом этапе все было предварительно кэшировано.
              // Это идеальное время для отображения сообщения
              // "Содержимое кэшируется для автономного использования." сообщение.
              console.log("Контент кэшируется для автономного использования.");

              // Выполнение обратного вызова
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Ошибка при регистрации работника службы:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Проверьте, может ли быть найден рабочий сервис. Если он не найден, перезагрузите страницу.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // Убедитесь, что service worker существует, и что мы действительно получаем JS-файл.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Работник службы не найден. Возможно, это другое приложение. Перезагрузите страницу.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Работник службы найден. Действуйте как обычно.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "Интернет-соединение не найдено. Приложение работает в автономном режиме.",
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

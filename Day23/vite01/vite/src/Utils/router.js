import Navigo from "navigo";
import { Error } from "../Error";
const app = document.getElementById("app");

export const router = (routes, Layout) => {
  const router = new Navigo("/", { linksSelector: "a" });

  const render = (component, title) => {
    if (app) {
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = Layout({ body: component() });
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }
      app.innerHTML = "";
      app.appendChild(fragment);
    }
  };

  const routesConfig = routes.reduce((config, route) => {
    config[route.path] = (params) => {
      render(route.component, params);
    };
    return config;
  }, {});

  // Khi trang web lỗi
  router.notFound(() => {
    const app = document.getElementById("app");
    app.innerHTML = Error();
  });

  router.on(routesConfig).resolve();

  const appRouter = {
    navigate: (path) => router.navigate(path),
  };

  window.navigate = appRouter.navigate;

  return appRouter;
};

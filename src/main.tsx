import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundBlock } from "./components/NotFoundBlock/index.tsx";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import Pizza from "./pages/Pizza.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundBlock />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <Pizza />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

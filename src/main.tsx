import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFoundBlock } from "./components/NotFoundBlock/index.tsx";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

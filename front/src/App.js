import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

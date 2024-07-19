import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LocationInfo from "./Pages/LocationInfo.jsx";
import LocationDetail from "./Pages/LocationDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path : "/LocationInfo",
        element : <LocationInfo/>
      },
      {
        path : "/LocationDetail/:id",
        element : <LocationDetail/>
      }
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

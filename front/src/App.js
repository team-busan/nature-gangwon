import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Root.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import LocationInfo from "./Pages/LocationInfo.jsx";
import LocationDetail from "./Pages/LocationDetail.jsx";
import MyPage from "./Pages/MyPage.jsx";
import SearchResult from "./Pages/SearchResult.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/SignUp.jsx";
import Plan from "./Pages/Plan.jsx";
import FestivalInfo from "./Pages/FestivalInfo.jsx";

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
        path: "/search",
        element: <SearchResult />,
      },
      {
        path: "/destination/list",
        element: <LocationInfo />,
      },
      {
        path : "/festival/list",
        element : <FestivalInfo/>,
      },
      {
        path: "/destination/:id",
        element: <LocationDetail />,
      },
      {
        path: "/myPage/:id",
        element: <MyPage />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/SignUp",
        element: <Signup />,
      },
      {
        path: "/plan",
        element: <Plan />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
